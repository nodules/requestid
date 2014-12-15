var assert = require('assert'),
    http = require('http'),
    request = require('supertest'),
    requestId = require('./');

describe('request-id', function() {
    describe('createMiddleware()', function() {
        it('should return middleware function', function() {
            var middleware = requestId.createMiddleware();
            assert.equal(typeof middleware, 'function');
        });
    });

    describe('get()', function() {
        var server;

        before(function() {
            var requestIdMiddleware = requestId.createMiddleware(),
                asyncMiddleware = function(req, res, next) {
                    setTimeout(function() { // NOTE: emulate some asynchronous middleware chain
                        process.nextTick(next)
                    }, 10);
                };

            server = http.createServer(function(req, res) {
                requestIdMiddleware(req, res, function() {
                    asyncMiddleware(req, res, function() {
                        res.end(requestId.get());
                    })
                });
            });
        });

        var reqIdPrefix = '123x123-',
            requestsMax = 3;

        it('should return nothing if no request-id set', function(done) {
            request(server)
                .get('/')
                .expect('', done);
        });

        Array.apply(null, { length : requestsMax }).forEach(function(_, i) {
            it('should return request-id for current request (' + i + ')', function(done) {
                var newId = reqIdPrefix + i;
                request(server)
                    .get('/')
                    .set('X-Request-Id', newId)
                    .expect(newId, done);
            });
        });
    });
});
