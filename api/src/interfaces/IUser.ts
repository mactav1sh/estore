export interface IUser {
  id?: string;
  name: string;
  role: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  passwordChangedAt: string;
  comparePasswords: (password: string, hashedPassword: string) => boolean;
}

export default IUser;
