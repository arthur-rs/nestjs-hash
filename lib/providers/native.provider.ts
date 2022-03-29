import { createHash, Hash } from 'crypto';
import { HashProvider, NativeHashType } from '../interfaces/provider';

export class NativeHashProvider implements HashProvider {
  private readonly digest: Hash;

  constructor(hashType: NativeHashType) {
    this.digest = createHash(hashType);
  }

  hash(plainText: string): Promise<string> {
    this.digest.update(plainText);
    return Promise.resolve(this.digest.digest('hex'));
  }

  hashSync(plainText: string): string {
    this.digest.update(plainText);
    return this.digest.digest('hex');
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    const hashedValue = this.hashSync(plainText);
    return Promise.resolve(hashedValue === hash);
  }

  compareSync(plainText: string, hash: string): boolean {
    const hashedValue = this.hashSync(plainText);
    return hashedValue === hash;
  }
}
