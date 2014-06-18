
define([

  'lib/base/create',
  'lib/svg/svg-rect'

], function (Create, SVGRectView) {

  /**
   * TransformableSVGBoundingBoxView
   */
  var TransformableSVGBoundingBoxView = Create('TransformableSVGBoundingBoxView', {

    _attrs: {
      data: {
        value: {
          stroke: 'blue',
          strokeWidth: 1,
          fill: 'transparent'
        }
      },

      isBoundingBox: {
        value: true
      }
    }

  }, SVGRectView);


  return TransformableSVGBoundingBoxView;

});
