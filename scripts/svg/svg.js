
define([

  'core/create',
  'svg/svg-element', 
  'mv/parent-view',
  'svg/svg-types',
  'svg/svg-rect',
  'svg/svg-circle'

], function (Create, SVGElement, ParentView, SVGTypes, SVGRectView, SVGCircleView) {

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
      }

      return shape;
    },


    addShape: function (shape) {
      var data = shape.data;
      var view = this.getShapeByType(data.type);

      return this.addChild({
        view: view,
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
          return SVGTypes;
        }
      }
    }

  }, ParentView);


  return SVGView;

});
