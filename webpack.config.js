const path = require('path');
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  experiments: {
    outputModule: true, // Поддержка ESM в выходных файлах
  },
};