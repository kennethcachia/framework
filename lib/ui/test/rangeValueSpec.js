define([

  'lib/ui/range-value',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (RangeValue, DOMNode, Fixtures, Simulate) {

  describe('RangeValue', function () {
    var fixture;
    var context;
    var domNode;

    beforeEach(function () {
      fixture = Fixtures.create();
      domNode = new DOMNode('.fixture');

      context = {
        value: 50
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render a RangeValue within a DOMNode', function () {
      var rangeValue = new RangeValue('Label', 0, 100, 1, context, 'value');
      rangeValue.attach(domNode);

      expect(domNode.hasClass('ui')).toBeTruthy();
      expect(domNode.hasClass('ui-range-value')).toBeTruthy();

      expect(domNode._node.innerHTML).toEqual(
        '<div class="ui-range-value-range ui-input-range ui">' +
          '<input min="0" max="100" step="1" value="50" type="range">' +
        '</div>' +
        '<div class="ui-range-value-label ui-label ui">' +
          '<span>Label</span>' +
        '</div>' +
        '<div class="ui-range-value-value ui-input-box ui">' +
          '<input value="50">' +
        '</div>');
    });


    it('should update the context item when it\'s value changes', function () {
      var rangeValue = new RangeValue('Label', 0, 100, 1, context, 'value');
      rangeValue.attach(domNode);

      var range = fixture.querySelector('.ui-range-value-range input');
      var value = fixture.querySelector('.ui-range-value-value input');

      expect(range.value).toEqual('50');
      expect(range.value).toEqual('50');

      range.value = '50';
      Simulate.event(range, 'input');

      expect(context.value).toEqual('50');
      expect(value.value).toEqual('50');
    });
  });

});