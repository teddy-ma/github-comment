module.exports = {
  entry: './main.jsx',
  output: {
    // filename: '../public/javascripts/github-comment-react.js'
    filename: 'github-comment.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
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
