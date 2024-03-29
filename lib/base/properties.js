/**
 * @module lib/base/properties
 */
define(['lib/base/assert'], function (Assert) {

  /**
   * @alias module:lib/base/properties
   */
  var Properties = {
    /**
     * Defines a Mutable Property on an object.
     * 
     * @method
     * @param {Object} obj The object to be augmented.
     * @param {Object} name The property's name.
     * @param {*=} initialValue The property's initial value. 
     */
    defineMutableProperty: function (obj, name, initialValue) {
      this._defineProperty(true, obj, name, initialValue);
    },


    /**
     * Defines an Immutable Property on an object.
     * 
     * @method
     * @param {Object} obj The object to be augmented.
     * @param {Object} name The property's name.
     * @param {*} initialValue The property's initial value. 
     */
    defineImmutableProperty: function (obj, name, initialValue) {
      this._defineProperty(false, obj, name, initialValue);
    },


    /**
     * Defines a Mutable Accessor on
     * an object.
     *
     * @method
     * @param {Object} obj The object to be augmented.
     * @param {String} name The property's name.
     * @param {*=} initialValue The property's initial value.
     * @param {Function} getter The getter function.
     * @param {Function} setter The setter function.
     */
    defineMutableAccessor: function (obj, name, initialValue, getter, setter) {
      this._defineAccessor(true, obj, name, initialValue, getter, setter);
    },


    /**
     * Defines an Immutable Accessor on an object.
     *
     * @method
     * @param {Object} obj The object to be augmented.
     * @param {String} name The property's name.
     * @param {*} initialValue The property's initial value.
     * @param {Function} getter The getter function.
     */
    defineImmutableAccessor: function (obj, name, initialValue, getter) {
      this._defineAccessor(false, obj, name, initialValue, getter);
    },


    /**
     * Defines an Immutable or a Mutable Property
     * on an object.
     * 
     * @method
     * @private
     * @param {Boolean} mutable Determines if a property
     *                          is mutable or not.
     * @param {Object} obj The object to be augmented.
     * @param {Object} name The property's name.
     * @param {*=} initialValue The property's initial value.
     *                          Required if immutable.
     */
    _defineProperty: function (mutable, obj, name, initialValue) {
      Assert.isObject(obj);
      Assert.isString(name);

      if (mutable === false) {
        Assert.isDefined(initialValue);
      }

      Object.defineProperty(obj, name, {
        value: initialValue,
        writable: mutable
      });
    },


    /**
     * Defines a Mutable or an Immutable
     * Accessor on an object.
     *
     * @method
     * @private
     * @param {Boolean} mutable Determines if the property is mutable or not.
     * @param {Object} obj The object to be augmented.
     * @param {String} name The property's name.
     * @param {*} initialValue The property's initial value.
     * @param {Function} getter The getter function.
     * @param {Function=} setter The setter function. Required if mutable.
     */
    _defineAccessor: function (mutable, obj, name, getter, setter) {
      Assert.isObject(obj);
      Assert.isString(name);
      Assert.isFunction(getter);
    
      if (mutable === true) {
        Assert.isFunction(setter);
      }

      var config = {
        get: getter
      };

      if (mutable === true) {
        config.set = setter;
      }

      Object.defineProperty(obj, name, config);
    }
  };


  return Properties;

});