export class UserDisplayedDto {
  id?: number | undefined;
  email?: string;
  userName: string = '';
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  roleName?: string;
  roles: string[] = [];
}
