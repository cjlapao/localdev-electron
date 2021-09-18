export interface KubeCtlVersion {
  major: string;
  minor: string;
  gitVersion: string;
  gitCommit: string;
  gitTreeState: string;
  buildDate: string;
  goVersion: string;
  compiler: string;
  platform: string;
}

export interface KubeCtlVersionResponse {
  clientVersion: KubeCtlVersion;
}
