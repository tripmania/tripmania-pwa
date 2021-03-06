import {environment} from '../environments/environment';

export const apiUrls = {
  BASE_URL: `${environment.baseUrl}`,
  USER_URL: `${environment.baseUrl}/users`,
  PUBLICATIONS_URL: `${environment.baseUrl}/publications`,
  COMMENTS_URL: `${environment.baseUrl}/comments`,
  TRIPS_URL: `${environment.baseUrl}/trips`,
  FILES_URL: `${environment.baseUrl}/files`
};

