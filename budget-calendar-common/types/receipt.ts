import * as C from 'io-ts/Codec';
import { pipe } from 'fp-ts/function';

import { DollarAmount, Name, RegExpFromObject } from "./common";
import { ReceiptID, ReceiptAnchorID, ReceiptSectionID, ReceiptTypeID } from "./ids";
import { LiteCodec } from './_lib';

export interface Receipt {
    id: ReceiptID;

    items: ReceiptItem[];
    subtotal: DollarAmount;
    discounts: ReceiptDiscount[];
    taxes: ReceiptTax[];
    total: DollarAmount;
}

export interface ReceiptItem {
    name: Name;
    amount: DollarAmount;
    // TODO: make ItemTags refined string type
    flags: string;
    discounts: ReceiptDiscount[];
}

export interface ReceiptTax {
    name: Name;
    amount: DollarAmount;
}

export interface ReceiptDiscount {
    name: Name;
    amount: DollarAmount;
}

// TODO: finish this when the parsing types are finished, essentially an AST
// for the receipt
// export interface ReceiptAST {
//     id: ReceiptID;
//     // TODO: replace with ImagePath type
//     image: string;
// }

export interface ReceiptType {
    id: ReceiptTypeID;

    taxNames: Name[];
    taxFlagMap: Record<Name, Name[]>;
}

export interface ReceiptMatchCriteria {
    anchor: ReceiptAnchor;
    required: boolean;
    // TODO: force between 0 and 1
    threshold: number;
    /**
     * If weight is negative, exclude it from the computation for total possible
     * points.
     */
    weight: number;
}

interface ReceiptAnchor_Base {
    id: ReceiptAnchorID;
}

export interface ReceiptAnchor_Image extends ReceiptAnchor_Base {
    type: 'image';

    // TODO: replace with ImagePath type
    image: string;
    // TODO: other image settings?
}
export interface ReceiptAnchor_Text extends ReceiptAnchor_Base {
    type: 'text';

    pattern: RegExp;
    // TODO: other settings?
}

export type ReceiptAnchor =
    | ReceiptAnchor_Image
    | ReceiptAnchor_Text;

export interface ReceiptSection {
    id: ReceiptSectionID;

    // TODO: fill this out with boundaries, parsers, etc.
}

export interface ReceiptTag_Total {
    type: 'total';
}
export interface ReceiptTag_Subtotal {
    type: 'subtotal';
}
export interface ReceiptTag_TaxName {
    type: 'tax.name';
    taxSection: ReceiptSectionID;
}
export interface ReceiptTag_TaxAmount {
    type: 'tax.amount';
    taxSection: ReceiptSectionID;
}
export interface ReceiptTag_DiscountName {
    type: 'discount.name';
    discountSection: ReceiptSectionID;
}
export interface ReceiptTag_DiscountAmount {
    type: 'discount.amount';
    discountSection: ReceiptSectionID;
}
export interface ReceiptTag_ItemName {
    type: 'item.name';
    itemSection: ReceiptSectionID;
}
export interface ReceiptTag_ItemAmount {
    type: 'item.amount';
    itemSection: ReceiptSectionID;
}
export interface ReceiptTag_ItemFlags {
    type: 'item.flags';
    itemSection: ReceiptSectionID;
}
export interface ReceiptTag_ItemDiscountName {
    type: 'item.discount.name';
    itemSection: ReceiptSectionID;
    discountSection: ReceiptSectionID;
}
export interface ReceiptTag_ItemDiscountAmount {
    type: 'item.discount.amount';
    itemSection: ReceiptSectionID;
    discountSection: ReceiptSectionID;
}

export type ReceiptTag =
    | ReceiptTag_Total
    | ReceiptTag_Subtotal
    | ReceiptTag_TaxName
    | ReceiptTag_TaxAmount
    | ReceiptTag_DiscountName
    | ReceiptTag_DiscountAmount
    | ReceiptTag_ItemName
    | ReceiptTag_ItemAmount
    | ReceiptTag_ItemFlags
    | ReceiptTag_ItemDiscountName
    | ReceiptTag_ItemDiscountAmount;

