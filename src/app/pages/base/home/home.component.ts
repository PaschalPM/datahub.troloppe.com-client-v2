import { Component } from '@angular/core';
import { UserActionBtnComponent } from '@core/components/base/user-action-btn/user-action-btn.component';

@Component({
  selector: 'base-home-page',
  standalone: true,
  imports: [UserActionBtnComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
