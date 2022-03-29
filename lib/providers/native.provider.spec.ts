import { createHash } from 'crypto';

import { NativeHashProvider } from './native.provider';

describe('Native Hash Provider', () => {
  let nativeHashProvider: NativeHashProvider;

  beforeAll(() => {
    nativeHashProvider = new NativeHashProvider({ type: 'md5' });
  });

  it('should be able to create a hash with the md5 algorithm synchronously', () => {
    const message = 'hello world';
    const md5Hash = createHash('md5').update(message).digest('hex');

    const testHash = nativeHashProvider.hashSync(message);

    expect(testHash).toEqual(md5Hash);
  });

  it('should be able to create a hash with the md5 algorithm asynchronously', async () => {
    const message = 'hello world';
    const md5Hash = createHash('md5').update(message).digest('hex');

    const testHash = await nativeHashProvider.hash(message);

    expect(testHash).toEqual(md5Hash);
  });

  it('should be able to return true when plain text matches hash using md5 algorithm synchronously', () => {
    const message = 'hello world';
    const md5Hash = createHash('md5').update(message).digest('hex');

    const isMatch = nativeHashProvider.compareSync(message, md5Hash);

    expect(isMatch).toEqual(true);
  });

  it('should be able to return false when plain text not matches hash using md5 algorithm synchronously', () => {
    const message = 'hello world';
    const md5Hash = createHash('md5').update(message).digest('hex');

    const isMatch = nativeHashProvider.compareSync('random message', md5Hash);

    expect(isMatch).toEqual(false);
  });

  it('should be able to return true when plain text matches hash using md5 algorithm asynchronously', async () => {
    const message = 'hello world';
    const md5Hash = createHash('md5').update(message).digest('hex');

    const isMatch = await nativeHashProvider.compare(message, md5Hash);

    expect(isMatch).toEqual(true);
  });

  it('should be able to return false when plain text not matches hash using md5 algorithm asynchronously', async () => {
    const message = 'hello world';
    const md5Hash = createHash('md5').update(message).digest('hex');

    const isMatch = await nativeHashProvider.compare('random message', md5Hash);

    expect(isMatch).toEqual(false);
  });
});
