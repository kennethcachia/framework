
define([

  'core/create',
  'file/reader'

], function (Create, Reader) {

  /**
   * SVGReader
   */
  var SVGReader = Create('SVGReader', {

    initializer: function () {
      this.on('fileLoaded', this._onFileLoaded, this);
    },


    _onFileLoaded: function (data) {
      console.log(data.raw);
    },


    _attrs: {
      acceptType: {
        value: 'image/svg+xml'
      }
    }

  }, Reader);


  return SVGReader;

});
