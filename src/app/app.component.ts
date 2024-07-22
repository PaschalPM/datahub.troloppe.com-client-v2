import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientStorageService } from '@shared/services/client-storage.service';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'datahub_app_v2';
  colorSchemeSubscription!: Subscription;

  constructor(private colorScheme: ColorSchemeService, private css: ClientStorageService) {}

  ngOnInit(): void {
    this.colorSchemeSubscription = this.colorScheme.init().subscribe();
  }

  ngOnDestroy(): void {
    this.colorSchemeSubscription.unsubscribe();
  }
}
