import { pipe } from 'fp-ts/lib/function';
import * as C from 'io-ts/Codec';

import { RecurringTransactionID, SubscriptionID, SubscriptionPatternID } from './ids';
import { Transaction } from './transaction';
import { LiteCodec } from './_lib';

export interface RecurringTransaction extends Transaction {
    id: RecurringTransactionID;
    subscription: SubscriptionID;
    pattern: SubscriptionPatternID;
}

export const RecurringTransaction: LiteCodec<RecurringTransaction> = pipe(
    Transaction,
    C.intersect(
        C.struct({
            id: RecurringTransactionID,
            subscription: SubscriptionID,
            pattern: SubscriptionPatternID,
        }),
    ),
);
