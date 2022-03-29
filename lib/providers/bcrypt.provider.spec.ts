import * as bcrypt from 'bcrypt';

import { BcryptProviderOptions } from '@lib/types/hash-providers-options';
import { BcryptProvider } from '@lib/providers/bcrypt.provider';

describe('Bcrypt Hash Provider', () => {
  let bcryptProvider: BcryptProvider;

  it('should be able return an error when not sent rounds and salt', () => {
    expect(() => {
      new BcryptProvider({} as BcryptProviderOptions);
    }).toThrowError('not sent rounds or salt in hash options');
  });

  it('should be able return an error when sent rounds and salt', () => {
    expect(() => {
      new BcryptProvider({
        type: 'bcrypt',
        rounds: 1,
        salt: bcrypt.genSaltSync(),
      });
    }).toThrowError('sent rounds or salt in hash options');
  });

  it('should be able return bcrypt hash with salt the synchronously', () => {
    const message = 'hello world';
    bcryptProvider = new BcryptProvider({
      type: 'bcrypt',
      salt: bcrypt.genSaltSync(),
    });

    const hash = bcryptProvider.hashSync(message);

    expect(bcrypt.compareSync(message, hash)).toEqual(true);
  });

  it('should be able return bcrypt hash with salt the asynchronously', async () => {
    const message = 'hello world';
    bcryptProvider = new BcryptProvider({
      type: 'bcrypt',
      salt: bcrypt.genSaltSync(),
    });

    const hash = bcryptProvider.hashSync(message);

    expect(bcrypt.compareSync(message, hash)).toEqual(true);
  });

  it('should be able to return true when plain text matches hash the synchronously', () => {
    const message = 'hello world';
    bcryptProvider = new BcryptProvider({ type: 'bcrypt', rounds: 2 });

    const hash = bcryptProvider.hashSync(message);

    expect(bcrypt.compareSync(message, hash)).toEqual(true);
  });

  it('should be able to return true when plain text matches hash the asynchronously', async () => {
    const message = 'hello world';
    bcryptProvider = new BcryptProvider({ type: 'bcrypt', rounds: 2 });

    const hash = await bcryptProvider.hash(message);

    expect(bcrypt.compareSync(message, hash)).toEqual(true);
  });

  it('should be able to return false when plain text not matches hash the synchronously', () => {
    const message = 'hello world';
    bcryptProvider = new BcryptProvider({ type: 'bcrypt', rounds: 2 });

    const hash = bcryptProvider.hashSync(message);

    expect(bcrypt.compareSync('random message', hash)).toEqual(false);
  });

  it('should be able to return false when plain text not matches hash the asynchronously', async () => {
    const message = 'hello world';
    bcryptProvider = new BcryptProvider({ type: 'bcrypt', rounds: 2 });

    const hash = await bcryptProvider.hash(message);

    expect(bcrypt.compareSync('random message', hash)).toEqual(false);
  });
});
