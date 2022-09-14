import * as D from 'io-ts/Decoder';
import * as C from 'io-ts/Codec';
import { pipe } from 'fp-ts/function';

export type ID = string & IDBrand;
export interface IDBrand {
    readonly ID: unique symbol;
}

const idRegex = /^[a-z]{1,4}-[a-zA-Z0-9]{15}$/;
// Leaf literal type, no encoding needed
export const ID = C.fromDecoder(
    pipe(
        D.string,
        D.refine(idRegex.test as (s: string) => s is ID, 'ID'),
    ),
);

export const idPrefixes = {
    BudgetID: 'b-',
    BudgetPeriodID: 'bp-',
    CategoryID: 'c-',
    OffsetTransactionID: 'ot-',
    OneTimeTransactionID: 'ott-',
    PlaceholderTransactionID: 'pt-',
    ReceiptID: 'r-',
    ReceiptAnchorID: 'ra-',
    ReceiptSectionID: 'rs-',
    ReceiptTypeID: 'rk-',
    RecurringTransactionID: 'rt-',
    SubscriptionID: 's-',
    SubscriptionPatternID: 'sp-',
}

function idType<T extends ID>(name: keyof typeof idPrefixes): C.Codec<unknown, T, T> {
    return C.fromDecoder(
        pipe(
            ID,
            D.refine((s): s is T => s.startsWith(idPrefixes[name]), name),
        ),
    );
}

export type BudgetID = ID & BudgetIDBrand;
export interface BudgetIDBrand {
    readonly BudgetID: unique symbol;
}
export type BudgetPeriodID = ID & BudgetPeriodIDBrand;
export interface BudgetPeriodIDBrand {
    readonly BudgetPeriodID: unique symbol;
}
export type CategoryID = ID & CategoryIDBrand;
export interface CategoryIDBrand {
    readonly CategoryID: unique symbol;
}
export type OffsetTransactionID = ID & OffsetTransactionIDBrand;
export interface OffsetTransactionIDBrand {
    readonly OffsetTransactionID: unique symbol;
}
export type OneTimeTransactionID = ID & OneTimeTransactionIDBrand;
export interface OneTimeTransactionIDBrand {
    readonly OneTimeTransactionID: unique symbol;
}
export type PlaceholderTransactionID = ID & PlaceholderTransactionIDBrand;
export interface PlaceholderTransactionIDBrand {
    readonly PlaceholderTransactionID: unique symbol;
}
export type ReceiptID = ID & ReceiptIDBrand;
export interface ReceiptIDBrand {
    readonly ReceiptID: unique symbol;
}
export type ReceiptAnchorID = ID & ReceiptAnchorIDBrand;
export interface ReceiptAnchorIDBrand {
    readonly ReceiptAnchorID: unique symbol;
}
export type ReceiptSectionID = ID & ReceiptSectionIDBrand;
export interface ReceiptSectionIDBrand {
    readonly ReceiptSectionID: unique symbol;
}
export type ReceiptTypeID = ID & ReceiptTypeIDBrand;
export interface ReceiptTypeIDBrand {
    readonly ReceiptTypeID: unique symbol;
}
export type RecurringTransactionID = ID & RecurringTransactionIDBrand;
export interface RecurringTransactionIDBrand {
    readonly RecurringTransactionID: unique symbol;
}
export type SubscriptionID = ID & SubscriptionIDBrand;
export interface SubscriptionIDBrand {
    readonly SubscriptionID: unique symbol;
}
export type SubscriptionPatternID = ID & SubscriptionPatternIDBrand;
export interface SubscriptionPatternIDBrand {
    readonly SubscriptionPatternID: unique symbol;
}

export const BudgetID = idType<BudgetID>('BudgetID');
export const BudgetPeriodID = idType<BudgetPeriodID>('BudgetPeriodID');
export const CategoryID = idType<CategoryID>('CategoryID');
export const OffsetTransactionID = idType<OffsetTransactionID>('OffsetTransactionID');
export const OneTimeTransactionID = idType<OneTimeTransactionID>('OneTimeTransactionID');
export const PlaceholderTransactionID = idType<PlaceholderTransactionID>('PlaceholderTransactionID');
export const ReceiptID = idType<ReceiptID>('ReceiptID');
export const ReceiptAnchorID = idType<ReceiptAnchorID>('ReceiptAnchorID');
export const ReceiptSectionID = idType<ReceiptSectionID>('ReceiptSectionID');
export const ReceiptTypeID = idType<ReceiptTypeID>('ReceiptTypeID');
export const RecurringTransactionID = idType<RecurringTransactionID>('RecurringTransactionID');
export const SubscriptionID = idType<SubscriptionID>('SubscriptionID');
export const SubscriptionPatternID = idType<SubscriptionPatternID>('SubscriptionPatternID');
