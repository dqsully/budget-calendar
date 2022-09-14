import * as C from 'io-ts/Codec';
import { pipe } from 'fp-ts/function';
import { CategoryID } from './ids';
import { DollarAmount, DateFromTimestamp } from './common';
import { LiteCodec } from './_lib';

// TODO: limit the length of the Transaction strings

export interface Transaction {
    time: Date;
    location: string;
    net: DollarAmount;
    category: CategoryID | null;
    note: string;

    items?: TransactionItem[];
}

export interface TransactionItem {
    description: string;
    net: DollarAmount;
    category?: CategoryID;
}

export const Transaction: LiteCodec<Transaction> = C.struct({
    time: DateFromTimestamp,
    location: C.string,
    net: DollarAmount,
    category: C.nullable(CategoryID),
    note: C.string,
});

export const TransactionItem: LiteCodec<TransactionItem> = pipe(
    C.struct({
        description: C.string,
        net: DollarAmount,
    }),
    C.intersect(
        C.partial({
            category: CategoryID,
        }),
    ),
);
