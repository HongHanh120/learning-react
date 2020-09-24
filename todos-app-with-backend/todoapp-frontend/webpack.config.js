module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/index.js']
    },

    devServer: {
        contentBase: __dirname,
        port: 7000,
        host: 'localhost'
    },

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                use: ['babel-loader']
            }
        ],
    }

};