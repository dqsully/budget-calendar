import { pipe } from 'fp-ts/lib/function';
import * as C from 'io-ts/Codec';

import { Transaction } from "./transaction";
import { OneTimeTransactionID, PlaceholderTransactionID, ReceiptID } from "./ids";
import { LiteCodec } from './_lib';

interface OneTimeTransaction extends Transaction {
    id: OneTimeTransactionID;
    receipt?: ReceiptID;

    realizes?: PlaceholderTransactionID,
}

export const OneTimeTransaction: LiteCodec<OneTimeTransaction> = pipe(
    Transaction,
    C.intersect(
        C.struct({
            id: OneTimeTransactionID,
        }),
    ),
    C.intersect(
        C.partial({
            realizes: PlaceholderTransactionID,
            receipt: ReceiptID,
        })
    ),
);
