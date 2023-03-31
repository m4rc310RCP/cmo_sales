const path = require('path');
const Dotenv = require('dotenv-webpack');
const {build} = require('./webpack.utils');

//------------------ Splash Window ------------------//
const splash_window_ = {
  mode: 'development',
  entry: './src/react/splash/renderer.js',
  // TODO: Explain Source Map
  devtool: 'inline-source-map',
  target: ['electron-renderer'],
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'splash.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};

//------------------ Main App ------------------//
const main_app_ =  {
  mode: 'development',
  entry: './src/react/main/index.js',
  // TODO: Explain Source Map
  devtool: 'inline-source-map',
  target: ['electron-renderer'],
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};

//------------------ Dialog Login ------------------//
const dialog_login_ =  {
  mode: 'development',
  entry: './src/react/login/index.js',
  // TODO: Explain Source Map
  devtool: 'inline-source-map',
  target: ['electron-renderer'],
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'login.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};

console.log('Webpack...')

const smain = build('./src/react/main/index.js', '/Users/mlsilva/Workspaces/CMO/cmo_sales/build/js/app.js');

console.log(smain)

//const main_app      = build('./src/react/main/index.js',      'app.js');
//const splash_window = build('./src/react/splash/renderer.js', 'splash.js');
//const dialog_login  = build('./src/react/login/index.js',     'login.js');

module.exports = smain

//module.exports = [main_app, splash_window, dialog_login];