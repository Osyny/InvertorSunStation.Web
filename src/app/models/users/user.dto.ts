export interface UsersResponse {
  users: UserDto[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserDto {
  id?: number | undefined;
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  roleName?: string;
}
