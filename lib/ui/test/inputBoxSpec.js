define([

  'lib/ui/input-box',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/events'

], function (InputBox, DOMNode, Fixtures, Events) {

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
      var changeEvent = Events.createChangeEvent();
      var d = new DOMNode('.fixture');
      var ui = new InputBox(context, 'name');

      ui.attach(d);

      var i = fixture.querySelector('input');
      expect(i.value).toEqual('hello');

      i.value = 'bye';
      i.dispatchEvent(changeEvent);
      expect(context.name).toEqual('bye');
    });
  });

});