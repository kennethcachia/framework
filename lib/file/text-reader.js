/**
 * @module lib/file/text-reader
 */
define([

  'lib/file/abstract-reader',
  'lib/base/inherit'

], function (AbstractReader, inherit) {

  /**
   * Reads a File as text.
   * 
   * @alias module:lib/file/text-reader
   * @class
   * @extends AbstractReader
   * @param {Number} maxSize The maximum file size allowed in KB.
   * @param {String} acceptType The file type allowed.
   */
  var TextReader = function (maxSize, acceptType) {
    TextReader.superClass.call(this, maxSize, acceptType);
  };

  inherit(TextReader, AbstractReader);


  /* override */
  TextReader.prototype._processFile = function (fileReader, file) {
    fileReader.readAsText(file);
  };


  return TextReader;

});