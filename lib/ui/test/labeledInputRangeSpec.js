define([

  'lib/ui/labeled-input-range',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (LabeledInputRange, DOMNode, Fixtures) {

  describe('LabeledInputRange', function () {
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


    it('should render an input range within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var ui = new LabeledInputRange(d, 'Name', 0, 10, 1, context, 'x');

      ui.attach();
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-range')).toBeTruthy();
      expect(d._node.innerHTML).toEqual(
        '<div class="ui-input-range-label">Name</div>' +
        '<input min="0" max="10" step="1" value="5" type="range">' +
        '<div class="ui-input-range-min">0</div><div class="ui-input-range-max">10</div>');
    });
  });

});