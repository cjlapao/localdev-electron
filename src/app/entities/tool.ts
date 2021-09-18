export interface DevelopmentTool {
  name: string;
  installedVersion?: string;
  onlineVersion?: string;
  status?: DevelopmentToolStatus;
  properties?: object[];
}

export enum DevelopmentToolStatus {
  Unknown = 'UNKNOWN',
  Running = 'RUNNING',
  Stopped = 'STOPPED',
  NotFound = 'NOTFOUND',
  Installed = 'INSTALLED',
}
