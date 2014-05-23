
define([

  'base/create',
  'svg/svg-rect'

], function (Create, SVGRectView) {

  /**
   * TransformableSVGBoundingBoxView
   */
  var TransformableSVGBoundingBoxView = Create('TransformableSVGBoundingBoxView', {

    _attrs: {
      data: {
        value: {
          stroke: 'cyan',
          strokeWidth: 5,
          fill: 'transparent'
        }
      }
    }

  }, SVGRectView);


  return TransformableSVGBoundingBoxView;

});
