import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor(private readonly httpClient: HttpClient) { }

  downloadExcelFile(url: string, filename: string, cb: Nullable<() => void> = null, params: any = null,) {
    this.httpClient.get(apiUrlFactory(url, params), { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename+'.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        cb && cb()
      },
      error: (error) => {
        console.error('Error downloading the file', error);
      }
    })
  }
}
