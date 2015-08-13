// Imports
var moment = require('moment'),
    util = require('util')
    ;

// Default options
var OPTIONS = {
      path: '/_flyby',
      cacheLimit: 5
    }
    ;

/**
 * @api public
 * Mounts FlyBy into the the web server into a public path. FlyBy mounts itself
 * in a GET route.
 * @param {app} The web server application. The API of {app} must have an #GET
 * method to allow FlyBy to mount.
 * @param {authenticator} Application authenticator. It is used to add an exception
 * rule so FlyBy is exposed as a public endpoint. If null is passed, FlyBy will
 * require the default authentication rules.
 * @param {options.path} Path where FlyBy will be mounted. The default path is
 * '/_flyby'.
 * @param {options.cacheLimit} Maximum number of entries to store. The default
 * value is 5.
 */
module.exports.mount = function (app, authenticator, options) {
  var cache = [],
      path = (options && options.path) || OPTIONS.path,
      limit = (options && options.cacheLimit) || OPTIONS.cacheLimit
      ;

  var clearCache = function () {
    if (cache.length > limit) {
      cache = cache.filter(function (o, index) {
        return index >= cache.length - limit;
      });
    }
  };

  app.get(path, function (req, res) {
    var snapshot = util.inspect(process.memoryUsage())
    var now = moment();
    cache.push({ time: now, memory: snapshot });
    clearCache();
    res.respond(cache);
  });

  if (authenticator) {
    authenticator.addException(path);
  }
};
