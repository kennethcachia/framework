
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
      if (this._rendered) {
        var x = this.get('data').x;
        var y = this.get('data').y;
        var style = this.get('data').style;

        var container = this.get('container');

        container.setAttribute('x', x);
        container.setAttribute('y', y);
        container.setAttribute('style', style);
      }
    },


    _attrs: {
      data: {
        x: null,
        y: null,
        style: null,
        type: null
      },

      container: null,
      containerType: SVGElement
    }

  }, View);


  return SVGShape;

});
