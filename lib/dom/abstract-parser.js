/**
 * @module lib/dom/abstract-parser
 */
define([

  'lib/events/eventable',
  'lib/base/inherit'

], function (Eventable, inherit) {

  /**
   * Provides basic functionality for parsing a string into a Document.
   * Relies on the native DOMParser.
   *
   * @alias module:lib/dom/abstract-parser
   * @class
   * @abstract
   * @extends Eventable
   */
  var AbstractParser = function () {
    AbstractParser.superClass.call(this);
    this._domParser = new DOMParser();
  };

  inherit(AbstractParser, Eventable);


  /**
   * Parses a string into a document.
   *
   * @method
   * @abstract
   * @private
   * @param {String} input The string to be parsed.
   * @returns {Document} The generated document.
   */
  AbstractParser.prototype.parse = function (input) {
    var output = this._parseFromString(input);
    this._checkForErrors(output);
    return output;
  };


  /**
   * Invokes the native DOMParser's parseFromString().
   *
   * @method
   * @abstract
   * @private
   * @param {String} input The string to be parsed.
   * @returns {Document} The generated Document.
   */
  AbstractParser.prototype._parseFromString = function () {
    throw new Error('_parseFromString() not implemented');
  };


  /**
   * Checks the generated Document for any parse errors.
   *
   * @method
   * @private
   * @param {Document} doc The generated Document.
   * @throws {Error} If the Document is malformed.
   */
  AbstractParser.prototype._checkForErrors = function (doc) {
    var error = doc.querySelector('parsererror');

    if (error) {
      throw new Error('Error while parsing');
    }
  };


  /* override */
  AbstractParser.prototype.destructor = function () {
    this._domParser = null;
    AbstractParser.super.destructor.call(this);
  };


  return AbstractParser;

});