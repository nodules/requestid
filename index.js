var domain = require('domain'),
    requestId = module.exports;

requestId.createMiddleware = function createRequestIdMiddleware() {
    return function(req, res, next) {
        var reqDomain = domain.create();
        reqDomain.run(function() {
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

requestId.set = function setRequestId(reqId) {
    var activeDomain = domain.active;
    if(activeDomain != null && typeof activeDomain.requestId === 'undefined') {
        activeDomain.requestId = reqId;
    }
    return activeDomain;
};
