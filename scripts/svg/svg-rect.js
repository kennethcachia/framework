
define([

  'core/create',
  'svg/svg-shape-view',
  'svg/svg-types'

], function (Create, SVGShapeView, SVGTypes) {

  /**
   * SVGRect
   */
  var SVGRect = Create('SVGRect', {

    _attrs: {
      data: {
        value: {
          x: null,
          y: null,
          width: null,
          height: null
        }
      },

      position: {
        setter: function (pos) {
          this.set('data.x', pos.x);
          this.set('data.y', pos.y);
        },

        getter: function () {
          return {
            x: this.get('data').x,
            y: this.get('data').y
          };
        }
      },

      size: {
        setter: function (size) {
          this.set('data.width', size.width);
          this.set('data.height', size.height);
        },

        getter: function () {
          return {
            width: this.get('data').width,
            height: this.get('data').height
          };
        }
      },

      container: {
        value: '<rect x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" style="{{style}}"></rect>'
      },

      type: {
        value: SVGTypes.RECT
      }
    }

  }, SVGShapeView);


  return SVGRect;

});
