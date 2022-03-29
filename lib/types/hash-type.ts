export type NativeHashType =
  | 'md4'
  | 'md5'
  | 'sha1'
  | 'sha224'
  | 'sha256'
  | 'sha384'
  | 'sha512'
  | 'sha3'
  | 'sha3-224'
  | 'sha3-256'
  | 'sha3-384'
  | 'sha3-512'
  | 'shake128'
  | 'shake256'
  | 'whirlpool';

export type ExternalHashType = 'bcrypt' | 'argon2';

export type HashType = NativeHashType | ExternalHashType;
