import {TripModel} from '@models/Trip.model';

export function getTrip():  TripModel {
  return {
    id: 123,
    userId: 123,
    title: 'Лучший трип в грузию',
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
