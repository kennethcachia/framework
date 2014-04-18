
define([

  'core/create',
  'svg/svg-shape-view',
  'svg/svg-types'

], function (Create, SVGShapeView, SVGTypes) {

  /**
   * SVGRect
   */
  var SVGRect = Create('SVGRect', {

    // TODO: replace by attr fn
    getSize: function () {
      return {
        width: this.get('data').width,
        height: this.get('data').height
      };
    },


    // TODO: replace by attr fn
    setPosition: function (x, y) {
      this.set('data.x', x);
      this.set('data.y', y);
    },


    _attrs: {
      data: {
        value: {
          x: null,
          y: null,
          width: null,
          height: null
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
