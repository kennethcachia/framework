
define([

  'base/create',
  'file/reader-type'

], function (Create, ReaderType) {

  /**
   * Reader
   */
  var Reader = Create('Reader', {

    initializer: function () {
      this._initReader();
    },


    destructor: function () {
      this._reader = null;
      this._file = null;
    },


    processFile: function (file) {
      this._file = file;

      var isValidSize = this._matchesSize();
      var isValidType = this._matchesAcceptType();

      if (!isValidType) {
        this.fire('invalidType');
      } else if (!isValidSize) {
        this.fire('invalidSize');
      } else {
        this._readingFn.call(this._reader, file);
      }
    },


    _matchesSize: function () {
      var isValid = true;
      var maxSize = this.get('maxSize');

      if (maxSize) {
        isValid = (this._file.size / 1024 <= maxSize);
      }

      return isValid;
    },


    _matchesAcceptType: function () {
      var isValid = true;
      var acceptType = this.get('acceptType');

      if (acceptType) {
        isValid = (this._file.type === acceptType);
      }

      return isValid;
    },


    _initReader: function () {
      // TODO: Feature detection.
      this._reader = new FileReader();

      this._bindReaderEvents();
      this._setMode();
    },


    _bindReaderEvents: function () {
      // TODO: events.
      this._reader.onload = this._onLoad.bind(this);
    },


    _setMode: function () {
      var type = this.get('type');

      switch (type) {
        case ReaderType.DATAURL:
          this._readingFn = this._reader.readAsDataURL;
          break;

        case ReaderType.TEXT:
          this._readingFn = this._reader.readAsText;
          break;
      }
    },


    _onLoad: function (file) {
      var result = file.target.result;

      this.fire('fileLoaded', {
        file: this._file,
        raw: result
      });
    },


    _attrs: {
      type: {
        value: ReaderType.DATAURL
      },

      // Maximum size in KB
      maxSize: {
        value: null
      },

      acceptType: {
        value: null
      }
    }

  });


  return Reader;

});
