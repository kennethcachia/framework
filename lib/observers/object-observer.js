/**
 * @module lib/observers/object-observer
 */
define([

  'lib/observers/base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/third-party/observe'

], function (BaseObserver, inherit, Assert) {

  /**
   * A wrapper around ObjectObserver with additional functionality
   * provided by BaseObserver.
   * https://github.com/Polymer/observe-js#objectobserver
   * 
   * @alias module:lib/observers/object-observer
   * @class
   * @extends BaseObserver
   * @param {obj} obj The object to observe.
   */
  var _ObjectObserver = function (obj) {
    Assert.isObject(obj);

    /* global ObjectObserver */
    _ObjectObserver.superClass.call(this, ObjectObserver, obj);
  };

  inherit(_ObjectObserver, BaseObserver);


  return _ObjectObserver;

});