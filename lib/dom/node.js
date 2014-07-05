/**
 * @module lib/dom/node
 */
define([

  'lib/events/eventable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check',
  'lib/base/properties'

], function (Eventable, inherit, Assert, Check, Properties) {

  /**
   * Wraps a Node.
   *
   * @alias module:lib/dom/node
   * @class
   * @extends Eventable
   * @param {String|Node} input A selector or a Node.
   */
  var DOMNode = function (input) {
    DOMNode.superClass.call(this);

    this._initNode(input);

    Properties.defineMutableAccessor(this, 'innerHTML',
      this._node.innerHTML, this._getInnerHTML, this._setInnerHTML);
  };

  inherit(DOMNode, Eventable);


  /**
   * @default ''
   * @property {String} innerHTML The node's inner HTML.
   */
  DOMNode.prototype.innerHTML = '';


  /**
   * Returns a DOMNode that matches
   * a given selector.
   *
   * @method
   * @param {String} selector The selector to match.
   * @returns {DOMNode|null} A DOMNode if found.
   */
  DOMNode.prototype.one = function (selector) {
    var node = this._node.querySelector(selector);
    var domNode = null;

    if (Check.not.isNull(node)) {
      domNode = new DOMNode(node);
    }

    return domNode;
  };


  /**
   * Returns an array of DOMNodes that
   * match a given selector.
   * 
   * @method
   * @param {String} selector The selector to match.
   * @returns {Array|null} An array of DOMNodes if found.
   */
  DOMNode.prototype.all = function (selector) {
    var nodeList = this._node.querySelectorAll(selector);
    var domNodes = null;

    if (Check.not.isNull(nodeList)) {
      domNodes = [];

      for (var n = 0; n < nodeList.length; n++) {
        domNodes.push(new DOMNode(nodeList[n]));
      }
    }

    return domNodes;
  };


  /**
   * Getter for innerHTML.
   *
   * @method
   * @private
   * @return {String} innerHTML's value.
   */
  DOMNode.prototype._getInnerHTML = function () {
    var val = '';

    if (Check.not.isNull(this._node)) {
      val = this._node.innerHTML;
    }

    return val;
  };


  /**
   * Setter for innerHTML.
   *
   * @method
   * @private
   * @param {String} val The new value.
   */
  DOMNode.prototype._setInnerHTML = function (val) {
    Assert.isString(val);

    if (Check.not.isNull(this._node)) {
      this._node.innerHTML = val;
    }

    return val;
  };


  /**
   * Set the internal reference to the Node.
   * 
   * @method
   * @private
   * @param {String|Node} input A selector or a Node.
   */
  DOMNode.prototype._initNode = function (input) {
    if (Check.not.isString(input)) {
      Assert.isInstanceOf(input, Node);
      this._node = input;
    } else {
      this._node = document.querySelector(input);

      if (Check.isNull(this._node)) {
        throw new Error('Node not found');
      }
    }
  };


  /* override */
  DOMNode.prototype.destructor = function () {
    this._node.remove();
    this._node = null;

    DOMNode.super.destructor.call(this);
  };


  return DOMNode;

});