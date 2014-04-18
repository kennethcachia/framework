
define([

  'core/create',
  'svg/svg-element', 
  'mv/parent-view',
  'svg/svg-types',
  'svg/svg-rect',
  'svg/svg-circle'

], function (Create, SVG, ParentView, SVGTypes, SVGRect, SVGCircle) {

  /**
   * SVG View
   */
  var SVGView = Create('SVGView', {

    initializer: function () {
      var container = this.get('container');

      if (!container) {
        container = new SVG();
        this.set('container', container);
      }

      this.on('appendedView', function (e) {
        var child = e.child;
        var container = child.get('container');

        container.addClass('svg-shape');
        this._positionShape(child);
      }, this);
    },


    addShape: function (shape) {
      var data = shape.data;
      var view;

      switch (data.type) {
        case SVGTypes.RECT:
          view = SVGRect;
          break;

        case SVGTypes.CIRCLE:
          view = SVGCircle;
          break;
      }

      this.addChild({
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
      }
    }

  }, ParentView);


  return SVGView;

});
