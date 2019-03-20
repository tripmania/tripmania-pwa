import {AchievementModel} from '@models/Achievement.model';

export interface UserModel {
  id?: string;
  photoUrl?: string;
  name: string;
  login: string;
  email: string;
  status?: string;
  achievements?: AchievementModel[];
}
