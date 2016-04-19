var rootDir = __dirname + '/';

module.exports = {
  
  config: function(conf) {
    'use strict';
    console.log('Using iui-wizard directives');

    if (conf.client.head.settings &&
        conf.client.head.settings.combine &&
        conf.client.head.addlPathedScripts) {
      conf.client.head.addlPathedScripts.push(rootDir + 'dist/core-module-setup.js');
      conf.client.head.addlPathedScripts.push(rootDir + 'dist/iui-wizard.js');
    } else {
      conf.client.head.scripts.push(rootDir + '$iui-wizard/dist/core-module-setup.js');
      conf.client.head.scripts.push(conf.client.app.root + '$iui-wizard/dist/iui-wizard.min.js');
    }
  },

  app: function(app, conf) {
    'use strict';
    app.get('/\\$iui-wizard/*', function(req, res) {
      res.sendfile(rootDir + req.params[0]);
    });
  }
};