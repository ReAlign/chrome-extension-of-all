const webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  env = require('./utils/env'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PageConfig = require('./src/pages/Newtab/pages.config');

const ejsData = PageConfig.pages.reduce(
  (prev, item, idx) => {
    prev.pages += `<li class="${idx === 0 ? 'current' : ''}"><div class="cls-content"><div id="j-page-${item.id}" class="cls-page-item"></div></div></li>`;
    prev.navs += `<a class="gooey-menu-item" style="width: 80px; height: 80px; color: white; background-color: rgb(104, 208, 153); line-height: 80px; transition-timing-function: cubic-bezier(0.8, 0.84, 0.44, 1.3); transform: translate3d(80px, 0, 0); transition-duration: 100ms;">${item.label}</a>`;

    return prev;
  },
  { pages: '', navs: '' }
);

const ASSET_PATH = process.env.ASSET_PATH || '/';

const alias = {
  'react-dom': '@hot-loader/react-dom',
};

// load the secrets
const secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

let options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
    options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
    popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
    devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.jsx'),
  },
  custom: {
    notHMR: ['background', 'contentScript', 'devtools'],
    enableBackgroundAutoReload: true, // always true when "enableContentScriptsAutoReload" is set true
    enableContentScriptsAutoReload: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
        {
          from: 'src/pages/Content/content.styles.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/icon-34.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/transparent_64x64.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/img/favicon.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },

        /**
         * css
         */
        {
          from: 'src/assets/css/jqp_gooey.min.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/css/jqp_normalize.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/css/jqp_component.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/css/jqp_fxfullwidth.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/css/jqp_styles.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },

        /**
         * js
         */
        {
          from: 'src/assets/js/jq-2.1.3.min.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/js/x_shortcuts.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/js/jqp_modernizr.custom.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/js/jqp_classie.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/js/jqp_gooey.min.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/js/jqp_main.js',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.ejs'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,

      pages: ejsData.pages,
      navs: ejsData.navs,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Panel', 'index.html'),
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
