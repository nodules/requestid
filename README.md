requestid [![NPM version][npm-image]][npm-link] [![Build status][build-image]][build-link]
=========

[![devDependency status][devdeps-image]][devdeps-link]

Allows to get current request identifier passed from the front-end server, e.g. nginx or heroku. One of the module's
usecase is to pass the id with application API requests.

## Usage

~~~js
var connect = require('connect'),
    requestId = require('requestid'),
    ask = require('asker'),
    app = connect();

app.use(requestId.createMiddleware());  // set up the middleware
···
app.use(function(req, res, next) {
    ask({
        host : 'example.com',
        headers : {
            'x-request-id' : requestId.get();    // get this request's Id and pass it to the api request
        }
    },
    next);
});
~~~

## API

`requestId.createMiddleware()` → `Function<Request, Response, Function>`

Returns the middleware function.

`requestId.get()` → `String`

Get current request's identifier.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/requestid.svg?style=flat
[npm-link]: https://npmjs.org/package/requestid
[build-image]: https://img.shields.io/travis/nodules/requestid.svg?style=flat
[build-link]: https://travis-ci.org/nodules/requestid
[devdeps-image]: https://img.shields.io/david/dev/nodules/requestid.svg?style=flat
[devdeps-link]: https://david-dm.org/nodules/requestid#info=peerDependencies
