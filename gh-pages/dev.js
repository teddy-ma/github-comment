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
import metalsmithPrism from 'metalsmith-prism';

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
    gfm: true,
    langPrefix: 'language-'
  }))
  .use(metalsmithPrism())
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
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .use(
    watch({
      paths: {
        "${source}/**/*": true, // every changed files will trigger a rebuild of themselves
        "layouts/**/*": "**/*" // every templates changed will trigger a rebuild of all files
      },
      livereload: true,
    })
  )
  .build(function () {
    console.log('Cheers!');
  });
