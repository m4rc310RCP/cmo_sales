const { app, BrowserWindow } = require('electron');
const path = require('path');

// outras configurações do Electron...

const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const compiler = webpack(webpackConfig);

// Configuração do HTML Webpack Plugin
const htmlWebpackPluginConfig = {
  title: 'Minha Página',
  template: 'src/index.html', // ou a string de template que você quer usar
};


