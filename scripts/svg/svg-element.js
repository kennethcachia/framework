
define([

  'core/create',
  'core/dom-element'

], function (Create, DOMElement) {

  /**
   * SVG
   */
  var SVGElement = Create('SVGElement', {

    _attrs: {
      namespaceURI: 'http://www.w3.org/2000/svg',
      html: '<svg class="svg"></svg>'
    }

  }, DOMElement);


  return SVGElement;

});
