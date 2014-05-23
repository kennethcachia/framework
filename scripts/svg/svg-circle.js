
define([

  'base/create',
  'svg/svg-shape'

], function (Create, SVGShapeView) {

  /**
   * SVGCircleView
   */
  var SVGCircleView = Create('SVGCircleView', {

    _attrs: {
      data: {
        value: {
          cx: null,
          cy: null,
          radius: null
        }
      },

      dataBindings: {
        value: [
          {
            key: 'cx',
            attribute: 'cx'
          },
          {
            key: 'cy',
            attribute: 'cy'
          },
          {
            key: 'radius',
            attribute: 'r'
          }
        ]
      },

      position: {
        setter: function (pos) {
          var radius = this.get('data').radius;

          this.set('data.cx', pos.x + radius);
          this.set('data.cy', pos.y + radius);
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
        }
      },

      container: {
        value: '<circle cx="{{cx}}" cy="{{cy}}" r="{{radius}}" />'
      }
    }

  }, SVGShapeView);


  return SVGCircleView;

});
