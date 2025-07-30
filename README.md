# Make Proto-Classes (formerly Integromat Proto-Classes)

A TypeScript library providing the foundational base classes and types for building Make.com (formerly Integromat) modules and applications. These classes form the core building blocks that enable developers to create triggers, actions, transformers, and other module types that integrate seamlessly with the Make platform.

## Overview

Make.com uses a module-based architecture where scenarios are built by connecting different types of modules that process data bundles through a standardized execution flow. This library provides the abstract base classes and error handling system that all Make modules must implement.

### Module Types Supported

- **Triggers** (`IMTTrigger`) - Initiate scenarios by watching for changes in external services
- **Actions** (`IMTAction`) - Perform operations like create, update, delete on external services
- **Transformers** (`IMTTransformer`) - Process and modify data as it flows between modules
- **Aggregators** (`IMTAggregator`) - Combine multiple data bundles into consolidated results
- **Feeders** (`IMTFeeder`) - Convert input data into processable bundle arrays
- **Routers** (`IMTRouter`) - Direct data flow through conditional logic and branching
- **Convergers** (`IMTConverger`) - Merge multiple execution paths back into a single flow
- **Human-in-the-Loop** (`IMTHITL`) - Pause execution for manual intervention or approval
- **Accounts** (`IMTAccount`, `IMTOAuthAccount`) - Handle authentication and connections to external services

### Execution Model

Each module follows Make's standardized 4-phase execution cycle:

1. **Initialization** - Set up resources and validate configuration
2. **Operation** - Perform the core module functionality
3. **Commit/Rollback** - Finalize changes or undo on error
4. **Finalization** - Clean up resources and complete execution

Data flows through scenarios as **bundles** - standardized containers that carry information between modules. The library provides comprehensive error handling with specialized error classes that determine scenario behavior (rollback, retry, disable, etc.).

## Installation

```sh
npm install @integromat/proto
```

## Usage

### Modern Import (Recommended)

```typescript
import { IMTAction, IMTTrigger, IMTTransformer, Bundle, DoneWithResultCallback } from '@integromat/proto';

class MyCustomAction extends IMTAction {
  write(bundle: Bundle, done: DoneWithResultCallback): void {
    // Implement your action logic
    this.log('Processing bundle:', bundle);

    try {
      // Perform external API call or operation
      const result = this.processData(bundle);
      done(null, result);
    } catch (error) {
      done(error);
    }
  }
}
```

### Trigger Implementation Example

```typescript
import { IMTTrigger, DoneWithResultCallback } from '@integromat/proto';

class MyWebhookTrigger extends IMTTrigger {
  read(done: DoneWithResultCallback): void {
    // Fetch new data from external service
    this.fetchDataFromAPI()
      .then((data) => {
        if (data.length > 0) {
          done(null, data); // Pass bundles to next module
        } else {
          done(null, []); // No new data, scenario ends
        }
      })
      .catch((error) => done(error));
  }
}
```

### Error Handling

```typescript
import {
  DataError, // Invalid data - move to Dead Letter Queue
  RuntimeError, // Logical error - rollback scenario
  RateLimitError, // API rate limit - pause scenario
  ConnectionError, // Network issue - retry
} from '@integromat/proto';

// In your module implementation
if (!bundle.email) {
  throw new DataError('Email field is required');
}

if (response.status === 429) {
  throw new RateLimitError('API rate limit exceeded', 60000); // Wait 60s
}
```

### Global Import (Legacy - Deprecated)

```javascript
// For backward compatibility only
import '@integromat/proto/global';

// Classes are now available globally
const action = new IMTAction();
```

## Core Components

### Base Classes

- `IMTBase` - Foundation class with logging, events, and lifecycle management
- `IMTAccount` - Base for service authentication and connection management
- `IMTOAuthAccount` - OAuth-specific authentication flows

### Data Types

- `Bundle` - Data container flowing between modules
- `Metadata` - Additional information about operations (links, costs)
- Callback types for different operation patterns

### Error System

Comprehensive error classes that control scenario behavior:

- `DataError` - Invalid data handling
- `RuntimeError` - Execution failures requiring rollback
- `RateLimitError` - API throttling with automatic delays
- `InvalidConfigurationError` - Configuration issues that disable scenarios
- `ConnectionError` - Network connectivity problems
- And many more specialized error types

## Module Lifecycle

All modules implement the standard Make execution pattern:

```typescript
class MyModule extends IMTBase {
  // 1. Initialize resources
  initialize(done: DoneCallback): void {
    super.initialize(done);
  }

  // 2. Perform main operation (varies by module type)
  // write(), read(), transform(), etc.

  // 3. Commit or rollback changes
  commit(done: DoneWithReportCallback): void {
    // Finalize all operations
    done(null, null);
  }

  // 4. Clean up resources
  finalize(done: DoneCallback): void {
    super.finalize(done);
  }
}
```

## Development

This library follows Make's architectural patterns and provides the foundation for building robust, scalable integrations. All base classes include comprehensive JSDoc documentation with examples and best practices.

For more information about Make's module system and scenario execution, see the [Make.com documentation](https://help.make.com).

## TypeScript Support

Full TypeScript support with detailed type definitions for all classes, interfaces, and callback patterns used in the Make platform.
