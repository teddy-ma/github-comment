import Metalsmith from 'metalsmith';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import inPlace from 'metalsmith-in-place';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import sass from 'metalsmith-sass';
import htmlMinifier from 'metalsmith-html-minifier';

Metalsmith(__dirname)
  .use(collections({
    posts: {
      pattern: 'blog/!(index).md',
      sortBy: 'date',
      reverse: true
    },
    docs: {
      pattern: 'doc/!(index).md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(sass({
    outputDir: 'css'
  }))
  .use(markdown({
    gfm: true
  }))
  .use(permalinks({
    pattern: 'blog/:title',
    pattern: 'doc/:title'
  }))
  .use(layouts({
    engine: 'liquid',
    directory: 'layouts',
    includeDir: 'layouts/includes'
  }))
  .use(inPlace({
    engine: 'liquid',
    pattern: '**/*.html',
    includeDir: 'layouts/includes'
  }))
  .use(htmlMinifier())
  .build(function () {
    console.log('Cheers!');
  });
