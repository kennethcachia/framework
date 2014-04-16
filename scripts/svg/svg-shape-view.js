
define([

  'core/create',
  'mv/view',
  'svg/svg-element'

], function (Create, View, SVGElement) {

  /**
   * SVGShape
   */
  var SVGShape = Create('SVGShape', {

    initializer: function () {
      // TODO: implement
      //this.on('xChange', this._setX, this);
      //this.on('yChange', this._setY, this);
      //this.on('styleChange', this._setStyle, this);
    },


    _attrs: {
      data: {
        x: null,
        y: null,
        style: null
      },

      container: null,
      containerType: SVGElement
    }

  }, View);


  return SVGShape;

});
