
var SVGElement = Create('SVGElement', {

  _attrs: {
    namespaceURI: 'http://www.w3.org/2000/svg'
  }

}, NodeElement);


var SVG = Create('SVG', {

  _attrs: {
    html: '<svg></svg>'
  }

}, SVGElement);


var SVGRect = Create('SVGRect', {

  _attrs: {
    html: '<rect x="10" y="10" width="100" height="100"/>'
  }

}, SVGElement);


var SVGCanvas = Create('SVGCanvas', {

  addShape: function (shape) {
    this.get('container').appendChild(shape);
  },

  _attrs: {
    container: new SVG()
  }

}, View);
