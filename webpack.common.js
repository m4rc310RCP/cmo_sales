const path = require('path');
const Dotenv = require('dotenv-webpack');
const {build} = require('./webpack.utils');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => {
  const configs = getEntryConfigs(env);

  return configs.map(config => {
    return{
      mode: 'development',
      entry: `${config.entry}` ,
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
      plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
          template: './src/template.html', 
          filename: `index.html`,
        }),
      ],
      resolve: {
        extensions: ['.js'],
      },
      output: {
        filename: `index.js`,
        path: path.resolve(__dirname, 'build', 'js', config.output),
      },
    }
  });
};

const getEntryConfigs = () => {
  const configs = [];
  //configs.push({entry:'./src/react/main/index.js',      output:'app'});
  configs.push({entry:'./src/react/windows/app/index.js', output:'app'});
  configs.push({entry:'./src/react/login/index.js',       output:'login'});
  configs.push({entry:'./src/react/splash/renderer.js',   output:'splash'});
  return configs;
}
