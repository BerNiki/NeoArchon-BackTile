export interface LivenessResponseI {
  ok: boolean;
  port: string;
  uptime: number;
  timestamp: string;
}

export enum DbStatusEnum {
  UP = 'up',
  DOWN = 'down',
}

export interface DbStatusResponseI {
  db: DbStatusEnum;
}
