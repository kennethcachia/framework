/**
 * @module lib/base/abstract-destructable
 */
define(['lib/base/assert'], function (Assert) {

  /**
   * Handles it's own destruction. Also destroys
   * any other objects that are meant to be 
   * destroyed together.
   *
   * @alias module:lib/base/abstract-destructable
   * @constructor
   */
  var AbstractDestructable = function () {
    this._isDestroyed = false;
    this._objectsToDestroy = [];
  };

  /**
   * Should be called when the object is to
   * be destroyed.
   * 
   * @method
   */
  AbstractDestructable.prototype.destroy = function () {
    if (this._isDestroyed === false) {
      this._isDestroyed = true;
      this.destructor();
      this._destroyObjects();
    }
  };

  /**
   * An abstract method that should be implemented
   * on all subclasses of AbstractDestructable and is
   * used to handle any local destructions.
   *
   * @abstract
   * @method
   */
  AbstractDestructable.prototype.destructor = function () {
    throw new Error('destructor() not implemented');
  };

  /**
   * Adds an object to the list of objects that
   * are meant to be destroyed with this object.
   *
   * @method
   * @param {AbstractDestructable} obj An object to be destroyed.
   */
  AbstractDestructable.prototype.addObjectToDestroy = function (obj) {
    Assert.isInstanceOf(obj, AbstractDestructable);

    this._objectsToDestroy.push(obj);
  };

  /**
   * Destroys all the objects that are also meant to
   * be destroyed with this object.
   * 
   * @method
   * @private
   */
  AbstractDestructable.prototype._destroyObjects = function () {
    this._objectsToDestroy.forEach(function (obj) {
      obj.destroy();
    });

    this._objectsToDestroy = null;
  };


  return AbstractDestructable;

});