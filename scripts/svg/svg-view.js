
define([

  'core/create',
  'svg/svg-element', 
  'mv/parent-view',
  'svg/svg-types',
  'svg/svg-rect'

], function (Create, SVG, ParentView, SVGTypes, SVGRect) {

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
      });
    },


    addShape: function (shape) {
      var data = shape.data;
      var view;

      if (data.type === SVGTypes.RECT) {
        view = SVGRect;
      }

      this._positionShape(data);

      this.addChild({
        view: view,
        attrs: {
          data: data
        }
      });
    },


    _positionShape: function (data) {
      var container = this.get('container');

      var size = container.getSize();
      var x = (size.width - data.width) / 2;
      var y = (size.height - data.height) / 2;

      data.x = x;
      data.y = y;
    },


    _attrs: {
      container: null
    }

  }, ParentView);


  return SVGView;

});
