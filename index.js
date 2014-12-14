var domain = require('domain'),
    d = domain.create(),
    requestId = module.exports;

requestId.createMiddleware = function createRequestIdMiddleware() {
    return function(req, res, next) {
        d.run(function() {
            requestId.set(req.headers['x-request-id']);
            next();
        });
    }
};

requestId.get = function getRequestId() {
    var activeDomain = domain.active;
    if(activeDomain != null) {
        return activeDomain.requestId;
    }
};

requestId.set = function setRequestId(id) {
    var activeDomain = domain.active;
    if(activeDomain != null && typeof activeDomain.requestId === 'undefined') {
        activeDomain.requestId = id;
    }
    return activeDomain;
};
