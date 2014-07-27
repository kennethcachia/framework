/**
 * @module lib/observers/array-observer
 */
define([

  'lib/observers/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/third-party/observe'

], function (BaseObserver, inherit, Assert) {

  /**
   * A wrapper around ArrayObserver with additional functionality
   * provided by BaseObserver.
   * https://github.com/Polymer/observe-js#arrayobserver
   * 
   * @alias module:lib/observers/array-observer
   * @class
   * @extends BaseObserver
   * @param {Array} array The array to observe.
   */
  var _ArrayObserver = function (array) {
    Assert.isArray(array);

    /* global ArrayObserver */
    _ArrayObserver.superClass.call(this, ArrayObserver, array);
  };

  inherit(_ArrayObserver, BaseObserver);


  /* override */
  _ArrayObserver.prototype._processUpdates = function (summary) {
    var added = {};
    var removed = {};
    var changed = {};

    summary.forEach(function (update) {
      var array = this._observer.value_;
      var index = update.index;
      var addedCount = update.addedCount;

      for (var a = 0; a < addedCount; a++) {
        if (update.removed[a] !== undefined) {
          changed[a + index] = array[a + index];
        } else {
          added[a + index] = array[a + index];
        }
      }

      for (var r = addedCount; r < update.removed.length; r++) {
        removed[r + index] = undefined;
      }
    }, this);

    _ArrayObserver.super._processUpdates.call(this, added, removed, changed);
  };

  return _ArrayObserver;

});