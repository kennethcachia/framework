
define([

  'core/create',
  'core/enum'

], function (Create, Enum) {

  /**
   * SVGTypes
   */
  var SVGTypes = Create('SVGTypes', {

    _attrs: {
      keys: ['RECT', 'CIRCLE']
    }

  }, Enum);


  return new SVGTypes();

});
