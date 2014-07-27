/**
 * @module lib/observers/compound-observer
 */
define([

  'lib/observers/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/observers/object-observer',
  'lib/observers/array-observer',
  'lib/third-party/observe'

], function (BaseObserver, inherit, Assert, Check, ObjectObserver, ArrayObserver) {

  /**
   * Observes an object. Initializes secondary observers if
   * the objects contains nested arrays and/or objects.
   * 
   * @alias module:lib/observers/compound-observer
   * @class
   * @extends BaseObserver
   * @param {obj} obj The object to observe.
   */
  var _CompoundObserver = function (obj) {
    Assert.isObject(obj);

    /* global CompoundObserver */
    _CompoundObserver.superClass.call(this, CompoundObserver, obj);

    this._innerObservers = [];
    this._initInnerObserver(obj);
  };

  inherit(_CompoundObserver, BaseObserver);


  /**
   * Initializes an inner observer.
   *
   * @method
   * @private
   * @param {*} item The item to observe.
   */
  _CompoundObserver.prototype._initInnerObserver = function (item) {
    var observer = null;

    if (Check.isArray(item)) {
      observer = this._initInnerArrayObserver(item);
    } else if (Check.isObject(item)) {
      observer = this._initInnerObjectObserver(item);
    }

    if (Check.not.isNull(observer)) {
      this._innerObservers.push(observer);
      this.addObjectToDestroy(observer);

      observer.on(
        'updated', this._onInnerUpdate.bind(this, observer), this);
    }
  };


  /**
   * Initializes an inner object observer.
   *
   * @method
   * @private
   * @param {Object} obj The object to observe.
   * @returns {ObjectObserver} The constructed object observer.
   */
  _CompoundObserver.prototype._initInnerObjectObserver = function (obj) {
    var inner = new ObjectObserver(obj);
    var keys = Object.keys(obj);

    keys.forEach(function (key) {
      this._initInnerObserver(obj[key]);
    }, this);

    return inner;
  };


  /**
   * Initializes an inner array observer.
   *
   * @method
   * @private
   * @param {Array} array The array to observe.
   * @returns {ArrayObserver} The constructed array observer.
   */
  _CompoundObserver.prototype._initInnerArrayObserver = function (array) {
    var inner = new ArrayObserver(array);
    array.forEach(this._initInnerObserver, this);
    return inner;
  };


  /**
   * Invoked when an inner observer is updated and processes
   * the change summary. Propagates the updated event if necessary.
   *
   * @method
   * @private
   * @param {ObjectObserver|ArrayObserver} observer
   *        The inner observer that fired the update event.
   * @param {Object} updates The change summary.
   */
  _CompoundObserver.prototype._onInnerUpdate = function (observer, updates) {
    var additions = Object.keys(updates.added);
    var changes = Object.keys(updates.changed);

    additions.forEach(function (key) {
      this._initInnerObserver(updates.added[key]);
    }, this);

    changes.forEach(function (key) {
      this._initInnerObserver(updates.changed[key]);
    }, this);

    // TODO: destroy observers on removals.

    this._processUpdates(updates.added, updates.removed, updates.changed);
  };


  /* override */
  _CompoundObserver.prototype.destructor = function () {
    this._innerObservers = null;
    _CompoundObserver.super.destructor.call(this);
  };


  return _CompoundObserver;

});