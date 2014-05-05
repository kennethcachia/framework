
define([

  'core/create',
  'mv/view',
  'svg/svg-element'

], function (Create, View, SVGElement) {

  /**
   * SVGShape
   */
  var SVGShape = Create('SVGShape', {

    _updateStyle: function () {
      var data = this.get('data');

      var fill = data.fill;
      var strokeWidth = data.strokeWidth;
      var stroke = data.stroke;

      var style = '';

      style += this._appendStyle('fill', fill);
      style += this._appendStyle('stroke-width', strokeWidth);
      style += this._appendStyle('stroke', stroke);

      return style;
    },


    _appendStyle: function (label, value) {
      return label + ': ' + value + ';';
    },


    _attrs: {
      data: {
        value: {
          fill: null,
          strokeWidth: 0,
          stroke: null,
          type: null
        }
      },

      dataBindings: {
        value: [
          {
            key: 'fill',
            attribute: 'style',
            setElementValue: function () {
              return this._updateStyle();
            }
          },
          {
            key: 'stroke',
            attribute: 'style',
            setElementValue: function () {
              return this._updateStyle();
            }
          },
          {
            key: 'strokeWidth',
            attribute: 'style',
            setElementValue: function () {
              return this._updateStyle();
            }
          }
        ]
      },

      position: {
        setter: function (pos) {},
        getter: function () {}
      },

      size: {
        setter: function (size) {},
        getter: function () {}
      },

      container: {
        value: null
      },

      containerType: {
        value: SVGElement
      }
    }

  }, View);


  return SVGShape;

});
