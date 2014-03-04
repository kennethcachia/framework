
define(['core/create', 'svg/svg-shape'], function (Create, SVGShape) {

  /**
   * SVGRect
   */
  var SVGRect = Create('SVGRect', {

    _attrs: {
      width: null,
      height: null,
      html: '<rect/>'
    }

  }, SVGShape);


  return SVGRect;

});