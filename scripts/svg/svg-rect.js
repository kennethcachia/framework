
define([

  'base/create',
  'svg/svg-shape'

], function (Create, SVGShapeView) {

  /**
   * SVGRectView
   */
  var SVGRectView = Create('SVGRectView', {

    _attrs: {
      dataBindings: {
        value: [
          {
            key: 'x',
            attribute: 'x'
          },
          {
            key: 'y',
            attribute: 'y'
          },
          {
            key: 'width',
            attribute: 'width'
          },
          {
            key: 'height',
            attribute: 'height'
          }
        ]
      },

      container: {
        value: '<rect x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" />'
      }
    }

  }, SVGShapeView);


  return SVGRectView;

});
