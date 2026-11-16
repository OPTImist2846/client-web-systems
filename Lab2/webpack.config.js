import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (_env, argv) => {
  const isProduction = argv.mode === 'production';
  const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    entry: './src/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: 'auto',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [styleLoader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/,
          use: [styleLoader, 'css-loader', 'sass-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './public/favicon.svg',
      }),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' })]
        : []),
    ],

    devServer: {
      port: 9000,
      open: true,
      hot: true,
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
    },

    performance: {
      hints: false,
    },
  };
};
