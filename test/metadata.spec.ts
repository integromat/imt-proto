import { expectTypeOf } from 'vitest';
import type { Centicredits, CreditBreakdownItem, MetadataList } from '@integromat/proto/types';

describe('credit breakdown metadata contract', () => {
  it('shares a typed optional breakdown while retaining existing formula parameters', () => {
    expectTypeOf<Centicredits['additionalParams']['breakdown']>().toEqualTypeOf<CreditBreakdownItem[] | undefined>();
    expectTypeOf<{ label: string; value: string }>().not.toExtend<CreditBreakdownItem>();
    expectTypeOf<{ value: number }>().not.toExtend<CreditBreakdownItem>();

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
          executionTimeMs: 1000,
        },
      },
    ] satisfies MetadataList;

    expect(metadata[0].additionalParams.breakdown.reduce((sum, item) => sum + item.value, 0)).toBe(
      metadata[0].additionalParams.centicreditsConsumption,
    );
  });
});
