
define([

  'core/create',
  'svg/svg-view',
  'svg/transformable-svg-bounding-box',
  'core/dom-element'

], function (Create, SVGView, SVGTransformableBoundingBox, DOMElement) {

  /**
   * Transformable SVG View
   */
  var TransformableSVGView = Create('TransformableSVGView', {

    initializer: function () {
      this._bindEvents();
    },


    destructor: function () {
      for (var e = 0; e < this._events.length; e++) {
        this._events[e].destroy();
      }

      this._deactivate();
    },


    _bindEvents: function () {
      var container = this.get('container');

      this._events = [];

      this._events.push(container.addDOMEvent({
        eventName: 'mousedown',
        callback: '_onTargetMouseDown',
        context: this
      }));

      this._events.push(container.addDOMEvent({
        eventName: 'mouseup',
        callback: '_onTargetMouseUp',
        context: this
      }));

      this._events.push(container.addDOMEvent({
        eventName: 'mousemove',
        callback: '_onTargetMouseMove',
        context: this
      }));
    },


    _onTargetMouseDown: function (domElement, e) {
      var children = this.getRenderedChildren();

      var child;
      var childContainer;

      for (var c = 0; c < children.length; c++) {
        child = children[c];
        childContainer = child.get('container');

        if (childContainer.isEqualTo(domElement)) {
          this._activate(child);
          break;
        }
      }

      if (!this._activeView) {
        this._deactivate();
      }
    },


    _activate: function (child) {
      console.log('down');

      this._deactivate();
      this._activeView = child;
      this._boundingBox = this.get('boundingBox');

      this.addChild(this._boundingBox);

      this._boundingBox.align(child);
    },


    _deactivate: function () {
      if (this._boundingBox) {
        this._boundingBox.destroy();
      }
    },


    _onTargetMouseUp: function () {
      this._activeView = null;
      console.log('up');
    },


    _onTargetMouseMove: function (domElement, e) {
      console.log('move');

      if (this._activeView) {
        this._activeView.set('position', {
          x: e.layerX,
          y: e.layerY
        });

        // TODO: Align automatically on data change.
        this._boundingBox.align(this._activeView);
      }
    },


    _attrs: {
      boundingBox: {
        getter: function () {
          return new SVGTransformableBoundingBox();
        }
      }
    }

  }, SVGView);


  return TransformableSVGView;

});
