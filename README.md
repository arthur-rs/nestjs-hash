<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Hashing library for NestJS.

## Installation

```bash
$ npm install nestjs-hash
```
or
```bash
$ yarn add nestjs-hash
```
## Hou to use

### 1 - first add hash module in import for your module

Using with native hash

```ts
  import { HashModule } from 'nestjs-hash';

  @Module({
    imports: [HashModule.forRoot({ type: 'sha256' })],
  })
  export default UsersModule;
```
or external library hash

```ts
  import { HashModule } from 'nestjs-hash';

  @Module({
    imports: [HashModule.forRoot({ type: 'bcrypt', rounds: 16 })],
  })
  export default UsersModule;
```

**Attention** to use bcrypt or more libraries you need to add them as dependencies to your project.

- bcrypt  
```bash
$ npm install bcrypt
```
- argon2
```bash
$ npm install argon2
```

2 - second uses dependency injection to add the hash service to your service
```ts
  @Injectable()
  export class UsersService() {
    constructor(
      private readonly hashService: HashService,
      private readonly usersRepository: UsersRepository
    ) {}

    public async createUser(data) {
      data.password = await this.hashService.hash(data.password);
      this.usersRepository.create(data);
    }
  };
```

## Author

Created with more love by [Arthur Reis](https://github.com/arthur-rs)

## License

[MIT licensed](LICENSE).
