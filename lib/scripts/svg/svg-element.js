
define([

  'lib/base/create',
  'lib/dom/dom-element'

], function (Create, DOMElement) {

  /**
   * SVG
   */
  var SVGElement = Create('SVGElement', {

    _attrs: {
      namespaceURI: {
        value: 'http://www.w3.org/2000/svg'
      },

      html: {
        value: '<svg class="svg"></svg>'
      }
    }

  }, DOMElement);


  return SVGElement;

});
