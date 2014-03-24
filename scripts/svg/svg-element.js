
define([

  'core/create',
  'core/dom-element'

], function (Create, DOMElement) {

  /**
   * SVGElement
   */
  var SVGElement = Create('SVGElement', {

    _attrs: {
      namespaceURI: 'http://www.w3.org/2000/svg'
    }

  }, DOMElement);


  return SVGElement;

});
