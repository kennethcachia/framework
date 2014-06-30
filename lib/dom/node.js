/**
 * @module lib/dom/node
 */
define([

  'lib/base/abstract-destructable',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/base/check'

], function (AbstractDestructable, inherit, Assert, Check) {

  /**
   * Wraps a Node.
   *
   * @alias module:lib/dom/node
   * @class
   * @extends AbstractDestructable
   * @param {String|Node} input A selector or a Node.
   */
  var DOMNode = function (input) {
    DOMNode.superClass.call(this);

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

  inherit(DOMNode, AbstractDestructable);


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
   * Appends a DOMNode.
   *
   * @method
   * @param {DOMNode} child The DOMNode to be appended.
   */
  DOMNode.prototype.append = function (child) {
    Assert.isInstanceOf(child, DOMNode);

    this._node.appendChild(child._node);
    this.addObjectToDestroy(child);
  };


  /* override */
  DOMNode.prototype.destructor = function () {
    this._node.remove();
    this._node = null;
  };


  return DOMNode;

});