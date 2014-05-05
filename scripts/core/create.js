
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


    function mergeArrays(a, b) {
      var concat = a.concat(b);

      // Dedupe
      // TODO: improve?
      for (var i = 0; i < concat.length; i++) {
        for (var j = i + 1; j < concat.length; j++) {
          if (concat[i] === concat[j]) {
            concat.splice(j--, 1);
          }
        }
      }

      return concat;
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

            if (Array.isArray(merged[key]) && Array.isArray(na[key])) {
              merged[key] = mergeArrays(merged[key], na[key]);
            } else {
              merged[key] = na[key];
            }
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

      // Call default() if not defined
      var attrValue;
      var attrDefault;

      for (var a in this._attrs) {
        attrValue = this._attrs[a].value;
        attrDefault = this._attrs[a].default;

        if (attrDefault && (attrValue === null || attrValue === undefined)) {
          this._attrs[a].value = this._attrs[a].default.call(this);
        }
      }

      this._callInitializers();

      /*for (var a in this._attrs) {
        this._fireAttrChange(a);
      }*/

      this.fire('initReady');
    };


    Base.prototype = {

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

          this._set(this._attrs, key, value);

        } else {

          var pos = key.indexOf('.');
          var obj = key.substr(0, pos);
          var index = key.substr(pos + 1);

          this._attrs[obj].value[index] = value;

          // Fire event data.*Change
          this._fireAttrChange(key)

          // Update key to fire dataChange event
          key = obj;
        }

        this._fireAttrChange(key);

      },


      getName: function () {
        return this._name;
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


      _set: function (attrs, key, value) {
        // Allow attributes to be 
        // added dynamically
        if (!attrs[key]) {
          attrs[key] = {};
        }

        if (attrs[key].setter) {
          attrs[key].value = attrs[key].setter.call(this, value);
        } else {
          attrs[key].value = value;
        }
      },


      get: function (key) {
        var val = null;

        if (this._attrs[key]) {
          var getter = this._attrs[key].getter;

          if (getter) {
            val = getter.call(this);
          } else {
            val = this._attrs[key].value;
          }
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


  return Create;

});
