import { DynamicModule } from '@nestjs/common';

import { HASH_PROVIDER_OPTIONS, HASH_PROVIDER } from '@lib/data/tokens';

import { HashType } from '@lib/types/hash-type';
import { HashModuleOptions } from '@lib/types/hash-module-options';

import { HashService } from '@lib/hash.service';

import { NativeHashProvider } from '@lib/providers/native.provider';
import { BcryptProvider } from '@lib/providers/bcrypt.provider';

export class HashModule {
  public static forRoot(options: HashModuleOptions): DynamicModule {
    if (!options.type) throw new Error('Hash type is required');
    const HashProvider = HashModule.getHashProviderByType(options.type);

    return {
      module: HashModule,
      providers: [
        { provide: HASH_PROVIDER_OPTIONS, useValue: { ...options } },
        { provide: HASH_PROVIDER, useClass: HashProvider },
        HashService,
      ],
      exports: [HashService],
    };
  }

  private static getHashProviderByType(hashType: HashType) {
    if (hashType === 'bcrypt') return BcryptProvider;
    return NativeHashProvider;
  }
}
