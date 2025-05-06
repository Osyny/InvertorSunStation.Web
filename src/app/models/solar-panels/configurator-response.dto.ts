import { SolarPanelDto } from './solar-panel.dto';

export interface ConfiguratorResponse {
  panel: SolarPanelDto;
  count: number;
  totalPower: number;
}
