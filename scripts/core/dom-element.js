
define([

  'core/create',
  'core/dom',
  'core/dom-event'

], function (Create, DOM, DOMEvent) {

  /**
   * Wrapper for an HTML Node
   */
  var DOMElement = Create('DOMElement', {

    initializer: function () {
      this._setNode();

      this.on('selectorChange', this._setNode, this);
      this.on('htmlChange', this._setNode, this);

      this._domEvents = [];
    },


    destructor: function () {
      this._destroyDOMEvents();
      this._node.remove();
    },


    setStyle: function (key, value) {
      DOM.setStyle(this._node, key, value);
    },


    one: function (selector) {
      var node = DOM.one(selector, this._node);

      var elem = new DOMElement();
      elem.fromNode(node);

      return elem;
    },


    appendChild: function (child) {
      DOM.appendChild(this._node, child._node);
    },


    removeChild: function (child) {
      DOM.removeChild(this._node, child._node);
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


    removeClass: function (className) {
      DOM.removeClass(this._node, className);
    },


    hasClass: function (className) {
      return DOM.hasClass(this._node, className);
    },


    addDOMEvent: function (e) {
      e.source = this._node;

      var domEvent = new DOMEvent(e);
      this._domEvents.push(domEvent);

      return domEvent;
    },


    getArea: function () {
      return this._node.getBoundingClientRect;
    },


    setOnNode: function (key, value) {
      this._node[key] = value;
    },


    getAttribute: function (key) {
      return this._node.getAttribute(key);
    },


    setAttribute: function (key, value) {
      this._node.setAttribute(key, value);
    },


    isEqualTo: function (check) {
      return (this._node === check._node);
    },


    _destroyDOMEvents: function () {
      var events = this._domEvents;

      for (var e = 0; e < events.length; e++) {
        events[e].destroy();
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


  return DOMElement;

});
