
define([

  'core/create',
  'core/dom-element'

], function (Create, DOMElement) {

  /**
   * Crosshair
   */
  var Crosshair = Create('Crosshair', {

    activate: function (element) {
      this.setBoundary(element);
      this.addClass('crosshair--active');
    },


    deactivate: function () {
      this.removeClass('crosshair--active');
    },


    setBoundary: function (element) {
      var rect = element.getArea();

      this.setStyle('top', rect.top + 'px');
      this.setStyle('left', rect.left + 'px');
      this.setStyle('width', rect.width + 'px');
      this.setStyle('height', rect.height + 'px');
    },


    _attrs: {
      html: '<div class="crosshair"></div>'
    }

  }, DOMElement);


  return Crosshair;

});
