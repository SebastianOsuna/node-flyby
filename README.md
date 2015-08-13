FlyBy
===

Monitor your web server resources.

Compatible with Restify and Express.

# Usage

### Mounting

```node
var express = require('express');
var flyby = require('flyby');

var app = express();

// Mount FlyBy
flyby.mount(app, null, { path: '/_private/monitor', cacheLimit: 10 });
```

### Query

Each time you make a request a new entry is added.

```
# GET /_private/monitor

[{"time":"2015-08-13T20:39:46.013Z","memory":"{ rss: 99155968, heapTotal: 76177408, heapUsed: 44176576 }"},
{"time":"2015-08-13T20:39:48.049Z","memory":"{ rss: 99381248, heapTotal: 76177408, heapUsed: 44898208 }"},
{"time":"2015-08-13T20:39:49.628Z","memory":"{ rss: 99397632, heapTotal: 76177408, heapUsed: 45217136 }"},
{"time":"2015-08-13T20:39:50.863Z","memory":"{ rss: 99426304, heapTotal: 76177408, heapUsed: 45542464 }"},
{"time":"2015-08-13T20:39:51.953Z","memory":"{ rss: 99454976, heapTotal: 76177408, heapUsed: 45878144 }"}]
```
