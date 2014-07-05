define([

  'lib/ui/base',
  'lib/render/template-renderer',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (UIBase, TemplateRenderer, DOMNode, Fixtures) {

  describe('Base', function () {
    var fixture;

    beforeEach(function () {
      fixture = Fixtures.create();
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should not allow changes to hiddenClass after initialization', function () {
      var r = new TemplateRenderer('<div></div>');
      r.host = new DOMNode('.fixture');
      var ui = new UIBase(r, {});

      expect(ui.hiddenClass).toEqual('ui-hidden');

      ui.hiddenClass = 'ui';
      expect(ui.hiddenClass).toEqual('ui-hidden');
    });


    it('should hide and show the component when hide() and show() are used', function () {
      var r = new TemplateRenderer('<div></div>');
      r.host = new DOMNode('.fixture');
      var ui = new UIBase(r, {});

      ui.hide();
      expect(r.host._node.className).toEqual('fixture ui-hidden');

      ui.show();
      expect(r.host._node.className).toEqual('fixture');
    });
  });

});