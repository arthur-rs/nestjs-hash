export enum NativeHashType {
  MD4 = 'md4',
  MD5 = 'md5',

  SHA1 = 'sha1',

  SHA224 = 'sha224',
  SHA256 = 'sha256',
  SHA384 = 'sha384',
  SHA512 = 'sha512',

  SHA3 = 'sha3',
  SHA3_224 = 'sha3-224',
  SHA3_256 = 'sha3-256',
  SHA3_384 = 'sha3-384',
  SHA3_512 = 'sha3-512',

  SHAKE128 = 'shake128',
  SHAKE256 = 'shake256',

  WHIRLPOOL = 'whirlpool',
}

export enum ExternalHashType {
  BCRYPT = 'bcrypt',
  ARGO2 = 'argon2',
  PBKDF2 = 'pbkdf2',
}

export type HashType = NativeHashType | ExternalHashType;

export interface BcryptProviderOptions {
  salt: string;
  rounds: number;
}

export interface Argon2ProviderOptions {
  salt: string;
  rounds: number;
  memory: number;
  parallelism: number;
  hashLength: number;
}

export interface Pbkdf2ProviderOptions {
  salt: string;
  rounds: number;
  hashLength: number;
}

export interface HashProvider {
  hash(plainText: string): Promise<string>;
  hashSync(plainText: string): string;
  compare(plainText: string, hash: string): Promise<boolean>;
  compareSync(plainText: string, hash: string): boolean;
}
