
define([

  'lib/base/create',
  'lib/core/enum'

], function (Create, Enum) {

  /**
   * SVGType
   */
  var SVGType = Create('SVGType', {

    _attrs: {
      keys: {
        value: ['RECT', 'CIRCLE', 'PATH']
      }
    }

  }, Enum);


  return new SVGType();

});