import { Inject, Injectable } from '@nestjs/common';
import { HASH_PROVIDER } from '@lib/data/tokens';
import { HashProvider } from '@lib/types/hash-provider';

@Injectable()
export class HashService implements HashProvider {
  constructor(
    @Inject(HASH_PROVIDER)
    private readonly hashProvider: HashProvider,
  ) {}

  hash(plainText: string): Promise<string> {
    return this.hashProvider.hash(plainText);
  }

  hashSync(plainText: string): string {
    return this.hashProvider.hashSync(plainText);
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return this.hashProvider.compare(plainText, hash);
  }

  compareSync(plainText: string, hash: string): boolean {
    return this.hashProvider.compareSync(plainText, hash);
  }
}
