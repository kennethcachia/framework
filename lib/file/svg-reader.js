/**
 * @module lib/file/svg-reader
 */
define([

  'lib/file/text-reader',
  'lib/base/inherit',
  'lib/dom/svg-parser'

], function (TextReader, inherit, SVGParser) {

  /**
   * Reads a File as text and processes it into an SVGDocument.
   * 
   * @alias module:lib/file/svg-reader
   * @class
   * @extends TextReader
   * @param {Number} maxSize The maximum file size allowed in KB.
   */
  var SVGReader = function (maxSize) {
    SVGReader.superClass.call(this, maxSize, 'image/svg+xml');
    this._svgParser = new SVGParser();
  };

  inherit(SVGReader, TextReader);


  /* override */
  SVGReader.prototype._processResult = function (result) {
    return this._svgParser.parse(result);
  };


  /* override */
  SVGReader.prototype.destructor = function () {
    this._svgParser = null;
    SVGReader.super.destructor.call(this);
  };


  return SVGReader;

});