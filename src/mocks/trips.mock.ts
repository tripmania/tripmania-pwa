import {TripModel} from '@models/Trip.model';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504964148034-86ded740d1e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';

export function getTrip(photoUrl: string = DEFAULT_IMAGE):  TripModel {
  return {
    id: 123,
    userId: 123,
    startDate: 1553391844305,
    endDate: 1573391890901,
    path: [
      'Russia',
      'Berlin',
      'Larnaca',
      'Tbilisi',
      'Batumi',
      'Russia'
    ],
    title: 'Best trip in Georgia!',
    photoUrl
  };
}

export function getTrips(): TripModel[] {
  return [
    getTrip(),
    getTrip('https://www.wallpaperup.com/uploads/wallpapers/2014/02/14/255795/0b6ccd76932e1746e7e3b4645784653c-700.jpg'),
    getTrip('http://loadion.com/ii/206507791_ce513f2803.jpg'),
    getTrip('http://www.kodul.cat/look/full/14/141841/travel-wallpaper.jpg'),
    getTrip('http://alliswall.com/file/5608/1920x1200/16:9/new_york_at_early_morning.jpg'),
    getTrip('http://www.itaniumsolutions.org/pics/max/100/1007135_laptop-background-hd-wallpaper.jpg'),
    getTrip('https://www.pixelstalk.net/wp-content/uploads/2016/09/HD-Adventure-Wallpaper.jpg'),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip(),
    getTrip()
  ];
}
