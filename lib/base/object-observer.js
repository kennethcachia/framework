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
   * Trigger a local change summary.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype.sync = function () {
    this._observer.deliver();
  };


  /**
   * Trigger a global change summary.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype.globalSync = function () {
    /* global Platform */
    Platform.performMicrotaskCheckpoint();
  };


  /**
   * Initialize the observer and fire
   * an event when the object changes.
   * 
   * @method
   * @private
   */
  _ObjectObserver.prototype._open = function () {
    this._observer.open(function () {
      this.fire('updated');
    }, this);
  };


  /* override */
  _ObjectObserver.prototype.destructor = function () {
    this._observer.close();
    this._observer = null;

    _ObjectObserver.super.destructor.call(this);
  };


  return _ObjectObserver;

});