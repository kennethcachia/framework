
define(['core/create', 'svg/svg-element'], function (Create, SVGElement) {

  /**
   * SVG
   */
  var SVG = Create('SVG', {

    _attrs: {
      html: '<svg></svg>'
    }

  }, SVGElement);


  return SVG;

});
