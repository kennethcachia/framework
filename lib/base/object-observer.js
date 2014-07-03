/**
 * @module lib/base/object-observer
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/third-party/observe'

], function (Eventable, inherit, Assert) {

  /**
   * A wrapper around ObjectObserver.
   * https://github.com/Polymer/observe-js#objectobserver
   *
   * @alias module:lib/base/object-observer
   * @class
   * @extends Eventable
   * @params {Object} obj The object to observe.
   */
  var _ObjectObserver = function (obj) {
    _ObjectObserver.superClass.call(this);

    Assert.isObject(obj);

    /* global ObjectObserver */
    this._observer = new ObjectObserver(obj);

    this._open();
  };

  inherit(_ObjectObserver, Eventable);


  /**
   * Trigger a local change delivery.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype.sync = function () {
    this._observer.deliver();
  };


  /**
   * Trigger a global change delivery.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype.globalSync = function () {
    /* global Platform */
    Platform.performMicrotaskCheckpoint();
  };


  /**
   * Discards all changes.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype.discard = function () {
    this._observer.discardChanges();
  };


  /**
   * Initialize the observer.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype._open = function () {
    this._observer.open(this._processUpdates, this);
  };


  /**
   * Filters the change summary and ignores any
   * updates made to internal properties.
   * 
   * @method
   * @private
   * @param {Object} added The added properties.
   * @param {Object} removed The removed properties.
   * @param {Object} changed The modified properties.
   */
  _ObjectObserver.prototype._processUpdates = function (added, removed, changed) {
    var hasChanged = false;
    var updates = [added, removed, changed];

    updates.map(function (current) {
      Object.keys(current).forEach(function (key) {
        hasChanged = (key[0] === '_') ? false : true;
      });      
    });

    if (hasChanged) {
      this.fire('updated');
    }
  };


  /* override */
  _ObjectObserver.prototype.destructor = function () {
    this._observer.close();
    this._observer = null;

    _ObjectObserver.super.destructor.call(this);
  };


  return _ObjectObserver;

});