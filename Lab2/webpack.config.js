import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {Record<string, unknown>} _env
 * @param {{ mode?: 'development' | 'production' }} argv
 * @returns {import('webpack').Configuration}
 */
export default (_env, argv) => {
  const isProduction = argv.mode === 'production';
  // У dev — інжект стилів у <style> (швидкий HMR), у prod — окремий .css файл
  const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    // Точка входу — збирає весь застосунок
    entry: './src/index.ts',

    // Вихідна директорія та імена бандлів (contenthash — для кешування в браузері)
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: 'auto', // відносні шляхи — працює і на localhost, і на gh-pages
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        // TypeScript → JavaScript
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // Стилі Bootstrap (.css)
        {
          test: /\.css$/,
          use: [styleLoader, 'css-loader'],
        },
        // Власні стилі (.scss) → CSS
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
