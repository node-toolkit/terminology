'use strict';

var path = require('path');

module.exports = function(verb) {
  verb.data.options.namespace = function(fp) {
    return path.basename(fp, path.extname(fp));
  };

  verb.base.helper('words', function(words) {
    words = words || [];
    var len = words.length;
    if (len === 0) {
      return '';
    }

    var idx = -1;
    var str = '**Related words**: ';

    while (++idx < len) {
      var word = words[idx];
      if (idx !== 0 && idx < len) {
        str += ', ';
      }
      str += '[' + word + '](#' + word + ')';
    }

    return str;
  });

  verb.base.helper('projects', function(repos) {
    repos = repos || [];
    var len = repos.length;
    if (len === 0) {
      return '';
    }

    var idx = -1;
    var str = '**Related projects**: ';

    while (++idx < len) {
      var repo = repos[idx];
      if (idx !== 0 && idx < len) {
        str += ', ';
      }
      str += '[' + repo + '][]';
    }

    return str;
  });

  verb.base.data('terminology.json');
  verb.task('default', function(cb) {
    verb.generate(['verb-readme-generator'], cb);
  });
};
