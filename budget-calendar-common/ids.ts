import * as ids from './types/ids';

const idChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
function newIDFragment(): string {
    let out = '';

    for (let i = 0; i < 15; i++) {
        out += idChars[Math.floor(Math.random() * idChars.length)];
    }

    return out;
}

function idGenerator<T extends ids.ID>(name: keyof typeof ids.idPrefixes) {
    return () => (ids.idPrefixes[name] + newIDFragment()) as T
}

export const newBudgetID = idGenerator<ids.BudgetID>('BudgetID');
export const newBudgetPeriodID = idGenerator<ids.BudgetPeriodID>('BudgetPeriodID');
export const newCategoryID = idGenerator<ids.CategoryID>('CategoryID');
export const newOffsetTransactionID = idGenerator<ids.OffsetTransactionID>('OffsetTransactionID');
export const newOneTimeTransactionID = idGenerator<ids.OneTimeTransactionID>('OneTimeTransactionID');
export const newPlaceholderTransactionID = idGenerator<ids.PlaceholderTransactionID>('PlaceholderTransactionID');
export const newReceiptID = idGenerator<ids.ReceiptID>('ReceiptID');
export const newReceiptAnchorID = idGenerator<ids.ReceiptAnchorID>('ReceiptAnchorID');
export const newReceiptSectionID = idGenerator<ids.ReceiptSectionID>('ReceiptSectionID');
export const newReceiptTypeID = idGenerator<ids.ReceiptTypeID>('ReceiptTypeID');
export const newRecurringTransactionID = idGenerator<ids.RecurringTransactionID>('RecurringTransactionID');
export const newSubscriptionID = idGenerator<ids.SubscriptionID>('SubscriptionID');
export const newSubscriptionPatternID = idGenerator<ids.SubscriptionPatternID>('SubscriptionPatternID');
