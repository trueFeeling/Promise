const uglify = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
module.exports = {    
    entry: './src/index.js',    
    output: {    
        path: __dirname,    
        filename: '../dist/promise.js',
        libraryTarget : 'umd' 
    },  
    module: {    
        loaders: [{    
            test: /\.js$/,    
            exclude: /node_modules/,    
            loader: 'babel-loader'    
        }]    
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': '"production"'
        })
    ] 
};

if (process.env.NODE_ENV === 'production') {
    module.exports = merge(module.exports, {
      output: {
        filename: '../dist/promise.min.js'
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {  
            warnings: false,  
            drop_debugger: true,  
            drop_console: true  
          },  
          sourceMap: true
        })
      ]
    })
  }
