# CardSet

a [Sails](http://sailsjs.org) application


## Run Front-end

Project requires:

* [npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
* [node](https://nodejs.org/uk/download/package-manager/) - >4.0

### Node Instalation

Check if installed Node.

```sh
$ node -v
```
 - If you will get different answer from this: "v...", node needs to be installed.

```sh
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
$ source ~/.profile
$ nvm ls-remote
$ nvm install v4.4.5
$ nvm use v4.4.5
```

### NodeJS Instalation

Check if installed Node.

```sh
$ nodejs -v
```
 - If you will get different answer from this: "v...", nodejs needs to be installed.

```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo apt-get purge nodejs npm
```

### Global dependencies instalation


```sh
$ npm install --global gulp-cli
$ npm i bower -g
```

### Install local dependencies and run application

```sh
$ npm run-script run-app
```

## Run back-end

```sh
 npm install grunt -g
 npm install sails -g
 npm install sails-disk --save
```

```sh
 sails lift
```
