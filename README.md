# Integromat Proto-Classes

[![NPM Version][npm-image]][npm-url] [![Travis CI][travis-image]][travis-url]

## Installation

```sh
$ npm install @integromat/proto --save-dev
```

## Usage

### A. Usage via module import

```ts
import { ... } from '@integromat/proto';
```

### B. Usage via globals (deprecated)

```js
require('@integromat/proto/global');
```

## Credit-cost metadata

Native apps can report a complete module-cost breakdown through the existing
`centicredits` operation metadata. The same metadata is supported by callback
modules and an agent's `FinishAction.metadata`.

```ts
import type { MetadataList } from '@integromat/proto';

const metadata = [
  {
    type: 'centicredits',
    version: 1,
    additionalParams: {
      centicreditsConsumption: 400,
      breakdown: [
        { label: 'Action performed', value: 100 },
        { label: 'AI tokens', value: 250 },
        { label: 'Eval tokens', value: 50 },
      ],
    },
  },
] satisfies MetadataList;
```

`CreditBreakdownItem` defines each row as `{ label: string; value: number }`.
Browser consumers can import the metadata contract with `import type` from
`@integromat/proto/types`; this entry point exposes types without runtime classes.
Values are non-negative integer centicredits, and labels must be non-empty and
unique within the array. The producer includes every module-cost component,
including the base operation charge, so the rows describe the aggregate module
cost. Other charges, such as AI mapping costs, are separate from this breakdown.

The array is optional and does not change billing: the engine still evaluates
the module's `centicreditsFormula` to calculate its charge. Apps without a
breakdown keep their existing behavior. For own-key connections, omit token
rows when token-credit billing does not apply; an operation-only breakdown is
valid. Consumers must validate metadata received over the network and use the
recorded charged total when the breakdown is unavailable or a charge is waived.

## License

Copyright (c) 2014-2020 Integromat

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/imt-proto.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/imt-proto
[travis-image]: https://img.shields.io/travis/integromat/imt-proto/master.svg?style=flat-square&label=unit
[travis-url]: https://travis-ci.org/integromat/imt-proto
