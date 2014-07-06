define([

  'lib/ui/input-box',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (InputBox, DOMNode, Fixtures) {

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


    it('should throw an error when a key is not defined', function () {
      var d = new DOMNode('.fixture');

      expect(function () {
        new InputBox(d, context);
      }).toThrowError('Not defined');
    });


    it('should render an input box within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      new InputBox(d, context, 'name');

      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input id="hello" value="hello">');
    });



    it('should update the context item when it\'s value changes', function () {
      var changeEvent = document.createEvent('HTMLEvents');
      var d = new DOMNode('.fixture');
      new InputBox(d, context, 'name');
      var i = fixture.querySelector('input');

      expect(i.value).toEqual('hello');

      i.value = 'bye';
      changeEvent.initEvent('change', true, true);
      i.dispatchEvent(changeEvent);
      expect(context.name).toEqual('bye');
    });
  });

});