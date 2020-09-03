module.exports={
    mode:'development',
    entry: {
        app:['./src/main.js']
    },
    devServer: {
        contentBase:__dirname,
        port:8080,
        host:'localhost',
    },
    output: {
        filename:"bundle.js",
        path:__dirname+"/npdist"
    },
    module: {
        rules:[
            {
                test:/\.(js|jsx)$/,
                use: ['babel-loader']
            },
        ]
    }
};