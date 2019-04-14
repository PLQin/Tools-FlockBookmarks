// import global vars for a whole app
require('./globals');

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const debug = require('debug')('app:webpack:config');
// const configs = require('./globals');

// console.log(__NODE_ENV__);

// const __NODE_ENV__ = 'development';
// ------------------------------------
// RULES INJECTION!
// ------------------------------------
const rules = [
  // PRELOAD CHECKING
  {
    enforce: 'pre',
    test: /\.(js|jsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
    options: {
      quiet: true
    }
  },
  {
    enforce: 'pre',
    test: /\.(ts|tsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'tslint-loader',
    options: {
      quiet: true,
      tsConfigFile: './tsconfig.json'
    }
  },
  // JAVASCRIPT/JSON
  {
    test: /\.html$/,
    use: {
      loader: 'html-loader'
    }
  },
  {
    test: /\.(js|jsx|ts|tsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader'
  },
  {
    type: 'javascript/auto',
    test: /\.json$/,
    loader: 'json-loader'
  },
  // STYLES
  {
    test: /.scss$/,
    use: [
      __PROD__ ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]'
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  // FILE/IMAGES
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }
];

// ------------------------------------
// BUNDLES OPTIMIZATION
// ------------------------------------
const optimization = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: false
          }
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: false
  }
};

// ------------------------------------
// STAGE PLUGINS INJECTION! [DEVELOPMENT, PRODUCTION, TESTING]
// ------------------------------------
const stagePlugins = {
  test: [new BundleAnalyzerPlugin()],
  development: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false,
      chunksSortMode: 'auto'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  production: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      },
      chunksSortMode: 'auto'
    })
  ]
};

// ------------------------------------
// STAGE CONFIGURATION INJECTION! [DEVELOPMENT, PRODUCTION]
// ------------------------------------
const stageConfig = {
  test: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  },
  development: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  },
  production: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }
};

const createConfig = () => {
  debug('Creating configuration.');
  debug(`Enabling devtools for '${__NODE_ENV__} Mode!'`);
  const { devtool, stats } = stageConfig[__NODE_ENV__];

  const webpackConfig = {
    mode: __DEV__ ? 'development' : 'production',
    name: 'client',
    target: 'web',
    devtool,
    stats,
    module: {
      rules: [...rules]
    },
    ...optimization
  };

  // ------------------------------------
  // Entry Points
  // ------------------------------------
  webpackConfig.entry = {
    app: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')].concat(
      'webpack-hot-middleware/client?path=/__webpack_hmr'
    )
  };

  webpackConfig.resolve = {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, './src'),
      '@config': path.join(__dirname, './src/config'),
      '@component': path.join(__dirname, './src/component'),
      '@constants': path.join(__dirname, './src/constants'),
      '@containers': path.join(__dirname, './src/containers'),
      '@controller': path.join(__dirname, './src/controller'),
      '@request': path.join(__dirname, './src/request'),
      '@view': path.join(__dirname, './src/view'),
      '@assets': path.join(__dirname, './src/assets')
    }
  };

  // ------------------------------------
  // Bundle externals
  // ------------------------------------
  webpackConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
  };

  // ------------------------------------
  // Bundle Output
  // ------------------------------------
  webpackConfig.output = {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  };

  webpackConfig.devServer = {
    // historyApiFallback: true,
    // contentBase: './public',
    // quiet: false, // 控制台中不输出打包的信息
    // hot: true, // 开启热点
    // inline: true, // 开启页面自动刷新
    port: 3000,
    public: 'http://localhost:3000',
    publicPath: '/',

    proxy: {
      '/efg/**': {
        target: 'https://www.baidu.com',
        pathRewrite: { '^/efg': '' },
        changeOrigin: true,
        secure: false
      },
      '/csdn': {
        target: 'https://blog.csdn.net',
        changeOrigin: true,
        pathRewrite: {
          '^/csdn': '/'
        }
      }

    }
  };

  // ------------------------------------
  // Plugins
  // ------------------------------------
  debug(`Enable plugins for '${__NODE_ENV__} Mode!'`);
  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      __DEV__,
      __PROD__,
      __TEST__
    }),
    ...stagePlugins[__NODE_ENV__]
  ];

  // ------------------------------------
  // Finishing the Webpack configuration!
  // ------------------------------------
  debug(`Webpack Bundles is Ready for '${__NODE_ENV__} Mode!'`);
  return webpackConfig;
};

module.exports = createConfig();
