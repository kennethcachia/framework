
define([

  'lib/base/create',
  'lib/mv/view',
  'lib/svg/svg-element'

], function (Create, View, SVGElement) {

  /**
   * SVGShapeView
   */
  var SVGShapeView = Create('SVGShapeView', {

    initializer: function () {
      this._addCoreAttributes();
    },


    // Gets the bounding box, in current user space,
    // of the geometry of all contained graphics elements.
    getBoundingBox: function () {
      var container = this.get('container');
      var bbox = container._node.getBBox();

      return bbox;
    },


    translate: function () {
      var container = this.get('container');
      var translate = this.getTranslate();

      container.setAttribute('transform', translate);
    },


    getTranslate: function () {
      var data = this.get('data');
      var bb = this.getBoundingBox();

      var x = data.x - bb.x;
      var y = data.y - bb.y;

      var translate = 'translate(' + x + ',' + y + ')';

      return translate;
    },


    _addCoreAttributes: function () {
      var attributes = [];

      attributes.push({
        name: 'style',
        value: this._updateStyle()
      });

      var attr = this._flattenAttributes(attributes);

      this._writeAttributes(attr);
    },


    _flattenAttributes: function (attributes) {
      var attr;
      var flat = '';

      for (var a = 0; a < attributes.length; a++) {
        attr = attributes[a];

        if (attr.value) {
          flat += ' ' + attr.name + '="' + attr.value + '"';
        }
      }

      return flat;
    },


    _writeAttributes: function (attributes) {
      var container = this.get('container');

      var closing = /\/>|>/;
      var pos = container.search(closing) - 1;

      var prefix = container.slice(0, pos);
      var suffix = container.slice(pos);

      container = prefix + attributes + suffix;

      this.set('container', container);
    },


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
      var str = '';

      if (value) {
        str = label + ':' + value + '; ';
      }

      return str;
    },


    _attrs: {
      data: {
        value: {
          x: null,
          y: null,
          width: null,
          height: null,

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
          var bb = this.getBoundingBox();

          return {
            width: bb.width,
            height: bb.height
          };
        }
      },

      container: {
        value: null
      },

      containerType: {
        value: SVGElement
      }
    }

  }, View);


  return SVGShapeView;

});
