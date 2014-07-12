define([

  'lib/ui/color',
  'lib/base/test/fixtures',
  'lib/dom/node'

], function (Color, Fixtures, DOMNode) {

  describe('Color', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        opacity: 90,
        color: '#ff0000'
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render a color picker within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var c = new Color('Background', context, 'opacity', 'color');

      c.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-color')).toBeTruthy();
      expect(d._node.innerHTML).toEqual(
        '<div class="ui-color-opacity ui-input-range ui">' +
          '<div class="ui-input-range-label">Background</div>' +
          '<input min="0" max="100" step="1" value="90" type="range">' +
          '<div class="ui-input-range-min">0</div>' +
          '<div class="ui-input-range-max">100</div>' +
        '</div>' +
        '<div class="ui-color-value ui-input-color ui">' +
          '<input value="#ff0000" type="color">' +
        '</div>');
    });


    it('should update the context item when it\'s value changes', function () {
      var changeEvent = document.createEvent('HTMLEvents');
      changeEvent.initEvent('change', true, true);

      var d = new DOMNode('.fixture');
      var c = new Color('Background', context, 'opacity', 'color');

      c.attach(d);
      var oi = fixture.querySelector('.ui-color-opacity input');
      var ci = fixture.querySelector('.ui-color-value input');
      expect(oi.value).toEqual('90');
      expect(ci.value).toEqual('#ff0000');

      oi.value = '76';
      oi.dispatchEvent(changeEvent);
      expect(context.opacity).toEqual('76');

      ci.value = '#00ff00';
      ci.dispatchEvent(changeEvent);
      expect(context.color).toEqual('#00ff00');
    });
  });

});