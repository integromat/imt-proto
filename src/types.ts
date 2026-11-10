export type Bundle = { array?: Array<any> } & Record<string, any>;

export type Link = {
  type: 'link';
  keyLabel: string;
  valueLabel: string;
  resourceId?: string;
  resourceType: 'execution' | 'scenario';
  additionalParams?: Record<string, any>;
};

/** One display row in a module's complete credit-cost breakdown. */
export type CreditBreakdownItem = {
  /** Non-empty display label, unique within the breakdown. */
  label: string;
  /** Non-negative integer cost in centicredits (100 centicredits = 1 credit). */
  value: number;
};

export type Centicredits = {
  type: 'centicredits';
  additionalParams: {
    centicreditsConsumption?: number;
    /**
     * Optional complete module-cost breakdown, including any base operation charge.
     * Entries describe the aggregate cost; they do not create additional charges.
     * Omit token rows when token-credit billing does not apply (e.g. own-key connections).
     */
    breakdown?: CreditBreakdownItem[];
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
