import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';
import {map, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class FilesService {
  constructor(private http: HttpClient) {
  }

  loadFileToUrl(url: string): Observable<string> {
    if (!url.startsWith(`${apiUrls.BASE_URL}/files`)) {
      return of(url);
    }

    const fileName = url.slice(`${apiUrls.BASE_URL}/files/`.length);

    return this.http.get<ArrayBuffer>(
      `${apiUrls.FILES_URL}/${fileName}`,
      {responseType: 'blob' as 'json'}
      )
      .pipe(
        take(1),
        map(file => {
          const blob = new Blob([file], {type: 'image/png'});

          return window.URL.createObjectURL(blob);
        })
      );

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
