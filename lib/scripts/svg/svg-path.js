
define([

  'lib/base/create',
  'lib/svg/svg-shape'

], function (Create, SVGShapeView) {

  /**
   * SVGPathView
   */
  var SVGPathView = Create('SVGPathView', {

    _attrs: {
      data: {
        value: {
          pathData: null
        }
      },

      dataBindings: {
        value: [
          {
            key: 'x',
            attribute: 'transform',
            setElementValue: function () {
              return this.translate();
            }
          },
          {
            key: 'y',
            attribute: 'transform',
            setElementValue: function () {
              return this.translate();
            }
          }
        ]
      },

      container: {
        value: '<path d="{{pathData}}" />'
      }
    }

  }, SVGShapeView);


  return SVGPathView;

});
