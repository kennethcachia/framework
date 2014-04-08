
define(['core/create', 'svg/svg-element'], function (Create, SVGElement) {

  /**
   * SVG
   */
  var SVG = Create('SVG', {

    _attrs: {
      html: '<svg class="svg"></svg>'
    }

  }, SVGElement);


  return SVG;

});
