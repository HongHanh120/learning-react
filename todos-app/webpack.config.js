module.exports = {
    mode: 'development',
    entry:{
        app:['./src/index.js']
    },
    output: {
        filename: "bundle.js",
        path:__dirname+"/dist",
        publicPath: "/"
    },
    module:{
        rules: [
            {
                test:/\.(js|jsx)$/,
                use :['babel-loader']
            },]
    }
};
