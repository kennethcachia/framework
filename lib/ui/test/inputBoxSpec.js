define([

  'lib/ui/input-box',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (InputBox, DOMNode, Fixtures, Simulate) {

  describe('InputBox', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        name: 'hello'
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render an input box within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputBox(context, 'name');

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-box')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input value="hello">');
    });


    it('should update the context item when it\'s value changes', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputBox(context, 'name');

      ui.attach(d);

      var i = fixture.querySelector('input');
      expect(i.value).toEqual('hello');

      i.value = 'bye';
      Simulate.event(i, 'change');
      expect(context.name).toEqual('bye');
    });
  });

});