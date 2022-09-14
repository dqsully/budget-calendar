import { pipe } from 'fp-ts/lib/function';
import * as C from 'io-ts/Codec';

import { DateFromTimestamp, DollarAmount, Name } from "./common";
import { CategoryID, SubscriptionID } from "./ids";
import { LiteCodec } from './_lib';

export interface Subscription {
    id: SubscriptionID;

    name: Name;
    category: CategoryID;
    // TODO: replace with timezone-less date
    start: Date;
    end: SubscriptionEndCondition;
}

export type SubscriptionEndCondition =
    | SubscriptionEndCondition_None
    | SubscriptionEndCondition_Date
    | SubscriptionEndCondition_Debt;

export interface SubscriptionEndCondition_None {
    type: 'none';
}
export interface SubscriptionEndCondition_Date {
    type: 'date';
    // TODO: replace with timezone-less date
    date: Date;
}
export interface SubscriptionEndCondition_Debt {
    type: 'debt';
    startingBalance: DollarAmount;
    interestRate: number;
}

export const SubscriptionEndCondition_None: LiteCodec<SubscriptionEndCondition_None> = C.struct({
    type: C.literal('none'),
});
export const SubscriptionEndCondition_Date: LiteCodec<SubscriptionEndCondition_Date> = C.struct({
    type: C.literal('date'),
    date: DateFromTimestamp,
});
export const SubscriptionEndCondition_Debt: LiteCodec<SubscriptionEndCondition_Debt> = C.struct({
    type: C.literal('debt'),
    startingBalance: DollarAmount,
    interestRate: C.number,
});

export const SubscriptionEndCondition: LiteCodec<SubscriptionEndCondition> = pipe(
    {
        none: SubscriptionEndCondition_None,
        date: SubscriptionEndCondition_Date,
        debt: SubscriptionEndCondition_Debt,
    },
    C.sum('type'),
);

export const Subscription: LiteCodec<Subscription> = C.struct({
    id: SubscriptionID,

    name: Name,
    category: CategoryID,
    start: DateFromTimestamp,
    end: SubscriptionEndCondition,
});
