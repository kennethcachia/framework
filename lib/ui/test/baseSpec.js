define([

  'lib/ui/base',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (UIBase, DOMNode, Fixtures) {

  describe('Base', function () {
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


    it('should not allow changes to hiddenClass', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);
      expect(ui.hiddenClass).toEqual('ui-hidden');

      ui.hiddenClass = 'ui';
      expect(ui.hiddenClass).toEqual('ui-hidden');
    });


    it('should not allow changes to renderer', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);
      expect(ui.renderer).not.toBeNull();

      ui.renderer = null;
      expect(ui.renderer).not.toBeNull();
    });


    it('should render a template within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      new UIBase(d, '<div>{{name}}</div>', context);
      expect(d._node.innerHTML).toEqual('<div>hello</div>');
    });


    it('should hide and show the component when hide() and show() are used', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);

      ui.hide();
      expect(d._node.className).toEqual('fixture ui-hidden');

      ui.show();
      expect(d._node.className).toEqual('fixture');
    });


    it('should clear the contents of the DOMNode on destruction,' +
       'and destroy the renderer', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);
      expect(d._node.innerHTML).toEqual('<div></div>');

      ui.destroy();
      expect(d._node.innerHTML).toEqual('');
      expect(ui.renderer._isDestroyed).toBeTruthy();
    });


    it('should destroy itself and clear the contents of the DOMNode' +
       'when the renderer is destroyed', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);
      expect(d._node.innerHTML).toEqual('<div></div>');

      ui.renderer.destroy();
      expect(d._node.innerHTML).toEqual('');
      expect(ui._isDestroyed).toBeTruthy();
      expect(ui.renderer._isDestroyed).toBeTruthy();
    });
  });

});