export interface ProtocolDataOutput {
  protocolData: ProtocolDataDto[];
  total: number;
  skip: number;
  limit: number;
}

export class ProtocolDataDto {
  id?: string;
  date?: Date;
  gridVoltage?: string;
  gridFrequency?: string;
  acOutputApparentPower?: string;
  acOutputActivePower?: string;
  outputLoadPercent?: string;
  deviceStatus2?: string;
}
