import {
  HashType,
  Argon2ProviderOptions,
  BcryptProviderOptions,
  Pbkdf2ProviderOptions,
} from './provider';

export interface HashModuleOptions {
  hash: HashType;
  options?:
    | BcryptProviderOptions
    | Argon2ProviderOptions
    | Pbkdf2ProviderOptions;
}
