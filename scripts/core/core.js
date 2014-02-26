
/*
  TODO: circular deps?
 */

/*
 * Extend objects
 */
function Create(name, own, extension) {

  /*
   * Merge a into b
   */
  function mergeObjects(a, b) {
    a = Object.create(a);
    b = Object.create(b);

    for (var o in a) {
      b[o] = a[o];
    }

    return b;
  }


  /*
   * Merge prototypes, but take special
   * care of initializer() and
   * destructor() methods
   */
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

      data = data || {};
      data.source = data.source || this;

      if (listeners) {
        var listener;

        for (var l = 0; l < listeners.length; l++) {
          listener = listeners[l];
          listener.callback.call(listener.context, data);
        }
      }

      // Pass it on
      var propagateEvents = this._propagateEvents;
      var suffix = '|';

      if (propagateEvents) {

        if (eventName.indexOf(suffix) === -1) {
          suffix += this.get('id') || this._name;
          eventName = eventName + suffix;
          //console.log(eventName);
        }

        propagateEvents.fire(eventName, data);
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
      this._attrs[key] = value;
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


/*
 * List
 */
// TODO: maybe add to certain objects to Base
// depending on their type?
var List = {

  each: function (array, callback, context) {
    for (var i = 0; i < array.length; i++) {
      callback.call(context, array[i]);
    }
  }

};

/*var List = Create({

  initializer: function () {
    this.on('itemsChange', function () {
      console.log('something changed');
    });
  },


  each: function (callback, context) {
    var items = this.get('items');

    for (var i = 0; i < items.length; i++) {
      callback.call(context, items[i]);
    }
  },


  _attrs: {
    items: []
  }

});*/


/*
 * Interactions with the DOM
 */
var DOM = {

  /*body: function () {
    var b = new NodeElement();
    b.fromNode(document.body);
    return b;
  },*/


  create: function (html, namespaceURI) {
    namespaceURI = namespaceURI || 'http://www.w3.org/1999/xhtml';

    // TODO: Can we avoid 'div' here?
    var wrapper = document.createElementNS(namespaceURI, 'div');
    wrapper.innerHTML = html;

    return wrapper.firstChild;
  },


  appendChild: function (parent, child) {
    parent.appendChild(child);
  },


  one: function (selector, parent) {
    return this._query(selector, parent);
  },


  all: function (selector, parent) {
    return this._query(selector, parent, true);
  },


  ready: function (callback, context) {
    this.on(document, 'DOMContentLoaded', callback, context);
  },


  on: function (element, eventName, callback, context) {
    var pointer = callback.bind(context);
    element.addEventListener(eventName, pointer, true);
    return pointer;
  },


  off: function () {
    // todo
  },


  addClass: function (element, className) {
    element.classList.add(className);
  },


  _query: function (selector, parent, list) {
    var operation = 'querySelector';

    parent = parent || document;

    if (list === true) {
      operation += 'All';
    }

    return parent.querySelector(selector);
  }

};


/*
 * Wrapper for HTML Node
 */
var NodeElement = Create('NodeElement', {

  initializer: function () {
    this._setNode();
    this.on('selectorChange', this._setNode, this);
    this.on('htmlChange', this._setNode, this);
  },


  one: function (selector) {
    var node = DOM.one(selector, this._node);

    // TODO: use this constructor
    var elem = new NodeElement();

    elem.fromNode(node);
    return elem;
  },


  appendChild: function (child) {
    DOM.appendChild(this._node, child._node);
  },


  all: function (selector) {
    return DOM.all(selector, this._node);
  },


  fromNode: function (node) {
    this._node = node;
  },


  setInnerHTML: function (html) {
    this._node.innerHTML = html;
  },


  addClass: function (className) {
    DOM.addClass(this._node, className);
  },


  delegate: function (selector, eventName, callback, context) {

    DOM.on(this._node, eventName, function (e) {
      this._delegator.call(context, e, this._node, selector, callback);
    }, this);

  },


  _delegator: function (e, node, selector, callback) {
    if (!this[callback]) {
      throw 'Callback does not exist - ' + callback;
    } else if (e.target === node || DOM.one(selector, node) === e.target) {
      this[callback](e);
    }

  },


  _setNode: function () {
    //var selector = this.get('selector');
    var ns = this.get('namespaceURI');
    var html = this.get('html');

    if (html) {
      this._node = DOM.create(html, ns);
    }/* else {
      this._node = DOM.one(selector);
    }*/
  },


  _attrs: {
    namespaceURI: null,
    //selector: null,
    html: null
  }

});


/*
 * Main application
 * wrapper
 */
var App = Create('App', {

  initializer: function () {
    console.log(this.get('name'));
    console.log('(version ' + this.get('version') + ')');

    var domReady = this.get('domReady');
    domReady = domReady && this[domReady];

    if (domReady) {
      DOM.ready(domReady, this);
    }
  },


  _attrs: {
    name: null,
    version: '1.0.0',
    domReady: null
  }

});



/*

  Maybes
  ------

  - Widget

*/
