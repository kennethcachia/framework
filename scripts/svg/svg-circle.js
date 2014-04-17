
define([

  'core/create',
  'svg/svg-shape-view',
  'svg/svg-types'

], function (Create, SVGShape, SVGTypes) {

  /**
   * SVGCircle
   */
  var SVGCircle = Create('SVGCircle', {

    // TODO: replace by attr fn
    getSize: function () {
      return {
        width: this.get('data').radius * 2,
        height: this.get('data').radius * 2
      };
    },


    // TODO: replace by attr fn
    setPosition: function (x, y) {
      this.set('data.cx', x);
      this.set('data.cy', y);
    },


    _attrs: {
      data: {
        cx: null,
        cy: null,
        radius: null
      },

      container: '<circle cx="{{cx}}" cy="{{cy}}" r="{{radius}}" style="{{style}}"></circle>',
      type: SVGTypes.CIRCLE
    }

  }, SVGShape);


  return SVGCircle;

});
