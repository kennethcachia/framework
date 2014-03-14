
define(['core/create', 'svg/svg-element'], function (Create, SVGElement) {

  /**
   * SVGShape
   */
  var SVGShape = Create('SVGShape', {

    initializer: function () {
      this._syncAttributes();
    },


    _syncAttributes: function () {
      for (var a in this._attrs) {
        if (this._node[a]) {
          this.on(a + 'Change', this._triggerUpdate, this);
        }
      }
    },


    _triggerUpdate: function (e) {
      this._sync(e.attr);
    },


    _sync: function (attr) {
      var value = this.get(attr);
      this._node.setAttribute(attr, value);
    },


    _attrs: {
      x: null,
      y: null,
      style: null,
      html: null
    }

  }, SVGElement);


  return SVGShape;

});
