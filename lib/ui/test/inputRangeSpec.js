define([

  'lib/ui/input-range',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (InputRange, DOMNode, Fixtures, Simulate) {

  describe('InputRange', function () {
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


    it('shoud throw an error when invalid properties are used', function () {
      expect(function () {
        new InputRange(10, 5, 1, context, 'x');
      }).toThrowError('Not true');

      expect(function () {
        new InputRange(0, 5, 5, context, 'x');
      }).toThrowError('Not true');
    });


    it('should render an input range within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputRange(0, 10, 1, context, 'x');

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-range')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input min="0" max="10" step="1" value="5" type="range">');
    });


    it('should update the context item when it\'s value changes', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputRange(0, 10, 1, context, 'x');

      ui.attach(d);

      var i = fixture.querySelector('input');
      expect(i.value).toEqual('5');

      i.value = 7;
      Simulate.event(i, 'change');
      expect(context.x).toEqual('7');
    });  
  });

});