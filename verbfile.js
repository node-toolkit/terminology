'use strict';

const path = require('path');
const yaml = require('js-yaml');
let loaded = false;

module.exports = function(app) {
  app.use(require('verb-generate-readme'));

  app.data.options.namespace = function(fp) {
    return path.basename(fp, path.extname(fp));
  };

  function loadOnce() {
    loaded = true;
    app.dataLoader(/\.yml$/, function(data) {
      return yaml.safeLoad(data);
    });
    app.data('terminology.yml');
  }

  if (!loaded) {
    loadOnce();
  }

  app.helper('words', function(words = []) {
    let str = '**Related words**: ';
    const len = words.length;
    if (len === 0) return '';

    for (let i = 0; i < len; i++) {
      const word = words[i];
      if (i !== 0 && i < len) {
        str += ', ';
      }
      str += '[' + word + '](#' + word + ')';
    }
    return str;
  });

  app.helper('projects', function(repos = []) {
    let str = '**Related projects**: ';
    const len = repos.length;
    if (len === 0) return '';

    for (let i = 0; i < len; i++) {
      const repo = repos[i];
      if (i !== 0 && i < len) {
        str += ', ';
      }
      str += '[' + repo + '][]';
    }

    return str;
  });
};
