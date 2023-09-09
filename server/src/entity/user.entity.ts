export interface IUserEntity {
  $typename: 'UserEntity';
  id: string;
  createdAt: Date;
  phoneNumber: string | null;
  email: string | null;
  nickname: string;
  bio: string | null;
}
