<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/schematics.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/schematics.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/schematics.svg" alt="NPM Downloads" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

## Installation

```bash
$ npm install -D @4itech/schematics
```

## Usage

1. comment out settings.json

   ```json
   "editor.formatOnSave": true,
   "editor.codeActionsOnSave": {
     "source.fixAll": "explicit",
     "source.fixAll.eslint": "explicit",
     "source.organizeImports": "explicit",
     "source.sortMembers": "explicit"
   },
   ```

2. Search (with Match Case & include files)

   - replace domain-01 to <%= singular(name) %>
   - replace Domain01 to <%= classify(singular(name)) %>
   - replace domain01 to <%= lowercased(singular(name)) %>

2. Loader: Search (with Match Case & include files)

   - replace domain-02s-by-domain-01-id to <%= name %>
   - replace Domain02sByDomain01Id to <%= classify(name) %>
   - replace domain-02 to <%= singular(entities) %>
   - replace Domain02 to <%= classify(singular(entities)) %>
   - replace domain02 to <%= lowercased(singular(entities)) %>
   - replace domain01Id to <%= lowercased(by) %>
