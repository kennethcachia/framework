
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
      this.on('dataChange', this._syncAttribute, this);
    },


    _syncAttribute: function () {
      var container = this.get('container');
      var data = this.get('data');

      if (this._rendered) {
        for (var d in data) {
          if (data[d] && container._node.hasOwnProperty(d)) {
            container.setAttribute(d, data[d]);
          }
        }
      }
    },


    _attrs: {
      data: {
        value: {
          style: null,
          type: null
        }
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
