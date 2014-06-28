/**
 * @module lib/base/destructable
 */
define(['lib/base/assert'], function (Assert) {

  /**
   * Handles it's own destruction. Also destroys
   * any other objects that are meant to be 
   * destroyed together.
   *
   * @alias module:lib/base/destructable
   * @constructor
   */
  var Destructable = function () {
    this._objectsToDestroy = [];
  };

  /**
   * Whether or not this object
   * was already destroyed.
   *
   * @default
   * @type {Boolean}
   */
  Destructable.prototype.isDestroyed = false;

  /**
   * Should be called when the object is to
   * be destroyed.
   * 
   * @method
   */
  Destructable.prototype.destroy = function () {
    if (this.isDestroyed === false) {
      this.isDestroyed = true;
      this.destructor();
      this._destroyObjects();
    }
  };

  /**
   * An abstract method that should be implemented
   * on all subclasses of Destructable and must
   * be used to handle any local destructions.
   *
   * @abstract
   * @method
   */
  Destructable.prototype.destructor = function () {
    throw new Error('destructor() not implemented');
  };

  /**
   * Adds an object to the list of objects that
   * are meant to be destroyed with this object.
   *
   * @method
   * @param {Destructable} obj An object to be destroyed.
   */
  Destructable.prototype.addObjectToDestroy = function (obj) {
    Assert.isInstanceOf(obj, Destructable);

    this._objectsToDestroy.push(obj);
  };

  /**
   * Destroys all the objects that are also meant to
   * be destroyed with this object.
   * 
   * @method
   * @private
   */
  Destructable.prototype._destroyObjects = function () {
    this._objectsToDestroy.forEach(function (obj) {
      obj.destroy();
    });

    this._objectsToDestroy = null;
  };


  return Destructable;

});