export const ReceiptTag_Total: LiteCodec<ReceiptTag_Total> = C.struct({
    type: C.literal('total'),
});
export const ReceiptTag_Subtotal: LiteCodec<ReceiptTag_Subtotal> = C.struct({
    type: C.literal('subtotal'),
});
export const ReceiptTag_TaxName: LiteCodec<ReceiptTag_TaxName> = C.struct({
    type: C.literal('tax.name'),
    taxSection: ReceiptSectionID,
});
export const ReceiptTag_TaxAmount: LiteCodec<ReceiptTag_TaxAmount> = C.struct({
    type: C.literal('tax.amount'),
    taxSection: ReceiptSectionID,
});
export const ReceiptTag_DiscountName: LiteCodec<ReceiptTag_DiscountName> = C.struct({
    type: C.literal('discount.name'),
    discountSection: ReceiptSectionID,
});
export const ReceiptTag_DiscountAmount: LiteCodec<ReceiptTag_DiscountAmount> = C.struct({
    type: C.literal('discount.amount'),
    discountSection: ReceiptSectionID,
});
export const ReceiptTag_ItemName: LiteCodec<ReceiptTag_ItemName> = C.struct({
    type: C.literal('item.name'),
    itemSection: ReceiptSectionID,
});
export const ReceiptTag_ItemAmount: LiteCodec<ReceiptTag_ItemAmount> = C.struct({
    type: C.literal('item.amount'),
    itemSection: ReceiptSectionID,
});
export const ReceiptTag_ItemFlags: LiteCodec<ReceiptTag_ItemFlags> = C.struct({
    type: C.literal('item.flags'),
    itemSection: ReceiptSectionID,
});
export const ReceiptTag_ItemDiscountName: LiteCodec<ReceiptTag_ItemDiscountName> = C.struct({
    type: C.literal('item.discount.name'),
    itemSection: ReceiptSectionID,
    discountSection: ReceiptSectionID,
});
export const ReceiptTag_ItemDiscountAmount: LiteCodec<ReceiptTag_ItemDiscountAmount> = C.struct({
    type: C.literal('item.discount.amount'),
    itemSection: ReceiptSectionID,
    discountSection: ReceiptSectionID,
});

export const ReceiptTag: LiteCodec<ReceiptTag> = pipe(
    {
        'total': ReceiptTag_Total,
        'subtotal': ReceiptTag_Subtotal,
        'tax.name': ReceiptTag_TaxName,
        'tax.amount': ReceiptTag_TaxAmount,
        'discount.name': ReceiptTag_DiscountName,
        'discount.amount': ReceiptTag_DiscountAmount,
        'item.name': ReceiptTag_ItemName,
        'item.amount': ReceiptTag_ItemAmount,
        'item.flags': ReceiptTag_ItemFlags,
        'item.discount.name': ReceiptTag_ItemDiscountName,
        'item.discount.amount': ReceiptTag_ItemDiscountAmount,
    },
    C.sum('type'),
);

export const ReceiptSection = C.struct({
    id: ReceiptSectionID,
});

const ReceiptAnchor_Base = C.struct({
    id: ReceiptAnchorID,
});

export const ReceiptAnchor_Image: LiteCodec<ReceiptAnchor_Image> = pipe(
    ReceiptAnchor_Base,
    C.intersect(
        C.struct({
            type: C.literal('image'),
            image: C.string,
        }),
    ),
);
export const ReceiptAnchor_Text: LiteCodec<ReceiptAnchor_Text> = pipe(
    ReceiptAnchor_Base,
    C.intersect(
        C.struct({
            type: C.literal('text'),
            pattern: RegExpFromObject,
        }),
    ),
);

export const ReceiptAnchor: LiteCodec<ReceiptAnchor> = pipe(
    {
        image: ReceiptAnchor_Image,
        text: ReceiptAnchor_Text,
    },
    C.sum('type'),
);

export const ReceiptMatchCriteria: LiteCodec<ReceiptMatchCriteria> = C.struct({
    anchor: ReceiptAnchor,
    required: C.boolean,
    threshold: C.number,
    weight: C.number,
});

export const ReceiptType: LiteCodec<ReceiptType> = C.struct({
    id: ReceiptTypeID,
    taxNames: C.array(Name),
    // TODO: compose to enforce record key types?
    taxFlagMap: C.record(C.array(Name)),
});

export const ReceiptDiscount: LiteCodec<ReceiptDiscount> = C.struct({
    name: Name,
    amount: DollarAmount,
});

export const ReceiptTax: LiteCodec<ReceiptTax> = C.struct({
    name: Name,
    amount: DollarAmount,
});

export const ReceiptItem: LiteCodec<ReceiptItem> = C.struct({
    name: Name,
    amount: DollarAmount,
    flags: C.string,
    discounts: C.array(ReceiptDiscount),
});

export const Receipt: LiteCodec<Receipt> = C.struct({
    id: ReceiptID,

    items: C.array(ReceiptItem),
    subtotal: DollarAmount,
    discounts: C.array(ReceiptDiscount),
    taxes: C.array(ReceiptTax),
    total: DollarAmount,
});
