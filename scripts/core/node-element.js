
define(['core/create'], function (Create) {

  /**
   * DOM interactions
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


  /**
   * Wrapper for an HTML Node
   */
  var NodeElement = Create('NodeElement', {

    initializer: function () {
      this._setNode();
      this.on('selectorChange', this._setNode, this);
      this.on('htmlChange', this._setNode, this);
    },


    one: function (selector) {
      var node = DOM.one(selector, this._node);

      // TODO: use _this_ constructor
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
      var ns = this.get('namespaceURI');
      var html = this.get('html');

      if (html) {
        this._node = DOM.create(html, ns);
      }
    },


    _attrs: {
      namespaceURI: null,
      html: null
    }

  });


  return NodeElement;

});
