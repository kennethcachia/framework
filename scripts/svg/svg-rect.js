
define([

  'core/create',
  'svg/svg-shape-view',
  'svg/svg-types'

], function (Create, SVGShape, SVGTypes) {

  /**
   * SVGRect
   */
  var SVGRect = Create('SVGRect', {

    _attrs: {
      container: '<rect x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" style="{{style}}"></rect>',
      type: SVGTypes.RECT
    }

  }, SVGShape);


  return SVGRect;

});
