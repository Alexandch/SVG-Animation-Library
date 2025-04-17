const path = require('path');

module.exports = {
  entry: './src/index.ts', // Your entry file
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'AnimatedSVGLib',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    react: 'React',       
    'react-dom': 'ReactDOM', 
  },
};