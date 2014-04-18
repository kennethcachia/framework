
define(function () {

  /**
   * Create
   */
  function Create(name, own, extension) {

    function clone(object) {
      var output = {};

      for (var key in object) {

        if (object.hasOwnProperty(key)) {
          if (object[key] && !object[key]._name && object[key].constructor.name === 'Object') {
            output[key] = clone(object[key]);
          } else {
            output[key] = object[key]
          }
        }

      }

      return output;
    }


    function mergeObjects(a, b) {
      var na = clone(a);
      var nb = clone(b);

      var merged = nb;

      for (var key in na) {

        if (na.hasOwnProperty(key)) {
          if (na[key] && !na[key]._name && na[key].constructor.name === 'Object') {
            merged[key] = mergeObjects(na[key], merged[key]);
          } else {
            merged[key] = na[key];
          }
        }

      }

      return merged;
    }


    function mergeProtos(src, dest) {
      for (var s in src) {
        if (s === 'initializer') {
          _initializers.push(src[s]);
        } else if (s === 'destructor') {
          _destructors.unshift(src[s]);
        } else if (src.hasOwnProperty(s)) {

          if (dest[s]) {
            //console.log('using from dest -- ' + s);
          } else {
            dest[s] = src[s];
          }
        }
      }
    }


    if (!name || typeof name !== 'string') {
      throw 'No Name';
    }


    var _initializers = [];
    var _destructors = [];
    var _attrs = own._attrs || {};

    if (extension) {
      _initializers = extension.prototype._initializers.slice(0);
      _destructors = extension.prototype._destructors.slice(0);
      _attrs = mergeObjects(_attrs, extension.prototype._attrs);
    }


    var Base = function (attrs) {
      // Merge base attrs
      attrs = clone(attrs) || {};
      attrs.id = attrs.id || null;

      // Convert to value: {..}
      for (var a in attrs) {
        attrs[a] = {
          value: attrs[a]
        };
      }

      // Private objects
      this._propagateEvents = null;
      this._name = name;
      this._listeners = {};

      // Merge attributes
      if (attrs) {
        this._attrs = mergeObjects(attrs, this._attrs);
      }

      this._callInitializers();

      for (var a in this._attrs) {
        this._fireAttrChange(a);
      }
    };


    Base.prototype = {

      destroy: function () {
        this._callDestructors();
        this._destroyEvents();
      },


      fire: function (eventName, data, propagate) {
        var listeners = this._listeners[eventName];
        var stopPropagation = false;

        data = data || {};
        data.source = data.source || this;

        if (listeners) {
          var listener;
          var resumePropagation;

          for (var l = 0; l < listeners.length; l++) {
            listener = listeners[l];

            resumePropagation = listener.callback.call(listener.context, data);

            if (resumePropagation === false) {
              stopPropagation = true;
            }
          }
        }

        // Pass it on
        if (propagate == true && stopPropagation !== true) {
          var propagateEvents = this._propagateEvents;

          if (propagateEvents) {
            propagateEvents.fire(eventName, data, propagate);
          }
        }
      },


      on: function (eventName, callback, context) {
        if (this._listeners[eventName] === undefined) {
          this._listeners[eventName] = [];
        }

        this._listeners[eventName].push({
          callback: callback,
          context: context
        });
      },


      set: function (key, value) {

        if (key.indexOf('.') === -1) {

          this._attrs[key].value = value;

        } else {

          var pos = key.indexOf('.');
          var obj = key.substr(0, pos);
          var index = key.substr(pos + 1);

          this._attrs[obj].value[index] = value;

          // Fire event on key name
          key = obj;

        }

        this._fireAttrChange(key);

      },


      get: function (key) {
        var val = this._attrs[key].value;

        if (Array.isArray(val) && val.each === undefined) {
          val.each = List.each;
        }

        return val;
      },


      propagateEventsTo: function (dest) {
        this._propagateEvents = dest;
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


    mergeProtos(own, Base.prototype);

    if (extension) {
      mergeProtos(extension.prototype, Base.prototype);
      Base.prototype.super = extension.prototype;
    }

    Base.prototype._initializers = _initializers;
    Base.prototype._destructors = _destructors;
    Base.prototype._attrs = _attrs;

    return Base;
  }


  var List = {
    each: function (array, callback, context) {
      for (var i = 0; i < array.length; i++) {
        callback.call(context, array[i]);
      }
    }
  };


  return Create;

});
