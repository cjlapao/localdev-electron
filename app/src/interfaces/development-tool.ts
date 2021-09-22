export class DevelopmentTool {
  name: string;
  localVersion: DevelopmentToolVersion;
  onlineVersion: DevelopmentToolVersion;
  status: DevelopmentToolStatus;
  properties: object[];
  initiated: boolean;
  init: Function;

  constructor(toolName: string) {
    this.name = toolName;
    this.properties = [];
    this.status = DevelopmentToolStatus.Unknown;
    this.initiated = false;
  }
}

export class DevelopmentToolVersion {
  version: string;
  commit: string;
  major: number;
  minor: number;
  patch: number;

  constructor(versionStr: string) {
    if (versionStr) {
      this.version = versionStr.replace(/v/g, '');

      const versionSegments = versionStr.split('.');

      if (versionSegments.length > 0) {
        try {
          this.major = parseInt(versionSegments[0]);
          this.minor = parseInt(versionSegments[1]);
          if (versionSegments.length >= 3) {
            this.patch = parseInt(versionSegments[2]);
          }
        } catch (err) {}
      }
    }
  }
}

export enum DevelopmentToolStatus {
  Unknown = 'UNKNOWN',
  Running = 'RUNNING',
  Stopped = 'STOPPED',
  NotFound = 'NOTFOUND',
  Installed = 'INSTALLED',
  Error = 'ERROR',
}
