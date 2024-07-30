import { TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProfileModalComponent } from '@pages/dashboard/partials/profile-modal/profile-modal.component';
import { fadeInOut } from '@shared/animations';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { AlertService } from '@shared/services/alert.service';
import { AuthService } from '@shared/services/auth.service';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { LoaderService } from '@shared/services/loader.service';
import { ModalService } from '@shared/services/modal.service';
import { UtilsService } from '@shared/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-profile-dropdown',
  standalone: true,
  imports: [TitleCasePipe, MyMatIconComponent, ClickOutsideDirective],
  templateUrl: './profile-dropdown.component.html',
  animations: [fadeInOut],
})
export class ProfileDropdownComponent {
  @Output() isProfileDropdownOpenChange = new EventEmitter();
  @ViewChild('profileDropdown') profileDropdownElement!: ElementRef;

  name = '';
  firstRole = '';
  currentUserSubscription!: Subscription;

  constructor(
    public colorScheme: ColorSchemeService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private loader: LoaderService,
    public utils: UtilsService,
    private modalService: ModalService
  ) {}

  openProfileModal() {
    const template = ProfileModalComponent;
    this.modalService.open(template);
    this.isProfileDropdownOpenChange.emit(false)
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService
      .onCurrentUser()
      .subscribe((currentUser) => {
        this.name = currentUser?.name as string;
        this.firstRole = currentUser?.roles[0] as string;
      });
  }

  closeProfileDropdown() {
    this.isProfileDropdownOpenChange.emit(false);
  }
  signOut() {
    this.loader.start();
    this.authService.signOut().subscribe(() => {
      this.alertService.success('Success', 'Successfully logged out.');
      this.loader.stop();
      this.router.navigateByUrl('/');
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
