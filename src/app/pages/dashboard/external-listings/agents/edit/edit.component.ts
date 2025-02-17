import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackBtnComponent } from "../../../../../shared/components/back-btn/back-btn.component";
import { UtilsService } from '@shared/services/utils.service';
import { ListingsAgentsService } from '@core/services/dashboard/listings-agents.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterService } from '@core/services/router.service';
import { ActivatedRoute } from '@angular/router';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { FormSubmitBtnComponent } from "../../../../../shared/components/form-submit-btn/form-submit-btn.component";
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, BackBtnComponent, InputFieldComponent, FormSubmitBtnComponent, SpinnerComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy {
  agentFormGroup!: FormGroup
  agentId!: number
  isLoading = false

  private destroy$ = new Subject<void>()
  constructor(
    private readonly utils: UtilsService,
    private readonly listingAgentService: ListingsAgentsService,
    private readonly router: RouterService,
    private readonly activatedRoute: ActivatedRoute
  ) {

  }


  get formGroupKeys() {
    return Object.keys(this.agentFormGroup.controls).filter((v) => !['id'].includes(v))
  }

  ngOnInit(): void {
    this.getInitialData()
  }

  getInitialData() {
    this.agentId = this.activatedRoute.snapshot.params['id'];

    if (!this.agentId) {
      console.error("Agent ID is missing from the route.");
      return;
    }

    const data = this.router.getState(`/dashboard/external-listings/agents/${this.agentId}/edit`);

    if (data) {
      this.agentFormGroup = this.listingAgentService.getFormGroup(data);
    } else {
      this.isLoading = true;
      this.listingAgentService.apiGetListingAgentById(this.agentId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.agentFormGroup = this.listingAgentService.getFormGroup(response?.data);
            this.isLoading = false;
          },
          error: (err) => {
            console.error("Failed to fetch agent data:", err);
            this.isLoading = false;
          }
        });
    }
  }


  getLabel(name: string) {
    return this.utils.capitalize(name)
  }

  handleSubmit() {
    this.listingAgentService.updateAgent(this.agentId)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
