
define([

  'core/create',
  'third-party/domready'

], function (Create, DomReady) {

  /**
   * App
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
        value: '0.0.1'
      },

      domReady: {
        value: null
      }
    }

  });


  return App;

});
