import Metalsmith from 'metalsmith';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import inPlace from 'metalsmith-in-place';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import sass from 'metalsmith-sass';
import htmlMinifier from 'metalsmith-html-minifier';
import prefix from 'metalsmith-prefix';
import date from 'metalsmith-build-date';
import metallic from 'metalsmith-metallic';

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
  .use(metallic())
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
  .use(date())
  .build(function () {
    console.log('Cheers!');
  });
