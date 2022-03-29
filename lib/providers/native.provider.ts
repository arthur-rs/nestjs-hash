import { createHash } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';

import { HASH_PROVIDER_OPTIONS } from '@lib/data/tokens';

import { HashProvider } from '@lib/types/hash-provider';
import { GenericProviderOptions } from '@lib/types/hash-providers-options';

@Injectable()
export class NativeHashProvider implements HashProvider {
  constructor(
    @Inject(HASH_PROVIDER_OPTIONS)
    private readonly options: GenericProviderOptions,
  ) {
    if (!this.options.type) {
      throw new Error('Hash type not sent in native hash provider.');
    }
  }

  hash(plainText: string): Promise<string> {
    const hashValue = createHash(this.options.type)
      .update(plainText)
      .digest('hex');
    return Promise.resolve(hashValue);
  }

  hashSync(plainText: string): string {
    return createHash(this.options.type).update(plainText).digest('hex');
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    const valueHashed = this.hashSync(plainText);
    return Promise.resolve(valueHashed === hash);
  }

  compareSync(plainText: string, hash: string): boolean {
    const valueHashed = this.hashSync(plainText);
    return valueHashed === hash;
  }
}
