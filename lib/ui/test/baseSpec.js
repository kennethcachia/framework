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
      var ui = new UIBase('<div>{{name}}</div>', context);

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<div>hello</div>');
    });


    it('should throw an error if show() and hide() are called before an attach()', function () {
      var ui = new UIBase('<div>{{name}}</div>', context);

      expect(ui.show).toThrowError('Not true');
      expect(ui.hide).toThrowError('Not true');
    });


    it('should hide and show the component when hide() and show() are used', function () {
      var d = new DOMNode('.fixture');
      var ui = new UIBase('<div></div>', context);

      ui.attach(d);
      ui.hide();
      expect(d.hasClass('ui-hidden')).toBeTruthy();

      ui.show();
      expect(d.hasClass('ui-hidden')).toBeFalsy();
    });


    it('should add a child to its internal list when attachChild() is used', function () {
      var parent = new UIBase('<div></div>', context);

      parent.attachChild(UIBase, '.child', context);
      expect(parent._childrenToAttach.length).toEqual(1);
    });


    it('should throw an error when attaching a child to a component whose template has tokens', function () {
      var d = new DOMNode('.fixture');
      var parent = new UIBase('<div>{{name}}<div class="child"></div></div>', context);

      parent.attach(d);

      expect(function () {
        parent.attachChild(UIBase, '.child', '<div></div>', context);
      }).toThrowError('Not true');
    });


    it('should throw an error when an incorrect constructor or selector are used in attachChild()', function () {
      var d = new DOMNode('.fixture');
      var parent = new UIBase('<div></div>', context);

      parent.attach(d);      

      expect(function () {
        parent.attachChild('.child', context);
      }).toThrowError('Not a Function');

      expect(function () {
        parent.attachChild(UIBase, new DOMNode('.fixture'), context);
      }).toThrowError('Not a string');
    });


    it('should attach the child immediately if the parent is already attached', function () {
      var d = new DOMNode('.fixture');
      var parent = new UIBase('<div><div class="child"></div></div>', context);

      parent.attach(d);
      parent.attachChild(UIBase, '.child', '<p></p>', context);
      expect(d._node.innerHTML).toEqual(
        '<div><div class="child ui"><p></p></div></div>');
    });


    it('should attach the child later if the parent is not attached', function () {
      var d = new DOMNode('.fixture');
      var parent = new UIBase('<div><div class="child"></div></div>', context);

      parent.attachChild(UIBase, '.child', '<p></p>', context);
      expect(d._node.innerHTML).toEqual('');

      parent.attach(d);
      expect(d._node.innerHTML).toEqual(
        '<div><div class="child ui"><p></p></div></div>');
    });


    it('should destroy all of its attached children when a parent is destroyed', function () {
      var d = new DOMNode('.fixture');
      var parent = new UIBase('<div><div class="child"></div></div>', context);

      parent.attachChild(UIBase, '.child', '<p></p>', context);
      parent.attach(d);

      var child = parent._attachedChildren[0];

      parent.destroy();
      expect(parent._isDestroyed).toBeTruthy();
      expect(child._isDestroyed).toBeTruthy();
    });
  });

});