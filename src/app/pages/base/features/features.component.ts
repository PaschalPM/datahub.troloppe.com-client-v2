import { Component, HostBinding } from '@angular/core';
import { routeFadeInOut } from '@shared/animations';
import { ContainerComponent } from '@shared/components/container/container.component';
import { FeatureCardComponent } from '@shared/components/feature-card/feature-card.component';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [ContainerComponent, FeatureCardComponent],
  templateUrl: './features.component.html',
  animations: [routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
  },
})
export class FeaturesComponent {
  keyFeatures: FeatureDetailsType[] = [
    {
      title: 'Efficiency',
      body: "Streamline data collection process with user-friendly interfaces tailored for Troloppe's needs.",
      circleBgClx: 'bg-success',
    },
    {
      title: 'Security',
      body: 'Rest assured that property data collected from the field remains confidential and accessible only to authorized personnel.',
      circleBgClx: 'bg-error',
    },
    {
      title: 'Dynamic Forms',
      body: 'Capture data swiftly with dynamic forms that seamlessly upload images as they are taken, ensuring fast and efficient data entry.',
      circleBgClx: 'bg-info',
    },
    {
      title: 'Live Notification System',
      body: 'Stay updated with real-time notifications to enhance communication and workflow efficiency.',
      circleBgClx: 'bg-warning',
    },
  ];
}
