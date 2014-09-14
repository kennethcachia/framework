/**
 * @module lib/file/abstract-reader
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/third-party/promise'

], function (Eventable, inherit, Assert, Check) {

  /**
   * Provides basic functionality for file reading.
   * Relies on the native FileReader.
   * 
   * @alias module:lib/file/abstract-reader
   * @class
   * @abstract
   * @extends Eventable
   * @param {Number} maxSize The maximum file size allowed in KB.
   * @param {String} acceptType The file type allowed.
   */
  var AbstractReader = function (maxSize, acceptType) {
    AbstractReader.superClass.call(this);

    Assert.isNumber(maxSize);
    Assert.isString(acceptType);

    this._maxSize = maxSize;
    this._acceptType = acceptType;
  };

  inherit(AbstractReader, Eventable);


  /**
   * Reads a File.
   *
   * @method
   * @param {File} file The file to be processed.
   * @returns {Promise}
   */
  AbstractReader.prototype.read = function (file) {
    /* global File */
    Assert.isInstanceOf(file, File);

    var isValidSize = this._matchesSize(file);
    var isValidType = this._matchesAcceptType(file);

    return new Promise(function (resolve, reject) {
      if (isValidSize && isValidType) {
        var reader = new FileReader();

        reader.onload = function (file) {
          try {
            var result = this._processResult(file.target.result);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        }.bind(this);

        reader.onerror = function () {
          reject(new Error('Error while parsing'));
        };

        this._processFile(reader, file);

      } else {
        var msg = isValidType ? 'File too big' : 'Incorrect File Type';
        reject(new Error(msg));
      }
    }.bind(this));
  };


  /**
   * Triggers the file processing. Must be implemented on all subclasses.
   *
   * @method
   * @abstract
   * @param {FileReader} fileReader
   *        The native FileReader that will process the file.
   * @param {File} file The file to be processed.
   */
  AbstractReader.prototype._processFile = function () {
    throw new Error('_processFile() not implemented');
  };


  /**
   * Invoked after a file has been processed succesfully and can
   * be used to modify this result before it's returned.
   *
   * @method
   * @private
   * @param {*} result The output from the native FileReader.
   * @returns {*} The modified result.
   */
  AbstractReader.prototype._processResult = function (result) {
    return result;
  };


  /**
   * Checks if a file matches the size requirements.
   *
   * @method
   * @private
   * @param {File} file The file to be processed.
   * @returns {Boolean} True if matches the size requirements.
   */
  AbstractReader.prototype._matchesSize = function (file) {
    return (file.size / 1024 <= this._maxSize);
  };


  /**
   * Checks if a file matches the acceptType requirements.
   *
   * @method
   * @private
   * @param {File} file The file to be processed.
   * @returns {Boolean} True if matches the acceptType requirements.
   */
  AbstractReader.prototype._matchesAcceptType = function (file) {
    var isValid = (file.type === this._acceptType);

    if (!isValid) {
      isValid = Check.not.isNull(file.type.match(this._acceptType));
    }

    return isValid;
  };


  /* override */
  AbstractReader.prototype.destructor = function () {
    this._maxSize = null;
    this._acceptType = null;

    AbstractReader.super.destructor.call(this);
  };


  return AbstractReader;

});