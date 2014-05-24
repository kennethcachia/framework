
define([

  'base/utils'

], function (Utils) {

  /**
   * Attributes
   */
  var Attributes = function (initAttrs, objAttrs) {
    var attrs = Utils.clone(initAttrs) || {};

    this._expandAttrs(attrs);
    this._attrs = Utils.mergeObjects(attrs, objAttrs);

    this._setDefaults();
  };


  Attributes.prototype = {
    set: function (key, value, context) {
      var attrs = this._attrs;

      // Allow attributes to be added dynamically
      if (!attrs[key]) {
        attrs[key] = {};
      }

      if (attrs[key].setter) {
        attrs[key].value = attrs[key].setter.call(context, value);
      } else {
        attrs[key].value = value;
      }
    },


    setFromObject: function (src, upsert) {
      for (var s in src) {
        if (upsert === true || this._attrs[s] !== undefined) {
          this.set(s, src[s]);
        }
      }
    },


    setObj: function (obj, key, value) {
      this._attrs[obj].value[key] = value;
    },


    get: function (key, context) {
      var val = null;

      if (this._attrs[key]) {
        var getter = this._attrs[key].getter;

        if (getter) {
          val = getter.call(context);
        } else {
          val = this._attrs[key].value;
        }
      }

      return val;
    },


    // Convert to value: {..}
    _expandAttrs: function (attrs) {
      for (var a in attrs) {
        attrs[a] = {
          value: attrs[a]
        };
      }
    },


    _setDefaults: function () {
      var attrValue;
      var attrDefault;

      for (var a in this._attrs) {
        attrValue = this._attrs[a].value;
        attrDefault = this._attrs[a].default;

        if (attrDefault && (attrValue === null || attrValue === undefined)) {
          this._attrs[a].value = this._attrs[a].default.call(this);
        }
      }
    }
  };


  return Attributes;

});
