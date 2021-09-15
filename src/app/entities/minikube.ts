export interface MinikubeStatusMessage {
  data:            Data;
  datacontenttype: string;
  id:              string;
  source:          string;
  specversion:     string;
  type:            string;
}

export interface Data {
  message: string;
}

export enum MinikubeStatus {
  Unknown = "UNKNOWN",
  Running = "RUNNING",
  Stopped = "STOPPED",
  NotFound = "NOTFOUND"
}

export interface Minikube {
  status: MinikubeStatus
}
