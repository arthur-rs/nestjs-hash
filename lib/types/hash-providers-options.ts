import { HashType } from '@lib/types/hash-type';

export interface BcryptProviderOptions {
  type: 'bcrypt';
  salt?: string;
  rounds?: number;
}

export interface Argon2ProviderOptions {
  type: 'argon2';
  salt?: string;
  rounds?: number;
  memory?: number;
  parallelism?: number;
  hashLength?: number;
}

export interface GenericProviderOptions {
  type: HashType;
}
