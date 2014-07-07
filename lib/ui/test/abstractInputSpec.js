define([

  'lib/ui/abstract-input',
  'lib/base/inherit',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (AbstractInput, inherit, DOMNode, Fixtures) {

  describe('AbstractInput', function () {
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
        new AbstractInput(d, context);
      }).toThrowError('Not defined');
    });
  });

});