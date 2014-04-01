
define(function () {

  /**
   * OOP
   * 
   * @param {String} name
   * @param {Object} own
   * @param {Object} extension
   */
  function Create(name, own, extension) {

    function mergeObjects(a, b) {
      a = Object.create(a);
      b = Object.create(b);

      for (var o in a) {
        if (a[o] !== undefined && a[o] !== null) {

          // TODO: fix this - required but breaks Nodes
          /*if (typeof a[o] === 'object' && !Array.isArray(a[o]) &&
              typeof b[o] === 'object' && !Array.isArray(b[o])) {
            b[o] = mergeObjects(a[o], b[o]);
          } else {*/
            b[o] = a[o];
          //}
        }
      }

      return b;
    }


    function mergeProtos(src, dest) {
      for (var s in src) {
        if (s === 'initializer') {
          _initializers.push(src[s]);
        } else if (s === 'destructor') {
          _destructors.push(src[s]);
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
      attrs = attrs || {};
      attrs.id = attrs.id || null;

      // Private objects
      this._propagateEvents = null;
      this._name = name;
      this._listeners = {};

      // Init
      this._init(attrs);
      this._callInitializers();

      for (var a in attrs) {
        this._fireAttrChange(a);
      }
    };


    Base.prototype = {

      destroy: function () {
        this._callDestructors();
        this._destroyEvents();
      },


      fire: function (eventName, data) {
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
        if (stopPropagation !== true) {
          var propagateEvents = this._propagateEvents;
          var suffix = '|';

          if (propagateEvents) {

            if (eventName.indexOf(suffix) === -1) {
              suffix += this.get('id') || this._name;
              eventName = eventName + suffix;
            }

            propagateEvents.fire(eventName, data);
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

          this._attrs[key] = value;

        } else {

          var pos = key.indexOf('.');
          var obj = key.substr(0, pos);
          var index = key.substr(pos + 1);

          this._attrs[obj][index] = value;

          // Fire event on key name
          key = obj;

        }

        this._fireAttrChange(key);

      },


      get: function (key) {
        var val = this._attrs[key];

        if (Array.isArray(val) && val.each === undefined) {
          val.each = List.each;
        }

        return val;
      },


      propagateEventsTo: function (dest) {
        this._propagateEvents = dest;
      },


      _init: function (attrs) {
        if (attrs) {
          this._attrs = mergeObjects(attrs, this._attrs);
        }
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