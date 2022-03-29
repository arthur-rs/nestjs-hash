import { ModuleMetadata } from '@nestjs/common';
import { HashModuleOptions } from './interfaces/module';
import { NativeHashProvider } from './interfaces/provider';

export class HashModule {
  forFeature(options: HashModuleOptions): ModuleMetadata {
    const isNative = options.hash in NativeHashProvider;
    const hashProvider = isNative ? NativeHashProvider[options.hash] : null;

    return {
      providers: [hashProvider],
    };
  }
}
