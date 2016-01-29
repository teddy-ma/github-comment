import Metalsmith from 'metalsmith';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import inPlace from 'metalsmith-in-place';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import sass from 'metalsmith-sass';
import htmlMinifier from 'metalsmith-html-minifier';
import serve from 'metalsmith-serve';
import watch from 'metalsmith-watch';
import prefix from 'metalsmith-prefix';

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
  .use(prefix({
      prefix: 'github-comment',
      selector: 'a, img, link, script'
  }))
  .use(htmlMinifier())
  .build(function () {
    console.log('Cheers!');
  });
