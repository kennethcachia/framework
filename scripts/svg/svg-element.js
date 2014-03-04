
define(['core/create', 'core/node-element'], function (Create, NodeElement) {

  /**
   * SVGElement
   */
  var SVGElement = Create('SVGElement', {

    _attrs: {
      namespaceURI: 'http://www.w3.org/2000/svg'
    }

  }, NodeElement);


  return SVGElement;

});
