# requestid [![Build Status](https://secure.travis-ci.org/nodules/requestid.png)](http://travis-ci.org/nodules/requestid)

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

### `requestId.createMiddleware()` → `Function<Request, Response, Function>`

Returns the middleware function.

### `requestId.get()` → `String`

Get current request's identifier.

## License

MIT

