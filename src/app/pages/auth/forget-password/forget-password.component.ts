import { Component } from '@angular/core';
import { CacheService } from '@shared/services/cache.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [],
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  email!: string

  constructor(private cache: CacheService){}

  ngOnInit(): void {
    this.email =  this.cache.get('emailForReset')
  }
}
