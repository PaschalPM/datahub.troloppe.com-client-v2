import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectDropdownService {

  constructor() { }

  onInitChangeBuilder(formGroup: FormGroup, options$: Record<string, Observable<IdAndNameType[]> | null>, isFetching: Record<string, boolean>) {
    return (fieldToUpdate: string, selectedValueId: number, fetchMethod: (selectedValueId: number) => Observable<IdAndNameType[]>, resetFields: string[] = []) => {
      // Reset fields options to null
      resetFields.forEach(f => options$[f] = null)

      // Reset field to update value
      formGroup.patchValue({ [fieldToUpdate]: '' })

      // Set the isFetching property for the field to update to true
      isFetching[fieldToUpdate] = true

      // Fetch options for field to update and reset isFetching property
      options$[fieldToUpdate] = fetchMethod(selectedValueId).pipe(tap(_ => isFetching[fieldToUpdate] = false))

    }
  }
}
