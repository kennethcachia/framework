
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

    initializer: function () {
      var container = this.get('container');

      if (!container) {
        container = new SVGElement();
        this.set('container', container);
      }

      this.on('appendedView', function (e) {
        var child = e.child;
        var container = child.get('container');
        this._positionShape(child);
      }, this);
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


    _positionShape: function (child) {
      var container = this.get('container');

      var size = container.getSize();
      var childSize = child.get('size');

      var x = (size.width - childSize.width) / 2;
      var y = (size.height - childSize.height) / 2;

      child.set('position', {
        x: x,
        y: y
      });
    },


    _attrs: {
      container: {
        value: null
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
