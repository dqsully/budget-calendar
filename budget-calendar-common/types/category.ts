import * as C from 'io-ts/Codec';

import { CategoryID } from './ids';
import { Name } from './common';
import { LiteCodec } from './_lib';

export interface Category {
    id: CategoryID;

    name: Name;
}

export const Category: LiteCodec<Category> = C.struct({
    id: CategoryID,

    name: Name,
});
