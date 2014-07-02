define([

  'lib/mvc/abstract-controller',
  'lib/render/template-renderer',
  'lib/base/inherit',
  'lib/dom/node'

], function (AbstractController, TemplateRenderer, inherit, DOMNode) {

  describe('Controller', function () {
    var context;
    var fixture;
    var R;
    var C;
    var r;
    var c;


    beforeEach(function () {
      fixture = document.createElement('div');
      fixture.classList.add('fixture');
      document.body.appendChild(fixture);

      context = {
        name: 'hello'
      };

      R = function () {
        R.superClass.call(this, '<div>{{name}}</div>');
      };

      inherit(R, TemplateRenderer);
      R.prototype.name = null;

      C = function () {
        C.superClass.apply(this, arguments);
      };

      inherit(C, AbstractController);
      C.prototype._updateRenderable = function (renderable, context) {
        renderable.name = context.name;
      };

      r = new R();
      r.host = new DOMNode('.fixture');
      c = new C(r, context);
    });


    afterEach(function () {
      fixture.remove();
    });


    xit('should throw an error if _updateRenderable() is not implemented', function () {
      function X () {
        X.superClass.apply(this, arguments);
      }

      inherit(X, AbstractController);

      expect(function () {
        var c = new X(r, {});
      }).toThrowError('_updateRenderable() not implemented');
    });


    it('should render the view on initialization', function () {
      expect(fixture.innerHTML).toEqual('<div>hello</div>');
    });


    it('should re-render the view when the context changes', function () {
      expect(fixture.innerHTML).toEqual('<div>hello</div>');
      c.updateContext('name', 'bye');
      expect(fixture.innerHTML).toEqual('<div>bye</div>');
    });


    it('should update itself and other controllers that share the same context', function () {
      var fixture2 = document.createElement('div');
      fixture2.classList.add('fixture2');
      document.body.appendChild(fixture2);

      var r2 = new R();
      r2.host = new DOMNode('.fixture2');
      var c2 = new C(r2, context);

      expect(fixture.innerHTML).toEqual('<div>hello</div>');
      expect(fixture2.innerHTML).toEqual('<div>hello</div>');

      c2.updateContext('name', 'bye');

      expect(fixture.innerHTML).toEqual('<div>bye</div>');
      expect(fixture2.innerHTML).toEqual('<div>bye</div>');

      fixture2.remove();
    });


    it('should destroy the renderable when it is destroyed', function () {
      c.destroy();

      expect(r._isDestroyed).toBeTruthy();
      expect(c._isDestroyed).toBeTruthy();
      expect(fixture.innerHTML).toEqual('');
    });


    it('should destroy itself when the renderable is destroyed', function () {
      r.destroy();

      expect(r._isDestroyed).toBeTruthy();
      expect(c._isDestroyed).toBeTruthy();
      expect(fixture.innerHTML).toEqual('');
    });
  });

});