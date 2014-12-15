var http = require('http'),
    connect = require('connect'),
    requestId = require('../'),
    app = connect();

app
    .use(requestId.createMiddleware())
    .use(function(req, res, next) {
        var reqId = requestId.get();
        res.end('Request ID: ' + reqId);
        next();
    });

http.createServer(app).listen(process.env.npm_package_config_port);
