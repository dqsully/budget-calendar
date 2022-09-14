import * as C from 'io-ts/Codec';

export type LiteCodec<A> = C.Codec<unknown, unknown, A>;
