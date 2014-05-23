
define([

  'base/create',
  'dom/dom',
  'core/object-array',
  'dom/dom-event'

], function (Create, DOM, ObjectArray, DOMEvent) {

  /**
   * DOMElement
   */
  var DOMElement = Create('DOMElement', {

    initializer: function () {
      this._setNode();

      this.on('selectorChange', this._setNode, this);
      this.on('htmlChange', this._setNode, this);

      this._domEvents = new ObjectArray({
        defaultType: DOMEvent
      });
    },


    destructor: function () {
      this._domEvents.destroy();
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


    insertAfter: function (after) {
      DOM.insertAdjacentElement(after._node, this._node, 'afterEnd');
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

      return this._domEvents.add(e);
    },


    getSize: function () {
      var width = this._node.clientWidth;
      var height = this._node.clientHeight;

      return {
        width: width,
        height: height
      };
    },


    getArea: function () {
      return this._node.getBoundingClientRect();
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


    asString: function () {
      var ns = this.get('namespaceURI');

      var wrapper = DOM.create('<div></div>', ns);
      var clone = DOM.create(this._node.outerHTML, ns);

      clone.innerHTML = this._node.innerHTML;

      DOM.appendChild(wrapper, clone);

      return wrapper.innerHTML;
    },


    _setNode: function () {
      var ns = this.get('namespaceURI');
      var html = this.get('html');

      if (html) {
        this._node = DOM.create(html, ns);
      }
    },


    _attrs: {
      namespaceURI: {
        value: null
      },

      html: {
        value: null
      }
    }

  });


  return DOMElement;

});
