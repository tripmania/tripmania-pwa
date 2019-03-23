import {AchievementModel} from '@models/Achievement.model';

export interface UserModel {
  id?: number;
  photoUrl?: string;
  name: string;
  login: string;
  email: string;
  status?: string;
  achievements?: AchievementModel[];
}
