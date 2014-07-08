define([

  'lib/ui/input-base',
  'lib/base/inherit',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (InputBase, inherit, DOMNode, Fixtures) {

  describe('InputBase', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        x: 5
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should throw an error when a key is not defined', function () {
      var d = new DOMNode('.fixture');

      expect(function () {
        new InputBase(d, context);
      }).toThrowError('Not defined');
    });
  });

});