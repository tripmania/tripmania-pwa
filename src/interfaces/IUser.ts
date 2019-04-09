import {IAchievement} from '@interfaces/IAchievement';

export interface IUser {
  id?: number;
  photoUrl?: string;
  name: string;
  login: string;
  email: string;
  status?: string;
  achievements?: IAchievement[];
}
