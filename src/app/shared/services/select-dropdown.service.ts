import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectDropdownService {

  addBtnClick = new EventEmitter<{ formGroup: FormGroup, formControlName: string }>()

  private destroy$ = new Subject<void>()

  onInitChangeBuilder(formGroup: FormGroup, optionsRecord: Record<string, IdAndNameType[] | null>, isFetchingRecord: Record<string, boolean>) {

    return (fieldToUpdate: string, selectedValueId: number, fetchMethod: (selectedValueId: number) => Observable<IdAndNameType[]>, resetFields: string[] = []) => {
      // Reset fields options to null
      resetFields.forEach(f => optionsRecord[f] = null)

      // Reset field to update value
      formGroup.patchValue({ [fieldToUpdate]: '' })

      // Set the isFetching property for the field to update to true
      isFetchingRecord[fieldToUpdate] = true

      // Fetch options for field to update and reset isFetching property
      fetchMethod(selectedValueId).pipe(tap(_ => isFetchingRecord[fieldToUpdate] = false))
        .pipe(takeUntil(this.destroy$))
        .subscribe(v => {
          optionsRecord[fieldToUpdate] = v
        })

    }
  }

  emitAddBtnClick(formGroup: FormGroup, formControlName: string) {
    this.addBtnClick.emit({ formGroup, formControlName })
  }

  onAddBtnClick(cb: (formGroup: FormGroup, formControlName: string) => void) {
    this.addBtnClick.asObservable().pipe(takeUntil(this.destroy$)).subscribe(({ formGroup, formControlName }) => {
      cb(formGroup, formControlName)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
