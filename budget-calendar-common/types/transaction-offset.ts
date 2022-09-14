import { pipe } from 'fp-ts/lib/function';
import * as C from 'io-ts/Codec';
import { DollarAmount } from './common';

import { OffsetTransactionID, ReceiptID, RecurringTransactionID, SubscriptionID } from './ids';
import { Transaction } from './transaction';
import { LiteCodec } from './_lib';

export interface OffsetTransaction extends Transaction {
    id: OffsetTransactionID;
    subscription: SubscriptionID;
    receipt?: ReceiptID;

    offset: Offset;
}

export type Offset =
    | Offset_Basic
    | Offset_Adjustment;

export interface Offset_Basic {
    type: 'basic';
    offsetNet: DollarAmount;
    offsetEscrow: DollarAmount;
    transaction?: RecurringTransactionID;
}
export interface Offset_Adjustment {
    type: 'adjustment';
    adjustedNet: DollarAmount;
    adjustedEscrow: DollarAmount;
    transaction: RecurringTransactionID;
}

export const Offset_Basic: LiteCodec<Offset_Basic> = pipe(
    C.struct({
        type: C.literal('basic'),
        offsetNet: DollarAmount,
        offsetEscrow: DollarAmount,
    }),
    C.intersect(
        C.partial({
            transaction: RecurringTransactionID,
        }),
    ),
);
export const Offset_Adjustment: LiteCodec<Offset_Adjustment> = C.struct({
    type: C.literal('adjustment'),
    adjustedNet: DollarAmount,
    adjustedEscrow: DollarAmount,
    transaction: RecurringTransactionID,
});

export const Offset: LiteCodec<Offset> = pipe(
    {
        basic: Offset_Basic,
        adjustment: Offset_Adjustment,
    },
    C.sum('type'),
);

export const OffsetTransaction: LiteCodec<OffsetTransaction> = pipe(
    Transaction,
    C.intersect(
        C.struct({
            id: OffsetTransactionID,
            subscription: SubscriptionID,
            offset: Offset,
        }),
    ),
    C.intersect(
        C.partial({
            receipt: ReceiptID,
        }),
    ),
);
