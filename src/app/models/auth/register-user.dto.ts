export class RegisterUserDto {
  firstName?: string;
  userName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roles: string[] = [];
}
