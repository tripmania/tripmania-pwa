import {AchievementEntity} from '@entities/Achievement.entity';

export interface UserEntity {
  id?: number;
  photoUrl?: string;
  name: string;
  login: string;
  email: string;
  status?: string;
  achievements?: AchievementEntity[];
}
