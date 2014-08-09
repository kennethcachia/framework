define([

  'lib/ui/input-file',
  'lib/dom/node',
  'lib/file/text-reader',
  'lib/base/test/fixtures',

], function (InputFile, DOMNode, TextReader, Fixtures) {

  describe('InputFile', function () {
    var fixture;
    var context;
    var reader;


    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        array: [],
        item: 3,
        obj: {}
      };

      reader = new TextReader(1000, 'image/*');
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should throw an error if the context is not an array', function () {
      expect(function () {
        new InputFile(false, reader, context, 'array');
      }).not.toThrowError();

      expect(function () {
        new InputFile(false, reader, context, 'item');
      }).toThrowError('Not an array');

      expect(function () {
        new InputFile(false, reader, context, 'obj');
      }).toThrowError('Not an array');
    });


    it('should render a file uploader within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputFile(false, reader, context, 'array');

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-file')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input type="file">');
    });


    it('should render a multiple file uploader within a DOMNode if multiple is true', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputFile(true, reader, context, 'array');

      ui.attach(d);
      expect(d._node.innerHTML).toEqual('<input multiple="true" type="file">');
    });
  });

});