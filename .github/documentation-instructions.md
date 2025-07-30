## Documenting TypeScript with JSDoc

This guide outlines the best practices for documenting TypeScript code using JSDoc. By adhering to these guidelines, you will generate clear, consistent, and easily understandable documentation that enhances code maintainability and improves the developer experience.

### Core Principles

Before diving into specific syntax, it's crucial to understand the fundamental principles of high-quality documentation.

* **Clarity and Conciseness:** Write clear and concise descriptions. Avoid jargon where possible and explain complex concepts simply.
* **Document the "Why," Not Just the "What":** Your code should already explain *what* it does. Your comments should focus on *why* a particular implementation was chosen, its limitations, or any non-obvious behavior.
* **Consistency is Key:** Maintain a consistent style and format throughout the entire codebase. This makes the documentation predictable and easier to read.
* **Keep Documentation Close to the Code:** JSDoc comments are placed directly before the code they describe, making them easy to find and update.
* **Provide Examples:** Use the `@example` tag to offer practical demonstrations of how to use the documented code. This is invaluable for other developers.
* **Leverage TypeScript's Type System:** While JSDoc has its own type system, when documenting TypeScript, you should primarily rely on TypeScript's own type annotations. JSDoc should be used to provide descriptions and other metadata.

### The JSDoc Block

All JSDoc comments begin with `/**` and end with `*/`. Each line within the block should start with an asterisk `*`.

```typescript
/**
 * This is a single-line JSDoc comment.
 */
const myVariable = 'hello';

/**
 * This is a multi-line JSDoc comment.
 * It provides a more detailed description of the following code.
 */
function myFunction() {
  // ...
}
```

### Essential JSDoc Tags for TypeScript

While there are many JSDoc tags, a subset is particularly important for effectively documenting TypeScript code.

| Tag | Description | TypeScript-Specific Notes |
| --- | --- | --- |
| **`@param`** | Describes a function or method parameter. The syntax is `@param {type} name - Description.` | The `{type}` should be omitted as TypeScript already defines the type. Focus on a clear description of the parameter's purpose. |
| **`@returns`** | Describes the return value of a function or method. The syntax is `@returns {type} - Description.` | Similarly, the `{type}` can be omitted. Describe what the function returns and under what conditions. |
| **`@description`** | Provides a longer description of the documented element. | Useful for providing more context than a single-line summary. |
| **`@example`** | Provides one or more examples of how to use the code. | Extremely valuable for clarity. Use Markdown within the example for code formatting. |
| **`@throws`** | Documents an error that a function or method may throw. The syntax is `@throws {ErrorType} - Description.` | Clearly state the conditions under which the error is thrown. |
| **`@deprecated`** | Marks a part of the code as deprecated. | Provide a description of why it's deprecated and what should be used instead. |
| **`@see`** | Provides a link to another part of the documentation or an external resource. | Useful for creating connections between related parts of your codebase. |
| **`@module`** | Identifies a file as a module. | Place this at the top of the file to provide a general description of the module's purpose. |
| **`@template`** | Documents a generic type parameter. The syntax is `@template T - Description.` | Essential for documenting generic functions and classes. |
| **`@typedef`** | Defines a custom type. | While less common with TypeScript's powerful type system, it can be useful for defining complex object literal types that are reused in JSDoc comments. |
| **`@property`** | Describes a property of an object. | Often used in conjunction with `@typedef`. |

### Documenting Common TypeScript Constructs

Here’s how to apply these principles and tags to various TypeScript constructs.

#### Functions and Arrow Functions

For functions, document the overall purpose, each parameter, and the return value.

````typescript
/**
 * Calculates the sum of two numbers.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of the two numbers.
 *
 * @example
 * ```ts
 * const result = add(1, 2); // 3
 * ```
 */
const add = (a: number, b: number): number => {
  return a + b;
};
````

#### Classes and Methods

Document the class itself and methods.
DO NOT document properties unless they are not self-explanatory.
DO NOT document constructors unless they have parameters that require explanation.

```typescript
/**
 * Represents a 2D point.
 */
class Point {
  public x: number;
  public y: number;

  /**
   * Creates a new Point instance.
   *
   * @param x - The initial x-coordinate.
   * @param y - The initial y-coordinate.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the distance to another point.
   *
   * @param other - The other point.
   * @returns The distance between the two points.
   */
  public distanceTo(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
```

#### Interfaces and Types

Document the purpose of the interface or type.
DO NOT document properties unless they are not self-explanatory.

```typescript
/**
 * Represents a user in the system.
 */
interface User {
  id: number;
  username: string;
  email?: string;
}

/**
 * Represents a product with its essential details.
 */
type Product = {
  /**
   * The unique SKU of the product.
   */
  sku: string;
  name: string;
  price: number;
};
```

#### Enums

Provide a description for the enum itself and for each of its members.

```typescript
/**
 * Represents the status of an order.
 */
enum OrderStatus {
  /**
   * The order has been placed but not yet processed.
   */
  Pending,
  /**
   * The order is being processed.
   */
  Processing,
  /**
   * The order has been shipped.
   */
  Shipped,
  /**
   * The order has been delivered.
   */
  Delivered,
  /**
   * The order has been cancelled.
   */
  Cancelled,
}
```

#### Generics

Use the `@template` tag to document generic type parameters.

```typescript
/**
 * A generic function that returns the first element of an array.
 * @template T - The type of elements in the array.
 * @param arr - The input array.
 * @returns The first element of the array, or undefined if the array is empty.
 */
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * A generic class representing a pair of items.
 * @template T - The type of the first item.
 * @template U - The type of the second item.
 */
class Pair<T, U> {
  public first: T;
  public second: U;

  constructor(first: T, second: U) {
    this.first = first;
    this.second = second;
  }
}
```