/**
 * @module lib/observers/base
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/base/assert'

], function (Eventable, inherit, Assert) {

  /**
   * Provides basic functionality for observers. This class
   * should not be used directly.
   * 
   * @alias module:lib/observers/base
   * @class
   * @extends Eventable
   * @param {Function} ObserverType
   *        The constructor function for the new observer.
   * @param {*=} item The item to observe.
   */
  var BaseObserver = function (ObserverType, item) {
    BaseObserver.superClass.call(this);

    this._observer = null;

    this._init(ObserverType, item);
    this._open();
  };

  inherit(BaseObserver, Eventable);


  /**
   * Triggers a change delivery.
   * 
   * @method
   * @private
   */
  BaseObserver.prototype.sync = function () {
    /* global Platform */
    Platform.performMicrotaskCheckpoint();
  };


  /**
   * Discards all changes.
   * 
   * @method
   * @private
   */
  BaseObserver.prototype.discard = function () {
    this._observer.discardChanges();
  };


  /**
   * Intializes the observer.
   *
   * @method
   * @private
   * @param {Function} ObserverType
   *        The constructor function for the new observer.
   * @param {*=} item The item to observe.
   */
  BaseObserver.prototype._init = function (ObserverType, item) {
    Assert.isFunction(ObserverType);
    this._observer = new ObserverType(item);
  };


  /**
   * Opens the observer and starts listening for changes.
   * 
   * @method
   * @private
   */
  BaseObserver.prototype._open = function () {
    this._observer.open(this._processUpdates, this);
  };


  /**
   * Closes the observer.
   *
   * @method
   * @private
   */
  BaseObserver.prototype._close = function () {
    this._observer.close();
  };


  /**
   * Invoked when the item being observed changes. Fires an
   * updated event if the object was modified.
   *
   * @method
   * @private
   * @param {Object} added The additions made to the item.
   * @param {Object} removed The removals from the item.
   * @param {Object} changed The updates made to the item.
   */
  BaseObserver.prototype._processUpdates = function (added, removed, changed) {
    var hasChanged = this._hasChanged(added, removed, changed);

    if (hasChanged === true) {
      this.fire('updated', {
        added: added,
        removed: removed,
        changed: changed
      });
    }
  };


  /**
   * Determines if the item has changed. Can be optionally 
   * overriden to perform additional filtering to determine
   * if the observer should broadcast a change summary.
   *
   * @method
   * @private
   * @param {Object} added The additions made to the item.
   * @param {Object} removed The removals from the item.
   * @param {Object} changed The updates made to the item.
   * @returns {Boolean} True if the object was updated.
   */
  BaseObserver.prototype._hasChanged = function () {
    return true;
  };


  /* override */
  BaseObserver.prototype.destructor = function () {
    this._close();
    this._observer = null;

    BaseObserver.super.destructor.call(this);
  };


  return BaseObserver;

});