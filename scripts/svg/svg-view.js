
define(['core/create', 'svg/svg', 'mv/view'], function (Create, SVG, View) {

  /**
   * SVG View
   */
  var SVGView = Create('SVGView', {

    addShape: function (shape) {
      this.get('container').appendChild(shape);
    },


    _attrs: {
      container: new SVG()
    }

  }, View);


  return SVGView;

});