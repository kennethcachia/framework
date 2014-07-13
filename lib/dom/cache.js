/**
 * @module lib/dom/cache
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/dom/node',
  'lib/base/properties'

], function (Eventable, inherit, Assert, Check, DOMNode, Properties) {

  /**
   * Maintains a list of cached DOM nodes.
   *
   * @alias module:lib/dom/cache
   * @class
   * @extends Eventable
   * @param {DOMNode} parent 
   *        The DOM Node used as the root for all queries.
   */
  var Cache = function (parent) {
    Assert.isInstanceOf(parent, DOMNode);

    Cache.superClass.call(this);

    Properties.defineImmutableProperty(
      this, '_parent', parent);

    this.purge();
  };

  inherit(Cache, Eventable);


  /**
   * Returns a DOMNode or an array of DOMNodes
   * that match a given selector.
   *
   * @method
   * @param {String} selector The selector.
   * @returns {DOMNode|Array}
   *          A DOMNode or an array of DOMNodes.
   */
  Cache.prototype.find = function (selector) {
    Assert.isString(selector);

    if (!this._isCached(selector)) {
      this._create(selector);
    }

    return this._retrieve(selector);
  };


  /**
   * Clears the internal cache.
   * 
   * @method
   */
  Cache.prototype.purge = function () {
    this._cache = {};
  };


  /**
   * Checks if a selector already exists in cache.
   * 
   * @method
   * @private
   * @param {String} selector The selector.
   * @returns {Boolean} True if already cached.
   */
  Cache.prototype._isCached = function (selector) {
    return Check.not.isUndefined(this._cache[selector]);
  };


  /**
   * Resolves the selector to a DOMNode or an 
   * array of DOMNodes and adds a new entry 
   * to the cache.
   *
   * @method
   * @private
   * @param {String} selector
   *        The selector to search for.
   */
  Cache.prototype._create = function (selector) {
    var nodes = this._parent.all(selector);
    var item = nodes.length === 1 ? nodes[0] : nodes;

    this._cache[selector] = item;
  };


  /**
   * Retrieves an entry from cache.
   * 
   * @method
   * @private
   * @param {String} key The item to retrieve.
   * @returns {DOMNode|Array}
   *          A DOMNode or an array of DOMNodes.
   */
  Cache.prototype._retrieve = function (key) {
    return this._cache[key];
  };


  /* override */
  Cache.prototype.destructor = function () {
    this._cache = null;
    Cache.super.destructor.call(this);
  };


  return Cache;

});