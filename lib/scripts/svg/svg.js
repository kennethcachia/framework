
define([

  'lib/base/create',
  'lib/svg/svg-element', 
  'lib/mv/parent-view',
  'lib/svg/svg-type',
  'lib/svg/svg-rect',
  'lib/svg/svg-circle',
  'lib/svg/svg-path'

], function (Create, SVGElement, ParentView, SVGType, SVGRectView, SVGCircleView, SVGPathView) {

  /**
   * SVG View
   */
  var SVGView = Create('SVGView', {

    bindEvents: function () {
      SVGView.super.bindEvents.call(this);

      this.on('appendedView', this._onAppendedView, this);
    },


    getShapeByType: function (type) {
      var types = this.get('types');
      var shape;

      switch (type) {
        case types.RECT:
          shape = SVGRectView;
          break;

        case types.CIRCLE:
          shape = SVGCircleView;
          break;

        case types.PATH:
          shape = SVGPathView;
          break;
      }

      return shape;
    },


    addShape: function (shape) {
      var data = shape.data;
      var view = this.getShapeByType(data.type);

      return this.addChild({
        type: view,
        attrs: {
          data: data
        }
      });
    },


    _onAppendedView: function (e) {
      var shape = e.child;
      var data = shape.get('data');

      // We cannot rely on `position` as SVGCircle
      // offsets this value by its radius.
      if (data.x === null && data.y === null) {
        this._setDefaultPosition(shape);
      }
    },


    _setDefaultPosition: function (shape) {
      var container = this.get('container');

      var containerSize = container.getSize();
      var shapeSize = shape.get('size');

      var x = (containerSize.width - shapeSize.width) / 2;
      var y = (containerSize.height - shapeSize.height) / 2;

      shape.set('position', {
        x: x,
        y: y
      });
    },


    _attrs: {
      container: {
        value: null,

        default: function () {
          return new SVGElement();
        }
      },

      types: {
        value: null,

        default: function () {
          return SVGType;
        }
      }
    }

  }, ParentView);


  return SVGView;

});
