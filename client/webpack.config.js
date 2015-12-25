module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // loader: 'babel-loader?presets[]=es2015&presets[]=react',
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules!sass-loader?outputStyle=expanded'
      }
    ]
  }
};
