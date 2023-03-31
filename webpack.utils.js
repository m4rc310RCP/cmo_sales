const path = require('path');
const Dotenv = require('dotenv-webpack');

const build = (origin, dest) => {
    return({
        mode: 'development',
        //entry: './src/react/splash/renderer.js',
        entry: {origin},
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
        filename: {dest},
        // path: path.resolve(__dirname, 'build', 'js'),
        path: dest,
        },
    });
}
module.exports = {
    build:build
}