var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var serveStatic = require('serve-static');
// var bodyParser = require('body-parser');
var app = new (require('express'))()

var port = process.env.PORT || 8080

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// parse application/json
// app.use(bodyParser.json());

    // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})




app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
