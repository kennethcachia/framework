
define(function () {

  /**
   * Events
   */
  var Events = function () {
    this._propagateEvents = null;
    this._listeners = {};
  };


  Events.prototype = {

    destroyEvents: function () {
      this._listeners = {};
    },


    fire: function (eventName, data, propagate, source) {
      var listeners = this._listeners[eventName];
      var resumePropagation;

      data = data || {};
      data.source = data.source || source;

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
    }

  };


  return Events;

});
