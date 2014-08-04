define([

  'lib/dom/svg-parser'

], function (SVGParser) {

  describe('Parser', function () {
    var parser;


    beforeEach(function () {
      parser = new SVGParser();
    });


    it('should parse a string to a document', function () {
      var doc = parser.parse('<svg></svg>');
      expect(doc.childNodes.length).toEqual(1);
      expect(doc.firstChild.tagName).toEqual('svg');
    });


    it('should throw an error when the input is malformed', function () {
      expect(function () {
        parser.parse('<svg>');
      }).toThrowError('Error while parsing');

      expect(function () {
        parser.parse('<svg><path></svg>');
      }).toThrowError('Error while parsing');
    });
  });

});