
define([

  'lib/base/create'

], function (Create) {

  /**
   * Base
   */
  var Base = Create('Base', {

    initializer: function () {
      this.fire('initReady');
    },


    destructor: function () {
      this.fire('destroyed');
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


    _destroyEvents: function () {
      this._listeners = {};
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
