
define([

  'base/attributes'

], function (Attributes) {

  /**
   * Base
   */
  var Base = {
    init: function (attrs) {
      attrs = attrs || {};
      attrs.id = attrs.id || null;

      this._attrs = new Attributes(attrs, this._attrs);

      this._propagateEvents = null;
      this._listeners = {};

      this._callInitializers();
      this.fire('initReady');
    },


    destroy: function () {
      this._callDestructors();
      this._destroyEvents();
    },


    fire: function (eventName, data, propagate) {
      var listeners = this._listeners[eventName];
      var resumePropagation;

      data = data || {};
      data.source = data.source || this;

      if (listeners) {
        var listener;

        for (var l = 0; l < listeners.length; l++) {
          listener = listeners[l];
          resumePropagation = listener.callback.call(listener.context, data);

          if (resumePropagation === false) {
            propagate = false;
          }
        }
      }

      // Pass it on
      if (propagate === true) {
        var propagateEvents = this._propagateEvents;

        if (propagateEvents) {
          propagateEvents.fire(eventName, data, propagate);
        }
      }
    },


    on: function (eventName, callback, context) {
      if (!Array.isArray(eventName)) {
        eventName = [eventName];
      }

      for (var e = 0; e < eventName.length; e++) {
        this._on(eventName[e], callback, context);
      }
    },


    set: function (key, value) {
      if (key.indexOf('.') === -1) {
        this._attrs.set(key, value, this);
      } else {
        var pos = key.indexOf('.');
        var obj = key.substr(0, pos);
        var index = key.substr(pos + 1);

        this._attrs.setObj(obj, index, value);

        // Fire event data.*Change
        this._fireAttrChange(key)

        // Update key to fire dataChange event
        key = obj;
      }

      this._fireAttrChange(key);
    },


    setFromObject: function (src, upsert) {
      this._attrs.setFromObject(src, upsert);
    },


    get: function (key) {
      return this._attrs.get(key, this);
    },


    propagateEventsTo: function (dest) {
      this._propagateEvents = dest;
    },


    _on: function (eventName, callback, context) {
      if (this._listeners[eventName] === undefined) {
        this._listeners[eventName] = [];
      }

      this._listeners[eventName].push({
        callback: callback,
        context: context
      });
    },


    _callInitializers: function () {
      this._execute(this._initializers);
    },


    _callDestructors: function () {
      this._execute(this._destructors);
    },


    _destroyEvents: function () {
      this._listeners = {};
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
  };


  return Base;

});
