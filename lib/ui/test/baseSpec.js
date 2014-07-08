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


    it('should render a template within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div>{{name}}</div>', context);

      ui.attach();
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<div>hello</div>');
    });


    it('should throw an error if show() and hide() are called before an attach()', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div>{{name}}</div>', context);

      expect(ui.show).toThrowError('Not true');
      expect(ui.hide).toThrowError('Not true');
    });


    it('should hide and show the component when hide() and show() are used', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);

      ui.attach();
      ui.hide();
      expect(d.hasClass('ui-hidden')).toBeTruthy();

      ui.show();
      expect(d.hasClass('ui-hidden')).toBeFalsy();
    });


    it('should clear the contents of the DOMNode on destruction,' +
       'and destroy the renderer', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);

      ui.attach();
      expect(d._node.innerHTML).toEqual('<div></div>');

      ui.destroy();
      expect(d._node.innerHTML).toEqual('');
      expect(ui.renderer._isDestroyed).toBeTruthy();
    });


    it('should destroy itself and clear the contents of the DOMNode' +
       'when the renderer is destroyed', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase(d, '<div></div>', context);

      ui.attach();
      expect(d._node.innerHTML).toEqual('<div></div>');

      ui.renderer.destroy();
      expect(d._node.innerHTML).toEqual('');
      expect(ui._isDestroyed).toBeTruthy();
      expect(ui.renderer._isDestroyed).toBeTruthy();
    });
  });

});