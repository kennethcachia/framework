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


  _ArrayObserver.prototype._processUpdates = function (summary) {
    // TODO: test with multiple changes
    var update = summary[0];
    var added = {};
    var removed = {};
    var changed = {};

    var index = update.index;
    var value = this._observer.value_;

    if (update.removed.length === update.addedCount) {
      // Modified
      changed[index] = value[index];
    } else if (update.addedCount) {
      // Additions
      added[index] = value[index];
    } else {
      // Removals
      removed[index] = undefined;
    }

    _ArrayObserver.super._processUpdates.call(this, added, removed, changed);
  };

  return _ArrayObserver;

});