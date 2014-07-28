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

  // TODO: improve.

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
    this._initInnerObserver('', obj);
  };

  inherit(_CompoundObserver, BaseObserver);


  /**
   * Initializes an inner observer.
   *
   * @method
   * @private
   * @param {String} path The current path.
   * @param {*} item The item to observe.
   */
  _CompoundObserver.prototype._initInnerObserver = function (path, item) {
    var observer = null;

    if (Check.isArray(item)) {
      observer = this._initInnerArrayObserver(path, item);
    } else if (Check.isObject(item)) {
      observer = this._initInnerObjectObserver(path, item);
    }

    if (Check.not.isNull(observer)) {
      this._innerObservers.push(observer);
      this.addObjectToDestroy(observer);

      observer.on(
        'updated', this._onInnerUpdate.bind(this, path, observer), this);
    }
  };


  /**
   * Augments the path if the current observer is an ObjectObserver.
   *
   * @method
   * @private
   * @param {ObjectObserver|ArrayObserver} observer
   *        The observer used at the current level.
   * @param {String} path The current path.
   * @param {String} key The value to be added to the path.
   * @returns {String} The new path.
   */
  _CompoundObserver.prototype._augmentPath = function (observer, path, key) {
    if (Check.isInstanceOf(observer, ObjectObserver)) {
      path = path + (path !== '' ? '.' : '') + key;
    }

    return path;
  };


  /**
   * Initializes an inner object observer.
   *
   * @method
   * @private
   * @param {Object} obj The object to observe.
   */
  _CompoundObserver.prototype._initInnerObjectObserver = function (path, obj) {
    var inner = new ObjectObserver(obj);
    var keys = Object.keys(obj);

    keys.forEach(function (key) {
      this._initInnerObserver(
        this._augmentPath(inner, path, key), obj[key]);
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
  _CompoundObserver.prototype._initInnerArrayObserver = function (path, array) {
    var inner = new ArrayObserver(array);

    array.forEach(function (value) {
      this._initInnerObserver(path, value);
    }, this);

    return inner;
  };


  /**
   * Process a list of changes to determine if any arrays and/or
   * objects have been added and/or modified.
   *
   * @method
   * @private
   * @param {ObjectObserver|ArrayObserver} observer
   *        The observer that triggered the change summary.
   * @param {String} path The current path.
   * @param {Object} updates The change summary.
   */
  _CompoundObserver.prototype._updateObservers = function (observer, path, updates) {
    var toCheck = [updates.added, updates.changed];

    toCheck.forEach(function (check) {
      Object.keys(check).forEach(function (key) {
        this._initInnerObserver(
          this._augmentPath(observer, path, key), check[key]);
      }, this);
    }, this);

    // TODO: destroy observers on removals.
  };


  /**
   * Adds the path value to a change summary.
   *
   * @method
   * @private
   * @param {String} path The path to be added.
   * @param {Object} updates The change summary.
   */
  _CompoundObserver.prototype._addPathToUpdates = function (path, updates) {
    if (path !== '') {
      var summary = [updates.added, updates.changed, updates.removed];

      summary.forEach(function (s) {
        if (Check.not.isEmpty(s)) {
          s.path = path;
        }
      });
    }
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
  _CompoundObserver.prototype._onInnerUpdate = function (path, observer, updates) {
    this._updateObservers(observer, path, updates);
    this._addPathToUpdates(path, updates);

    this._processUpdates(updates.added, updates.removed, updates.changed);
  };


  /* override */
  _CompoundObserver.prototype.destructor = function () {
    this._innerObservers = null;
    _CompoundObserver.super.destructor.call(this);
  };


  return _CompoundObserver;

});