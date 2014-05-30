
define([

  'lib/base/create',
  'lib/base/attributes',
  'lib/base/events'

], function (Create, Attributes, Events) {

  /**
   * Base
   */
  var Base = Create('Base', {

    init: function (attrs) {
      this._attrs = new Attributes(attrs, this._attrs);
      this._baseEvents = new Events();

      this._callInitializers();
      this.fire('initReady');
    },


    destroy: function () {
      this._callDestructors();
      this.fire('destroyed');
      this._baseEvents.destroyEvents();
    },


    fire: function (eventName, data, propagate) {
      this._baseEvents.fire(eventName, data, propagate, this);
    },


    on: function (eventName, callback, context) {
      this._baseEvents.on(eventName, callback, context);
    },


    propagateEventsTo: function (dest) {
      this._baseEvents.propagateEventsTo(dest);
    },


    set: function (key, value, upsert) {
      var success = true;

      if (key.indexOf('.') === -1) {

        if (upsert === true || this._attrs.get(key, this) !== undefined) {
          this._attrs.set(key, value, this);
        } else {
          success = false;
        }

      } else {
        var pos = key.indexOf('.');
        var obj = key.substr(0, pos);
        var index = key.substr(pos + 1);

        if (upsert === true || this._attrs.get(obj, this) !== undefined) {
          this._attrs.setObj(obj, index, value);

          // Fire event data.*Change
          this._fireAttrChange(key)

          // Update key to fire dataChange event
          key = obj;
        } else {
          success = false;
        }
      }

      if (success) {
        this._fireAttrChange(key);
      } else {
        throw new Error('Upserts not allowed');
      }
    },


    setFromObject: function (src, upsert) {
      for (var s in src) {
        this.set(s, src[s], upsert);
      }
    },


    get: function (key) {
      return this._attrs.get(key, this);
    },


    toJSON: function () {
      return this._attrs.toJSON();
    },


    _callInitializers: function () {
      this._execute(this._initializers);
    },


    _callDestructors: function () {
      this._execute(this._destructors);
    },


    _execute: function (fns) {
      for (var f = 0; f < fns.length; f++) {
        fns[f].apply(this);
      }
    },


    _fireAttrChange: function (attr) {
      var data = {
        attr: attr
      };

      this.fire(attr + 'Change', data);
    }

  });


  return Base;

});
