
define([

  'base/create',
  'dom/dom-parser',
  'svg/svg-type'

], function (Create, DOMParser, SVGType) {

  /**
   * SVGParser
   */
  var SVGParser = Create('SVGParser', {

    parse: function (iterator) {
      var data = [];
      var node;

      while (node = iterator.nextNode()) {
        switch (node.nodeName) {
          case 'path':
            data.push(this._parsePath(node));
            break;
        }
      }

      return data;
    },


    _parsePath: function (node) {
      return {
        type: SVGType.PATH,
        pathData: node.getAttribute('d')
      };
    },

 
    _attrs: {
      type: {
        value: 'image/svg+xml'
      },

      filter: {
        value: ['path', 'circle', 'rect']
      }
    }

  }, DOMParser);


  return SVGParser;

});
