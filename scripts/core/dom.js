
define(['core/create'], function (Create) {

  /**
   * DOM interactions
   */
  var DOM = {

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


    removeChild: function (parent, child) {
      parent.removeChild(child);
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


    off: function (element, eventName, pointer) {
      element.removeEventListener(eventName, pointer, true);
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


  return DOM;

});
