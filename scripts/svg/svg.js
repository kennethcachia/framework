
/*
 * SVGElement
 */
var SVGElement = Create('SVGElement', {

  _attrs: {
    namespaceURI: 'http://www.w3.org/2000/svg'
  }

}, NodeElement);


/*
 * SVG
 */
var SVG = Create('SVG', {

  _attrs: {
    html: '<svg></svg>'
  }

}, SVGElement);


/*
 * SVG Canvas
 */
var SVGCanvas = Create('SVGCanvas', {

  addShape: function (shape) {
    this.get('container').appendChild(shape);
  },

  _attrs: {
    container: new SVG()
  }

}, View);
