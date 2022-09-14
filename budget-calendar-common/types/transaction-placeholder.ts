import { pipe } from 'fp-ts/lib/function';
import * as C from 'io-ts/Codec';

import { OneTimeTransactionID, PlaceholderTransactionID } from './ids';
import { Transaction } from './transaction';
import { LiteCodec } from './_lib';

export interface PlaceholderTransaction extends Transaction {
    id: PlaceholderTransactionID;

    realizedBy?: OneTimeTransactionID;
}

export const PlaceholderTransaction: LiteCodec<PlaceholderTransaction> = pipe(
    Transaction,
    C.intersect(
        C.struct({
            id: PlaceholderTransactionID,
        }),
    ),
    C.intersect(
        C.partial({
            realizedBy: OneTimeTransactionID,
        }),
    ),
);
