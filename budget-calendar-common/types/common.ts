import * as D from 'io-ts/Decoder';
import * as C from 'io-ts/Codec';
import { pipe } from 'fp-ts/function';

export type Name = string & NameBrand;
export interface NameBrand {
    readonly Name: unique symbol;
}

export type DollarAmount = number & DollarAmountBrand;
export interface DollarAmountBrand {
    readonly DollarAmount: unique symbol;
}

export type Integer = number & IntegerBrand;
export interface IntegerBrand {
    readonly Integer: unique symbol;
}

export type DayOfMonth = Integer & DayOfMonthBrand;
export interface DayOfMonthBrand {
    readonly DayOfMonth: unique symbol;
}

export type Month = Integer & MonthBrand;
export interface MonthBrand {
    readonly Month: unique symbol;
}

export enum MonthByName {
    January = 1 as Month,
    February = 2 as Month,
    March = 3 as Month,
    April = 4 as Month,
    May = 5 as Month,
    June = 6 as Month,
    July = 7 as Month,
    August = 8 as Month,
    September = 9 as Month,
    October = 10 as Month,
    November = 11 as Month,
    December = 12 as Month,
}

export type Weekday = Integer & WeekdayBrand;
export interface WeekdayBrand {
    readonly Weekday: unique symbol;
}

export enum WeekdayByName {
    Sunday = 1 as Weekday,
    Monday = 2 as Weekday,
    Tuesday = 3 as Weekday,
    Wednesday = 4 as Weekday,
    Thursday = 5 as Weekday,
    Friday = 6 as Weekday,
    Saturday = 7 as Weekday,
}

const nameRegex = /^[a-zA-Z0-9 ]+$/;
// Leaf literal type, no encoding needed
export const Name = C.fromDecoder(
    pipe(
        D.string,
        D.refine(nameRegex.test as (s: string) => s is Name, 'Name'),
    ),
);

// Leaf literal type, no encoding needed
export const DollarAmount = C.fromDecoder(
    pipe(
        D.number,
        D.parse((n) => D.success(Math.round(n * 100) / 100 as DollarAmount))
    ),
);

// Leaf literal type, no encoding needed
export const Integer = C.fromDecoder(
    pipe(
        D.number,
        D.refine((n): n is Integer => n % 1 == 0, 'Integer'),
    ),
);

// Leaf literal type, no encoding needed
export const DayOfMonth = C.fromDecoder(
    pipe(
        Integer,
        D.refine((n): n is DayOfMonth => n >= 1 && n <= 31, 'DayOfMonth'),
    ),
);

// Leaf literal type, no encoding needed
export const Month = C.fromDecoder(
    pipe(
        Integer,
        D.refine((n): n is Month => n >= 1 && n <= 12, 'Month'),
    ),
);

// Leaf literal type, no encoding needed
export const Weekday = C.fromDecoder(
    pipe(
        Integer,
        D.refine((n): n is Weekday => n >= 1 && n <= 7, 'Weekday'),
    ),
);

// Leaf translated type, full codec needed
export const DateFromTimestamp = C.make(
    pipe(
        D.union(D.number, D.string),
        D.parse((n) => D.success(new Date(n))),
    ),
    {
        encode: Date.prototype.getTime,
    },
);

const EncodedRegExp = C.struct({
    source: C.string,
    flags: C.string,
});

// Leaf translated type, full codec needed
export const RegExpFromObject = C.make(
    pipe(
        EncodedRegExp,
        D.parse((e) => D.success(new RegExp(e.source, e.flags))),
    ),
    {
        encode: (r) => {
            return {
                source: r.source,
                flags: r.flags,
            };
        },
    },
);
