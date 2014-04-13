
define([

  'core/create',
  'svg/svg-shape-view'

], function (Create, SVGShape) {

  /**
   * SVGRect
   */
  var SVGRect = Create('SVGRect', {

    _attrs: {
      container: '<rect x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" style="{{style}}"></rect>',
    }

  }, SVGShape);


  return SVGRect;

});
