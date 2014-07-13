define([

  'lib/ui/input-color',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (InputColor, DOMNode, Fixtures) {

  describe('InputColor', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        color: '#ffffff'
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render a color picker within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputColor(context, 'color');

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-color')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input value="#ffffff" type="color">');
    });


    it('should update the context item when it\'s value changes', function () {
      var changeEvent = document.createEvent('HTMLEvents');
      var d = new DOMNode('.fixture');
      var ui = new InputColor(context, 'color');

      ui.attach(d);

      var i = fixture.querySelector('input');
      expect(i.value).toEqual('#ffffff');

      i.value = '#ff0000';
      changeEvent.initEvent('change', true, true);
      i.dispatchEvent(changeEvent);
      expect(context.color).toEqual('#ff0000');
    });
  });

});