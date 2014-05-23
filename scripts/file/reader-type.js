
define([

  'base/create',
  'core/enum'

], function (Create, Enum) {

  /**
   * ReaderType
   */
  var ReaderType = Create('ReaderType', {

    _attrs: {
      keys: {
        value: ['DATAURL', 'TEXT']
      }
    }

  }, Enum);


  return new ReaderType();

});
