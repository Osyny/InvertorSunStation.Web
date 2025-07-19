import { SelectItem } from '../../../models/select-item';

export class DisplayRoleUserDto implements SelectItem {
  normalizedName: string = '';
  id: number = 0;
  name: string = '';
  isDisabled: boolean = false;
}
