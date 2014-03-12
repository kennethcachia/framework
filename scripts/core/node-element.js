
define(['core/create', 'core/dom', 'core/dom-event'], function (Create, DOM, DOMEvent) {

  /**
   * Wrapper for an HTML Node
   */
  var NodeElement = Create('NodeElement', {

    initializer: function () {
      this._setNode();

      this.on('selectorChange', this._setNode, this);
      this.on('htmlChange', this._setNode, this);

      this._domEvents = [];
    },


    destructor: function () {
      this._destroyDOMEvents();
      this._node = null;

      // TODO: Kill children?
    },


    setStyle: function (key, value) {
      // TODO: allow object
      DOM.setStyle(this._node, key, value);
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


    addDOMEvent: function (e) {
      e.source = this._node;

      var domEvent = new DOMEvent(e);
      this._domEvents.push(domEvent);

      return domEvent;
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


  return NodeElement;

});
