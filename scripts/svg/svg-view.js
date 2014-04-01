
define([

  'core/create',
  'svg/svg', 
  'mv/view'

], function (Create, SVG, View) {

  /**
   * SVG View
   */
  var SVGView = Create('SVGView', {

    initializer: function () {
      var container = this.get('container');

      if (!container) {
        container = new SVG();
        this.set('container', container);
      }
    },


    _attrs: {
      container: null
    }

  }, View);


  return SVGView;

});
