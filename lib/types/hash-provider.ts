export interface HashProvider {
  hash(plainText: string): Promise<string>;
  hashSync(plainText: string): string;
  compare(plainText: string, hash: string): Promise<boolean>;
  compareSync(plainText: string, hash: string): boolean;
}
