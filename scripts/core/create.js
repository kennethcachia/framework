
define([

  'core/base',
  'core/utils'

], function (Base, Utils) {

  /**
   * Create
   */
  function Create(name, own, extension) {
    if (!name || typeof name !== 'string') {
      throw new Error('No Name');
    }

    var BaseObject = createBaseObject();

    var initializers = [];
    var destructors = [];
    var attrs = own._attrs || {};

    if (extension) {
      initializers = extension.prototype._initializers.slice(0);
      destructors = extension.prototype._destructors.slice(0);
      attrs = Utils.mergeObjects(attrs, extension.prototype._attrs);
    }

    Utils.extend(own, BaseObject.prototype, initializers, destructors);

    if (extension) {
      Utils.extend(extension.prototype, BaseObject.prototype);
      BaseObject.super = extension.prototype;
    }

    BaseObject.prototype._initializers = initializers;
    BaseObject.prototype._destructors = destructors;
    BaseObject.prototype._attrs = attrs;
    BaseObject.prototype._name = name;

    return BaseObject;
  }


  function createConstructorFn() {
    return function (attrs) {
      this.init(attrs);
    };
  }


  function createBaseObject() {
    var BaseObject = createConstructorFn();
    BaseObject.prototype = Utils.clone(Base);

    return BaseObject;
  }


  return Create;

});
