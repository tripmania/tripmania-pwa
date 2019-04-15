import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class UploadFilesService {
  constructor(private http: HttpClient) {
  }

  uploadFile(file: File): Observable<string> {
    if (!file) {
      return of('');
    }

    const formData = new FormData();

    formData.append('file', file, file.name);
    return this.http.post(`${apiUrls.FILES_URL}/upload`, formData)
      .pipe(
        map((files: Array<{urls: string}>) => files[0].urls)
      );
  }
}
