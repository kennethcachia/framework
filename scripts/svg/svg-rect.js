
define([

  'core/create',
  'svg/svg-shape'

], function (Create, SVGShapeView) {

  /**
   * SVGRectView
   */
  var SVGRectView = Create('SVGRectView', {

    _attrs: {
      data: {
        value: {
          x: null,
          y: null,
          width: null,
          height: null
        }
      },

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

      position: {
        setter: function (pos) {
          this.set('data.x', pos.x);
          this.set('data.y', pos.y);
        },

        getter: function () {
          return {
            x: this.get('data').x,
            y: this.get('data').y
          };
        }
      },

      size: {
        setter: function (size) {
          this.set('data.width', size.width);
          this.set('data.height', size.height);
        },

        getter: function () {
          return {
            width: this.get('data').width,
            height: this.get('data').height
          };
        }
      },

      container: {
        value: '<rect x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" style="' +
                 '{{#fill}}fill:{{fill}};{{/fill}}' +
                 '{{#strokeWidth}}stroke-width:{{strokeWidth}};{{/strokeWidth}}' +
                 '{{#stroke}}stroke:{{stroke}};{{/stroke}}' +
               '"></rect>'
      }
    }

  }, SVGShapeView);


  return SVGRectView;

});
