import { Component } from '@angular/core';
import { MyMatIconComponent } from "../my-mat-icon/my-mat-icon.component";

@Component({
  selector: 'app-activity-loader',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `<span class="italic font-semibold fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 p-2 ">
    <span class="animate-spin flex">
      <my-mat-icon > settings </my-mat-icon> 
    </span>
    <span>
      loading...
    </span>
</span>`,
})
export class ActivityLoaderComponent {

}
