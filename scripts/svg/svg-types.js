
define([

  'core/create',
  'core/enum'

], function (Create, Enum) {

  /**
   * SVGTypes
   */
  var SVGTypes = Create('SVGTypes', {

    _attrs: {
      keys: {
        value: ['RECT', 'CIRCLE']
      }
    }

  }, Enum);


  return new SVGTypes();

});
