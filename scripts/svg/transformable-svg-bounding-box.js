
define([

  'core/create',
  'svg/svg-rect'

], function (Create, SVGRect) {

  /**
   * Transformable SVG Bounding Box
   */
  var TransformableSVGBoundingBox = Create('TransformableSVGBoundingBox', {

    align: function (view) {
      this.set('position', view.get('position'));
      this.set('size', view.get('size'));
    },


    _attrs: {
      data: {
        value: {
          style: 'stroke:cyan; stroke-width:5; fill:transparent'
        }
      }
    }

  }, SVGRect);


  return TransformableSVGBoundingBox;

});
