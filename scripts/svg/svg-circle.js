
define([

  'core/create',
  'svg/svg-shape-view',
  'svg/svg-types'

], function (Create, SVGShape, SVGTypes) {

  /**
   * SVGCircle
   */
  var SVGCircle = Create('SVGCircle', {

    _attrs: {
      data: {
        value: {
          cx: null,
          cy: null,
          radius: null
        }
      },

      position: {
        setter: function (pos) {
          this.set('data.cx', pos.x);
          this.set('data.cy', pos.y);
        },

        getter: function () {
          var radius = this.get('data').radius;

          return {
            x: this.get('data').cx - radius,
            y: this.get('data').cy - radius
          };
        }
      },

      size: {
        setter: function (size) {
          this.set('data.radius', size.width / 2);
        },

        getter: function () {
          return {
            width: this.get('data').radius * 2,
            height: this.get('data').radius * 2
          };
        }
      },

      container: {
        value: '<circle cx="{{cx}}" cy="{{cy}}" r="{{radius}}" style="{{style}}"></circle>'
      },

      type: {
        value: SVGTypes.CIRCLE
      }
    }

  }, SVGShape);


  return SVGCircle;

});
