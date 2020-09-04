const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true
}).listen(5000, 'localhost', function (err, result) {
    if(err){
        return console.log(err)
    }
    console.log('Listening at http://localhost:5000')
});
