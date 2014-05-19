
define([

  'core/create',
  'svg/svg',
  'svg/transformable-svg-bounding-box',
  'core/dom-element'

], function (Create, SVGView, SVGTransformableBoundingBox, DOMElement) {

  /**
   * Transformable SVG View
   */
  var TransformableSVGView = Create('TransformableSVGView', {

    destructor: function () {
      for (var e = 0; e < this._events.length; e++) {
        this._events[e].destroy();
      }

      this.deactivate();
    },


    bindEvents: function () {
      TransformableSVGView.super.bindEvents.call(this);

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

      this.on('rendered', this._onRendered, this);
    },


    activate: function (child) {
      this.deactivate();
      this._activeView = child;
      this._boundingBox = this.get('boundingBox');

      this.addChild(this._boundingBox, {
        after: child
      });

      this._resizeBoundingBox();
      this._alignBoundingBox();

      this.fire('shapeSelected', {
        shape: child
      });
    },


    deactivate: function () {
      if (this._boundingBox) {
        this._boundingBox.destroy();
        this._boundingBox = null;
        this._activeView = null;

        this.fire('shapeDeselected');
      }
    },


    _onRendered: function () {
      var container = this.get('container');

      container.addClass('svg--transformable');
    },


    _onTargetMouseDown: function (domElement, e) {
      var children = this.getRenderedChildren();

      var child;
      var childContainer;

      var chosen = false;

      if (!this._isBoundingBoxSelected(domElement, e)) {

        for (var c = 0; c < children.length; c++) {
          child = children[c];
          childContainer = child.get('container');

          if (childContainer.isEqualTo(domElement)) {
            this._calculateOffset(child, e);
            this.activate(child);

            chosen = true;
            break;
          }
        }

      } else {
        chosen = true;
      }

      if (!chosen) {
        this.deactivate();
      } else {
        this._mouseDown = true;  
      }
    },


    _isBoundingBoxSelected: function (domElement, e) {
      var isSelected = false;

      if (this._boundingBox) {
        var bbContainer = this._boundingBox.get('container');

        if (bbContainer.isEqualTo(domElement)) {
          isSelected = true;
          this._calculateOffset(this._boundingBox, e);
        }
      }

      return isSelected;
    },


    _calculateOffset: function (child, e) {
      var coords = child.get('position');

      this._offset = {
        x: e.layerX - coords.x,
        y: e.layerY - coords.y
      };
    },


    _onTargetMouseUp: function () {
      this._mouseDown = false;
    },


    _onTargetMouseMove: function (domElement, e) {
      if (this._mouseDown) {
        var pos = {
          x: e.layerX - this._offset.x,
          y: e.layerY - this._offset.y
        };

        this._activeView.set('position', pos);
        this._alignBoundingBox();
      }
    },


    _resizeBoundingBox: function () {
      var size = this._activeView.get('size');
      this._boundingBox.set('size', size);
    },


    _alignBoundingBox: function () {
      var pos = this._activeView.get('position');
      this._boundingBox.set('position', pos);
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
