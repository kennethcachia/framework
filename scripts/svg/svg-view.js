
define(['core/create', 'svg/svg', 'mv/view'], function (Create, SVG, View) {

  /**
   * SVG View
   */
  var SVGView = Create('SVGView', {

    renderSVGShape: function (shape) {
      var shapeClass = this.get('shapeClass');
      shape.addClass(shapeClass);

      this.get('container').appendChild(shape);
    },


    _attrs: {
      container: new SVG(),
      shapeClass: 'svg-shape'
    }

  }, View);


  return SVGView;

});