import * as C from 'io-ts/Codec';
import { pipe } from 'fp-ts/function';

import { DateFromTimestamp, DollarAmount } from "./common";
import { BudgetID, BudgetPeriodID, CategoryID } from "./ids";
import { LiteCodec } from "./_lib";

export interface BudgetPeriod {
    id: BudgetPeriodID;
    parent?: BudgetPeriodID;

    // TODO: replace with timezone-less dates
    start: Date;
    end: Date;
}

export interface Budget {
    id: BudgetID;
    period: BudgetPeriodID;
    category: CategoryID;

    net: DollarAmount;
}

export const Budget: LiteCodec<Budget> = C.struct({
    id: BudgetID,
    period: BudgetPeriodID,
    category: CategoryID,
    net: DollarAmount,
});

export const BudgetPeriod: LiteCodec<BudgetPeriod> = pipe(
    C.struct({
        id: BudgetPeriodID,

        start: DateFromTimestamp,
        end: DateFromTimestamp,
    }),
    C.intersect(
        C.partial({
            parent: BudgetPeriodID,
        }),
    ),
);
