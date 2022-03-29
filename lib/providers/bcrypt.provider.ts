import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

import { HASH_PROVIDER_OPTIONS } from '@lib/data/tokens';

import { HashProvider } from '@lib/types/hash-provider';
import { BcryptProviderOptions } from '@lib/types/hash-providers-options';

@Injectable()
export class BcryptProvider implements HashProvider {
  constructor(
    @Inject(HASH_PROVIDER_OPTIONS)
    private readonly options: BcryptProviderOptions,
  ) {
    if (!this.options.rounds && !this.options.salt) {
      throw new Error('not sent rounds or salt in hash options');
    }
    if (this.options.rounds && this.options.salt) {
      throw new Error('sent rounds or salt in hash options');
    }
  }

  hash(plainText: string): Promise<string> {
    if (this.options.salt && !this.options.rounds) {
      return bcrypt.hash(plainText, this.options.salt);
    }
    return bcrypt.hash(plainText, this.options.rounds);
  }

  hashSync(plainText: string): string {
    if (this.options.salt && !this.options.rounds) {
      return bcrypt.hashSync(plainText, this.options.salt);
    }
    return bcrypt.hashSync(plainText, this.options.rounds);
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  compareSync(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
