import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TempImageUploaderService } from '@core/services/dashboard/temp-image-uploader.service';
import { UtilsService } from '@shared/services/utils.service';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { ImageViewerModalService } from '@core/services/dashboard/image-viewer-modal.service';
import { Subscription } from 'rxjs';
import { FormSubmissionService } from '@shared/services/form-submission.service';


@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [MyMatIconComponent, NgIf, CapitalizePipe],
  template: `
    <div class="mb-6" [tabIndex]="0" #imageUploader>
      <div>
        <label [for]="name" class=" label-text font-semibold">
          {{ label
          }}<span class="font-bold text-secondary" *ngIf="isRequired">
            *</span
          ></label
        >
        <!---: Image Uploader -->
        <div
          class="relative size-32"
          *ngIf="!imagePath && mode !== 'view-only'"
        >
          <div
            [class]="
              utils.cn(
                'h-full border border-base-100 rounded-xl flex justify-center items-center text-4xl',
                errorBorder
              )
            "
          >
            +
          </div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            class="absolute top-0 inset-0 cursor-pointer opacity-0"
            (change)="handleChange($event)"
          />
        </div>
        <!---: Image Uploader in view-only -->
        <div
  class="relative size-32"
  *ngIf="!imagePath && mode === 'view-only'"
>
  <div
    [class]="
      utils.cn(
        'h-full border border-base-100 rounded-xl flex justify-center items-center text-4xl relative',
        errorBorder
      )
    "
  >
    +
    <!-- Dark overlay when disabled -->
    <div
      class="absolute inset-0 bg-black/40 rounded-xl cursor-not-allowed"
    ></div>
  </div>
  <input
    type="file"
    accept="image/*"
    capture="environment"
    class="absolute top-0 inset-0 cursor-not-allowed opacity-0"
    [disabled]="!imagePath && mode === 'view-only'"
    (change)="handleChange($event)"
  />
</div>

        <!-- End Image Uploader -->

        <!---: Image Viewer -->
        <div class="relative size-32" *ngIf="imagePath">
          <img
            [src]="imagePath"
            alt=""
            #thumbnail
            (click)="viewImage()"
            class="size-32 rounded-lg object-cover cursor-pointer"
          />
          <!---: Cancel Button -->
          <button
            type="button"
            *ngIf="!control.disabled"
            (click)="deleteImage()"
            class="text-3xl absolute -top-1 right-1 font-medium text-red-500"
          >
            &times;
          </button>
          <!---: Uploading Spinner -->
          <div
            *ngIf="isLoading"
            class="absolute inset-0 bg-black/50 flex justify-center items-center"
          >
            <my-mat-icon clx="animate-spin"> settings </my-mat-icon>
          </div>
        </div>
        <!---: End Image Viewer -->

        <!---: Image View Only Spinner -->
        <div
          class="relative size-32"
          *ngIf="mode === 'view-only' && viewOnlyLoading"
        >
          <!---: Uploading Spinner -->
          <div
            class="absolute inset-0 bg-black/50 flex justify-center items-center"
          >
            <my-mat-icon class="animate-spin"> settings </my-mat-icon>
          </div>
        </div>
        <!---: End Image View Only Spinner  -->
      </div>

      <!---: Error Section  -->
      <div
        [class]="
          utils.cn(
            '!-mt-1  transform rounded text-sm text-error opacity-100 transition-all duration-150 ease-in-out',
            { '!mt-1 opacity-100': formIsSubmitting && control.invalid }
          )
        "
      >
        <div *ngIf="control.errors?.['required'] && formIsSubmitting">
          An image is a required.
        </div>
      </div>
    </div>
  `,
})
export class ImageUploaderComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() mode: 'view-only' | 'view-edit' | 'default' = 'default';
  @Input() isLoading = false;

  @Output() isLoadingChange = new EventEmitter();

  @ViewChild('imageUploader') imageUploader!: ElementRef<HTMLDivElement>;
  @ViewChild('thumbnail', { static: false })
  thumbnail!: ElementRef<HTMLImageElement>;
  formIsSubmitting = false;

  isRequired = false;
  control!: FormControl;
  imagePath = '';
  viewOnlyLoading = true;

  get errorBorder() {
    return this.formIsSubmitting && this.control.invalid
      ? 'ring-1 ring-error border-none'
      : '';
  }

  set loadingState(value: boolean) {
    this.isLoading = value;
    this.isLoadingChange.emit(this.isLoading);
  }

  private formSubmitSubscription!: Subscription;
  constructor(
    private tempImgUploader: TempImageUploaderService,
    public utils: UtilsService,
    private imageViewerService: ImageViewerModalService,
    private formSubmit: FormSubmissionService
  ) {}

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.isRequired = this.control.hasValidator(Validators.required);
    if (this.mode === 'view-only' || this.mode === 'view-edit') {
      this.imagePath = this.control.value;
      this.viewOnlyLoading = false;
    }

    this.control.valueChanges.subscribe((value) => {
      this.imagePath = value;
    });

    this.formSubmitSubscription = this.formSubmit.formSubmitEvent.subscribe(
      (value) => {
        if (value.formGroup === this.formGroup) {
          this.formIsSubmitting = value.isSubmitting;
        }
      }
    );
  }

  deleteImage() {
    if (this.imagePath && !this.isLoading) {
      if (this.mode === 'view-only') {
        this.resetImage();
      } else {
        this.loadingState = true;
        this.tempImgUploader.deleteImage(this.imagePath).subscribe({
          next: () => {
            this.resetImage();
          },
          error: () => {
            this.resetImage();
          },
        });
      }
    }
  }

  handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.imagePath = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(this.thumbnail.nativeElement.src);
      });
      this.uploadToServer(file);
    }
  }

  focus() {
    this.imageUploader.nativeElement.focus();
  }

  ngOnDestroy() {
    this.formSubmitSubscription.unsubscribe();
  }

  private uploadToServer(image: File) {
    const formData = new FormData();
    formData.set('image', image, image.name);
    this.loadingState = true;
    this.tempImgUploader.store(formData).subscribe({
      next: (value) => {
        this.imagePath = value.image_tmp_url;
        this.control.setValue(value.image_tmp_url);
        this.loadingState = false;
      },
      error: (err) => {
        if (err.status === 422) {
          alert('Image format is not supported.');
        }
        this.resetImage();
      },
    });
  }

  viewImage() {
    this.imageViewerService.open(this.imagePath);
  }
  private resetImage() {
    this.imagePath = '';
    this.loadingState = false;
    this.control.setValue(null);
  }
}
