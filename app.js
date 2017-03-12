var express = require('express'), 
	http = require('http'),
	fs = require('fs');

const WWW_ROOT = __dirname;

var app = global.app = express();
app.set('x-powered-by', false);
// Pretty printing of html
app.locals.pretty = true;

app.use(require('compression')());
app.use(require('serve-static')(WWW_ROOT));

function read(file, msg) {
	return fs.readFileSync(WWW_ROOT+'/'+file+'.html', {encoding:'utf8'}).replace(/%%/g, msg);
}

app.use(function(req, res) {
	res.send(read('404', req.path));
});
app.use(function(err, req, res, next) {
	res.send(read('500', err.stack));
});

var port = process.env.PORT || 8080;
var server = http.createServer(app).listen(port, function(){
	console.log('IAR Web server listening on port', server.address().port);
});
