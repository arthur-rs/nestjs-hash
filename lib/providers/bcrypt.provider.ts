import type Bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

import { HASH_PROVIDER_OPTIONS } from '@lib/data/tokens';

import { HashProvider } from '@lib/types/hash-provider';
import { BcryptProviderOptions } from '@lib/types/hash-providers-options';

@Injectable()
export class BcryptProvider implements HashProvider {
  bcrypt: typeof Bcrypt;

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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcrypt');
    if (!bcrypt) {
      throw new Error(
        'bcrypt not found. please install bcrypt with command: $ npm i bcrypt',
      );
    }
    this.bcrypt = bcrypt;
  }

  hash(plainText: string): Promise<string> {
    if (this.options.salt && !this.options.rounds) {
      return this.bcrypt.hash(plainText, this.options.salt);
    }
    return this.bcrypt.hash(plainText, this.options.rounds);
  }

  hashSync(plainText: string): string {
    if (this.options.salt && !this.options.rounds) {
      return this.bcrypt.hashSync(plainText, this.options.salt);
    }
    return this.bcrypt.hashSync(plainText, this.options.rounds);
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(plainText, hash);
  }

  compareSync(plainText: string, hash: string): boolean {
    return this.bcrypt.compareSync(plainText, hash);
  }
}
