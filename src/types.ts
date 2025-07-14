export type Bundle = { array?: Array<any> } & Record<string, any>;

export type Link = {
  type: 'link';
  keyLabel: string;
  valueLabel: string;
  resourceId?: string;
  resourceType: 'execution' | 'scenario';
  additionalParams?: Record<string, any>;
};

export type Centicredits = {
  type: 'centicredits';
  additionalParams: {
    centicreditsConsumption?: number;
    [key: string]: any;
  };
};

export type Metadata = {
  version: number;
} & (Link | Centicredits);

export type MetadataList = Array<Metadata>;

export type CenticreditsConsumption = {
  module?: {
    cost: number;
    duration: number;
  };
  aiMappings?: {
    cost: number;
    triggerField?: string;
  }[];
  aiFilterings?: {
    cost: number;
    triggerField?: string;
  }[];
  totalCost: number;
};

export type DoneCallback = (err?: Error | null) => void;

export type DoneWithInfoCallback = (err?: Error | null, done?: any) => void;

export type DoneWithReportCallback = (err?: Error | null, report?: any[] | null) => void;

export type DoneWithResultCallback = (err?: Error | null, result?: any, metadata?: MetadataList) => void;

export type DoneWithFormCallback = (err?: Error | null, form?: any) => void;
