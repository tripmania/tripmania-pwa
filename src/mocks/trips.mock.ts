import {TripModel} from '@models/Trip.model';

export function getTrip():  TripModel {
  return {
    id: 123,
    userId: 123,
    startDate: 1553391844305,
    endDate: 1573391890901,
    path: [
      {
        id: 1,
        country: 'Russia',
        city: 'Moscow'
      },
      {
        id: 2,
        country: 'Cyprus'
      },
      {
        id: 3,
        country: 'Georgia',
        city: 'Tbilisi'
      },
      {
        id: 4,
        country: 'Georgia',
        city: 'Batumi'
      },
      {
        id: 1,
        country: 'Russia',
        city: 'Moscow'
      }
    ],
    title: 'Best trip in Georgia!',
    photoUrl: 'https://images.unsplash.com/photo-1504964148034-86ded740d1e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  };
}

export function getTrips(): TripModel[] {
  return [
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip()
  ];
}
