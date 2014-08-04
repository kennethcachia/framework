/**
 * @module lib/dom/svg-parser
 */
define([

  'lib/dom/abstract-parser',
  'lib/base/inherit'

], function (AbstractParser, inherit) {

  /**
   * Parses a string into an SVGDocument.
   *
   * @alias module:lib/dom/svg-parser
   * @class
   * @extends AbstractParser
   */
  var SVGParser = function () {
    SVGParser.superClass.call(this);
  };

  inherit(SVGParser, AbstractParser);


  /* override */
  SVGParser.prototype._parseFromString = function (input) {
    return this._domParser.parseFromString(input, 'image/svg+xml');
  };


  return SVGParser;

});