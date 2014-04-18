
define([

  'core/create',
  'third-party/domready'

], function (Create, DomReady) {

  /**
   * Main Application wrapper
   */
  var App = Create('App', {

    initializer: function () {
      console.log(this.get('name'));
      console.log('(version ' + this.get('version') + ')');

      var readyFn = this.get('domReady');

      if (readyFn) {
        DomReady(readyFn.bind(this));
      }
    },


    _attrs: {
      name: {
        value: null
      },

      version: {
        value: '1.0.0'
      },

      domReady: {
        value: null
      }
    }

  });


  return App;

});
