import { RoleSelectItem } from '../../../models/users/user-role.model';

export class DisplayRoleUserDto implements RoleSelectItem {
  normalizedName: string = '';
  id: number = 0;
  name: string = '';
  isDisabled: boolean = false;
}
