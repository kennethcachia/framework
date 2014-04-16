
define([

  'core/create',
  'core/enum',
  'svg/svg-rect'

], function (Create, Enum, SVGRect) {

  /**
   * SVGTypes
   */
  var SVGTypes = Create('SVGTypes', {

    _attrs: {
      keys: ['RECT'],
      values: [SVGRect]
    }

  }, Enum);


  return new SVGTypes();

});
