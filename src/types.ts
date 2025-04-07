export type Bundle = { array?: Array<any> } & Record<string, any>;

export type Link = {
  type: 'link';
  valueLabel: string;
  resourceId?: string;
  resourceType: 'execution' | 'scenario';
  additionalParams?: Record<string, any>;
};

export type Metadata = {
  version: number;
  keyLabel: string;
} & Link;

export type MetadataList = Array<Metadata>;

export type DoneCallback = (err?: Error | null) => void;

export type DoneWithInfoCallback = (err?: Error | null, done?: any) => void;

export type DoneWithReportCallback = (err?: Error | null, report?: any[] | null) => void;

export type DoneWithResultCallback = (err?: Error | null, result?: any, metadata?: MetadataList) => void;

export type DoneWithFormCallback = (err?: Error | null, form?: any) => void;
