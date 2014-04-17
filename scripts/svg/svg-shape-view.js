
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
          if (container._node.hasOwnProperty(d)) {
            container.setAttribute(d, data[d]);
          }
        }
      }
    },


    _attrs: {
      data: {
        style: null,
        type: null
      },

      container: null,
      containerType: SVGElement
    }

  }, View);


  return SVGShape;

});
