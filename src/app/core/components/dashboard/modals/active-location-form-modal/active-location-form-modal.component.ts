import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextButtonComponent } from '../../text-btn/text-btn.component';
import { ActiveLocationService } from '@core/services/dashboard/active-location.service';
import { ModalService } from '@shared/services/modal.service';
import { map, Observable, Subscription } from 'rxjs';
import { AlertService } from '@shared/services/alert.service';
import { LoaderService } from '@shared/services/loader.service';
import { FormFieldDataService } from '@core/services/dashboard/form-field-data.service';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from "@shared/components/spinner/spinner.component";


@Component({
  selector: 'app-active-location-form-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    TextButtonComponent,
    SpinnerComponent
  ],
  template: `
    <div class="min-h-36 relative">
      <div class="prose">
        <h3>Set Active Location</h3>
      </div>
      @if(locationOptions$ | async; as locationOpts)
        {
          <select [(ngModel)]="selectedOption" class="select select-secondary w-full my-3">
            <option value="0"> 
              @if(currentActiveLocationId){
                Deactivate Location 
              } @else {
                No Active Location
              }
            </option>
            @for(option of locationOpts; track option.id)
            {
              <option [attr.value]="option.id"> {{ option.name }} </option>
            }
          </select>
        }
        @else {
            <div class="flex justify-center w-full py-4">
              <app-spinner></app-spinner>
            </div>
        }
    
      <div class="flex justify-end gap-2 mt-5">
        <text-button
          [text]="btnText"
          [disabled]="isActivationDisallowed"
          (clickEvent)="setActiveLocation()"
        ></text-button>
      </div>
    </div>
  `,
})
export class ActiveLocationFormModalComponent {
  formIsSubmitting = false;
  currentActiveLocationId = 0;
  locationOptions$!: Observable<IdAndNameType[]>;
  selectedOption = 0

  private setActiveLocationSubscription: Subscription | null = null;

  // Getters
  get isActivationDisallowed() {
    const cond1 = +this.selectedOption === this.currentActiveLocationId;
    const cond2 =
      this.currentActiveLocationId === 0 && +this.selectedOption === 0;
    return cond1 || cond2;
  }
  get btnText() {
    return this.currentActiveLocationId === 0 ? 'activate' :
      this.currentActiveLocationId !== 0 && +this.selectedOption === 0 ? 'deactivate' :
        'activate';
  }

  constructor(
    private activeLocationService: ActiveLocationService,
    private sdffd: FormFieldDataService,
    private modalService: ModalService,
    private alert: AlertService,
    private loader: LoaderService
  ) {

  }

  ngOnInit(): void {
    this.getLocationOptions();
    this.retrieveActiveLocation();
  }

  setActiveLocation() {
    let message = 'Are you sure you want to set a new active location?';
    if (+this.selectedOption === 0) {
      message = 'Are you sure you want to deactivate set location?';
    }
    if (confirm(message)) {
      this.loader.start();
      this.setActiveLocationSubscription = this.activeLocationService
        .setActiveLocation({ location_id: +this.selectedOption })
        .subscribe((value) => {
          let msg = 'New location activated and notifications sent out.';
          if (!value) {
            msg = 'No active location available';
          }
          this.alert.success('Success: ' + msg);
          this.loader.stop();
          this.modalService.close();
        });
    }
  }

  ngOnDestroy(): void {
    this.setActiveLocationSubscription?.unsubscribe();
  }

  private getLocationOptions() {

    this.locationOptions$ = this.sdffd.getFormFieldData().pipe(map((value) => {
      console.log(value)
      return value?.locations as IdAndNameType[]
    }))
  }

  private retrieveActiveLocation() {
    this.activeLocationService.getActiveLocation().subscribe((activeLocation) => {
      if (activeLocation) {
        this.currentActiveLocationId = activeLocation.id;
        this.selectedOption = activeLocation.id
      } else {
        this.currentActiveLocationId = 0
      }
    });
  }
}
