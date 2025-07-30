/**
 * @module Types
 *
 * Core type definitions and interfaces used throughout the Make's Native Apps ecosystem.
 * Provides standardized data structures for scenario processing and communication.
 */

/**
 * Bundle represents a collection of data flowing through the scenario flow.
 *
 * Bundles are the primary data containers that move between modules, carrying
 * both the main data payload and any additional metadata or context information
 * needed for processing.
 */
export type Bundle = { array?: Array<any> } & Record<string, any>;

/**
 * Link metadata for creating references between scenarios and executions.
 *
 * Links enable cross-referencing between different scenarios executions,
 * allowing users to navigate between related scenarios and track data flow
 * across complex multi-scenario operations.
 */
export type Link = {
  type: 'link';
  /**
   * Display label for the link key in the user interface.
   */
  keyLabel: string;
  /**
   * Display label for the link value in the user interface.
   */
  valueLabel: string;
  /**
   * Optional identifier for the target resource being linked to.
   */
  resourceId?: string;
  /**
   * The type of resource this link points to.
   */
  resourceType: 'execution' | 'scenario';
  /**
   * Additional parameters for customizing link behavior or appearance.
   */
  additionalParams?: Record<string, any>;
};

/**
 * Centicredits metadata for tracking computational resource consumption.
 *
 * Centicredits represent the billing units consumed during scenario execution,
 * allowing for accurate cost tracking and resource usage monitoring.
 */
export type Centicredits = {
  type: 'centicredits';
  additionalParams: {
    /**
     * Number of centicredits consumed by this operation.
     */
    centicreditsConsumption?: number;
    [key: string]: any;
  };
};

/**
 * Metadata container for additional information about operations and results.
 *
 * Metadata provides supplementary information about module operation,
 * including links to related resources and resource consumption tracking.
 */
export type Metadata = {
  /**
   * Version number for metadata format compatibility.
   */
  version: number;
} & (Link | Centicredits);

/**
 * Collection of metadata items associated with an operation or result.
 */
export type MetadataList = Array<Metadata>;

/**
 * Detailed breakdown of centicredits consumption across different operation types.
 *
 * This type provides comprehensive tracking of resource usage, breaking down
 * costs by operation type and allowing for detailed billing and analytics.
 */
export type CenticreditsConsumption = {
  /**
   * Resource consumption for the main module operation.
   */
  module?: {
    /**
     * Cost in centicredits for the module execution.
     */
    cost: number;
    /**
     * Duration of the module execution in milliseconds.
     */
    duration: number;
  };
  /**
   * Resource consumption for AI-powered mapping operations.
   */
  aiMappings?: {
    /**
     * Cost in centicredits for AI mapping operations.
     */
    cost: number;
    /**
     * Optional trigger field that initiated the AI mapping.
     */
    triggerField?: string;
  }[];
  /**
   * Resource consumption for AI-powered filtering operations.
   */
  aiFilterings?: {
    /**
     * Cost in centicredits for AI filtering operations.
     */
    cost: number;
    /**
     * Optional trigger field that initiated the AI filtering.
     */
    triggerField?: string;
  }[];
  /**
   * Total cost across all operation types.
   */
  totalCost: number;
};

/**
 * Simple callback function with no return value.
 * Used for operations that only need to signal completion or failure.
 */
export type NoParametersCallback = (error?: Error | null) => void;

/**
 * Standard callback function for operations that can succeed or fail.
 * The most basic callback pattern used throughout the system.
 */
export type DoneCallback = (err?: Error | null) => void;

/**
 * Callback function for operations that return additional information.
 * Used when operations need to provide context or status details beyond success/failure.
 */
export type DoneWithInfoCallback = (err?: Error | null, info?: any) => void;

/**
 * Callback function for operations that generate reports or logs.
 * Typically used by commit and rollback operations to provide detailed status information.
 */
export type DoneWithReportCallback = (err?: Error | null, report?: any[] | null) => void;

/**
 * Callback function for operations that return processed data and optional metadata.
 * The primary callback pattern for data processing operations throughout the scenario flow..
 */
export type DoneWithResultCallback = (err?: Error | null, result?: any, metadata?: MetadataList) => void;
