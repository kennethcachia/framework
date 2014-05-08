
define([

  'core/create',
  'core/enum'

], function (Create, Enum) {

  /**
   * SVGType
   */
  var SVGType = Create('SVGType', {

    _attrs: {
      keys: {
        value: ['RECT', 'CIRCLE']
      }
    }

  }, Enum);


  return new SVGType();

});
