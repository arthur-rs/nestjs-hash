import { HashType } from '@lib/types/hash-type';
import {
  Argon2ProviderOptions,
  BcryptProviderOptions,
} from '@lib/types/hash-providers-options';

export type HashModuleOptions =
  | Argon2ProviderOptions
  | BcryptProviderOptions
  | { type: HashType };
