import { Injectable } from '@angular/core';
import { UserRoles } from '../enums/user-roles';
import { AuthService } from './auth.service';
import { User } from './types';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private currentUser!: User | null;
  private currentUserSubscription!: Subscription;

  get isAdmin() {
    return this.isPermitted(UserRoles.Admin);
  }
  get isResearchManager() {
    return this.isPermitted(UserRoles.ResearchManager);
  }
  get isResearchStaff() {
    return this.isPermitted(UserRoles.ResearchStaff);
  }

  get isUpline(){
    return this.isPermitted([UserRoles.Admin, UserRoles.ResearchManager]);
  }

  get isAdhocStaff() {
    return !(this.currentUser?.email.trim() || '').endsWith('@troloppe.com');
  }

  belongsToCurrentUser(resourceUpdatedById: number): boolean {
    return this.isUpline || this.currentUser?.id === resourceUpdatedById;
  }

  constructor(private authService: AuthService) {
    this.authService.onCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  // Checks if user has required roles to access some views
  isPermitted(roleOrRoles: `${UserRoles}` | `${UserRoles}`[]): boolean {
    if (!this.currentUser) return false;
    if (typeof roleOrRoles === 'string') {
      return this.currentUser?.roles.includes(roleOrRoles);
    }
    return roleOrRoles.some((role) => this.currentUser?.roles.includes(role));
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
