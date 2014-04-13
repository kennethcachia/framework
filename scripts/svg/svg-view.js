
define([

  'core/create',
  'svg/svg-element', 
  'mv/parent-view'

], function (Create, SVG, ParentView) {

  /**
   * SVG View
   */
  var SVGView = Create('SVGView', {

    initializer: function () {
      var container = this.get('container');

      if (!container) {
        container = new SVG();
        this.set('container', container);
      }

      this.on('appendedView', function (e) {
        var child = e.child;
        var container = child.get('container');

        container.addClass('svg-shape');
      });
    },


    _attrs: {
      container: null
    }

  }, ParentView);


  return SVGView;

});
