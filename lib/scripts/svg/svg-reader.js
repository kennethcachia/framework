
define([

  'lib/base/create',
  'lib/file/reader',
  'lib/file/reader-type'

], function (Create, Reader, ReaderType) {

  /**
   * SVGReader
   */
  var SVGReader = Create('SVGReader', {

    _attrs: {
      acceptType: {
        value: 'image/svg+xml'
      },

      type: {
        value: ReaderType.TEXT
      }
    }

  }, Reader);


  return SVGReader;

});