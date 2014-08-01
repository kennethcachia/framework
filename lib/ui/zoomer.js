/**
 * @module lib/ui/zoomer
 */
define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/dom/node',
  'lib/base/assert'

], function (Base, inherit, DOMNode, Assert) {

  /**
   * Zooms a DOMNode in and out.
   * 
   * @alias module:lib/ui/zoomer
   * @class
   * @extends Base
   * @param {String} selector
   *        The selector for the DOMNode that will be scaled.
   */
  function Zoomer(selector) {
    Assert.isString(selector);

    this._node = new DOMNode(selector);
    this._scale = 1;
    this._step = 0.2;

    Zoomer.superClass.call(this, this.template, {});
  }

  inherit(Zoomer, Base);


  /**
   * Zooms in or out.
   *
   * @method
   * @private
   * @param {Boolean} zoomIn Zooms in if true, out otherwise.
   */
  Zoomer.prototype._zoom = function (zoomIn) {
    this._scale += zoomIn ? this._step : -this._step;

    this._validate();
    this._updateDOMNode();
    this._updateScale();
  };


  /**
   * Restricts scale within the range [0.4 .. 2].
   * 
   * @method
   * @private
   */
  Zoomer.prototype._validate = function () {
    this._scale = Math.min(2, Math.max(0.4, this._scale));
  };


  /**
   * Updates the node to reflect the current scale value.
   *
   * @method
   * @private
   */
  Zoomer.prototype._updateDOMNode = function () {
    // TODO: improve + prefix.
    this._node._node.style.transform = 'scale(' + this._scale + ')';
  };


  /**
   * Updates the scale percentage.
   *
   * @method
   * @private
   */
  Zoomer.prototype._updateScale = function () {
    var value = this.findDOMNodes('.zoomer-scale-value');
    var percentage = Math.round(this._scale * 100);

    value.innerHTML = percentage + '%';
  };


  /* override */
  Zoomer.prototype.template = 
    '<div class="zoomer">' +
      '<div class="zoomer-scale zoomer-scale-in"></div>' +
      '<div class="zoomer-scale zoomer-scale-out"></div>' +
      '<div class="zoomer-scale zoomer-scale-value"></div>' +
    '</div>';


  /* override */
  Zoomer.prototype.bindEvents = function () {
    this.onDOMEvent(
      'click', this._zoom.bind(this, true), this, '.zoomer-scale-in');

    this.onDOMEvent(
      'click', this._zoom.bind(this, false), this, '.zoomer-scale-out');

    this.after('ready', this._updateScale, this);
  };


  /* override */
  Zoomer.prototype.destructor = function () {
    this._scale = null;
    this._step = null;

    // TODO: destroy this._node. Reference vs Node?

    Zoomer.super.destructor.call(this);
  };


  return Zoomer;

});