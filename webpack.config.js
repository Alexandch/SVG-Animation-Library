const path = require('path');

module.exports = {
  mode: 'production', // Explicit mode for optimization
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Support both .ts and .tsx
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Include .tsx for React
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