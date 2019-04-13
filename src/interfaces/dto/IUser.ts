import {IAchievement} from '@interfaces/dto/IAchievement';

export interface IUser {
  id?: number;
  photoUrl?: string;
  name: string;
  login: string;
  email: string;
  status?: string;
  achievements?: IAchievement[];
}
