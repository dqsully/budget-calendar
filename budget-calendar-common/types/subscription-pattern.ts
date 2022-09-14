import * as C from 'io-ts/Codec';
import { pipe } from 'fp-ts/function';

import { DateFromTimestamp, DayOfMonth, DollarAmount, Month, Weekday } from "./common";
import { SubscriptionPatternID } from "./ids";
import { LiteCodec } from './_lib';

export type SubscriptionPattern =
    | SubscriptionPattern_Yearly
    | SubscriptionPattern_Monthly
    | SubscriptionPattern_Weekly;

export interface SubscriptionPattern_Yearly extends SubscriptionPattern_Base {
    period: 'yearly';
    every: number;

    daysOfMonth: DayOfMonth[];
    months: Month[];
    snapTo?: {
        weekdays: Weekday[];
        excludeBankHolidays: boolean;
    };
}
export interface SubscriptionPattern_Monthly extends SubscriptionPattern_Base {
    period: 'monthly';
    every: number;

    daysOfMonth: DayOfMonth[];
    snapTo?: {
        weekdays: Weekday[];
        excludeBankHolidays: boolean;
    };
}
export interface SubscriptionPattern_Weekly extends SubscriptionPattern_Base {
    period: 'weekly';
    every: number;

    daysOfWeek: Weekday[];
    snapTo?: {
        excludeBankHolidays: boolean;
    };
}

interface SubscriptionPattern_Base {
    id: SubscriptionPatternID;

    // TODO: replace with timezone-less date
    start: Date;
    escrow: DollarAmount;
}

const SubscriptionPattern_Base = C.struct({
    id: SubscriptionPatternID,
    start: DateFromTimestamp,
    escrow: DollarAmount,
});

export const SubscriptionPattern_Yearly: LiteCodec<SubscriptionPattern_Yearly> = pipe(
    SubscriptionPattern_Base,
    C.intersect(
        C.struct({
            period: C.literal('yearly'),
            every: C.number,
            daysOfMonth: C.array(DayOfMonth),
            months: C.array(Month),
        })
    ),
    C.intersect(
        C.partial({
            snapTo: C.struct({
                weekdays: C.array(Weekday),
                excludeBankHolidays: C.boolean,
            }),
        }),
    ),
);
export const SubscriptionPattern_Monthly: LiteCodec<SubscriptionPattern_Monthly> = pipe(
    SubscriptionPattern_Base,
    C.intersect(
        C.struct({
            period: C.literal('monthly'),
            every: C.number,
            daysOfMonth: C.array(DayOfMonth),
        })
    ),
    C.intersect(
        C.partial({
            snapTo: C.struct({
                weekdays: C.array(Weekday),
                excludeBankHolidays: C.boolean,
            }),
        }),
    ),
);
export const SubscriptionPattern_Weekly: LiteCodec<SubscriptionPattern_Weekly> = pipe(
    SubscriptionPattern_Base,
    C.intersect(
        C.struct({
            period: C.literal('weekly'),
            every: C.number,
            daysOfWeek: C.array(Weekday),
        })
    ),
    C.intersect(
        C.partial({
            snapTo: C.struct({
                excludeBankHolidays: C.boolean,
            }),
        }),
    ),
);

export const SubscriptionPattern: LiteCodec<SubscriptionPattern> = pipe(
    {
        yearly: SubscriptionPattern_Yearly,
        monthly: SubscriptionPattern_Monthly,
        weekly: SubscriptionPattern_Weekly,
    },
    C.sum('period'),
);
