const path = require('path');
const webpack = require('webpack');

//console.log(path.join(__dirname,'public'));
const ExtractTextPlugin = require('extract-text-webpack-plugin')


process.env.NODE.ENV = process.env.NODE.ENV || 'developement'
if(process.env.NODE.ENV === 'test'){
  require('dotenv').config({ path: 'env.test' })
} else if (process.env.NODE.ENV === 'developement'){
  require('dotenv').config({ path: 'env.developement' })
}

module.exports = (env) => {
  //if the env == production 
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css')

  // console.log("env",env);
  return {
    entry: ['babel-polyfill','./src/app.js'],
    output: {
      path: path.join(__dirname, 'public','dist'),
      filename: 'bundle.js'
    },
    module: { //run babel when it encounters js files
      rules: [{
        loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },

    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }

};