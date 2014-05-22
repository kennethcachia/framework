
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

    var _initializers = [];
    var _destructors = [];
    var _attrs = own._attrs || {};

    if (extension) {
      _initializers = extension.prototype._initializers.slice(0);
      _destructors = extension.prototype._destructors.slice(0);
      _attrs = Utils.mergeObjects(_attrs, extension.prototype._attrs);
    }


    var _BASE = function (attrs) {
      this.init(attrs);
    };

    _BASE.prototype = Utils.clone(Base);

    Utils.extend(own, _BASE.prototype, _initializers, _destructors);

    if (extension) {
      Utils.extend(extension.prototype, _BASE.prototype);
      _BASE.super = extension.prototype;
    }

    _BASE.prototype._initializers = _initializers;
    _BASE.prototype._destructors = _destructors;
    _BASE.prototype._attrs = _attrs;
    _BASE.prototype._name = name;

    return _BASE;
  }


  return Create;

});
