define([

  'lib/controller/controller',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (Controller, inherit, TemplateRenderer, DOMNode, Fixtures) {

  describe('Controller', function () {
    var template = '<div>{{name}}</div>';
    var fixtureA;
    var fixtureB;
    var context;
    var renderer;
    var host;

    beforeEach(function () {
      fixtureA = Fixtures.create('A');
      fixtureB = Fixtures.create('B');

      renderer = new TemplateRenderer(template);
      host = new DOMNode('.fixtureA');

      context = {
        name: 'hello',
        surname: 'bye'
      };
    });


    afterEach(function () {
      Fixtures.remove(fixtureA);
      Fixtures.remove(fixtureB);
    });


    function asyncWrapper(fn) {
      setTimeout(fn, 0);
    }


    it('should render when attach() is called', function () {
      var c = new Controller(renderer, context);
      expect(c._isAttached).toBeFalsy();

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
      expect(c._isAttached).toBeTruthy();
    });


    it('should only attach itself once', function () {
      var c = new Controller(renderer, context);
      var callbackFn = jasmine.createSpy();

      c.on('attached', callbackFn);

      c.attach(host);
      c.attach(host);
      expect(callbackFn.calls.count()).toEqual(1);
    });


    it('should augment the properties object when addProperty() is called', function () {
      var c = new Controller(renderer, context);

      c.addProperty('hello', 'bye');
      expect(c._properties).toEqual({hello: 'bye'});
    });


    it('should re-render when the context changes and sync() is called', function (done) {
      var c = new Controller(renderer, context);

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      context.name = 'bye';
      c._sync();

      asyncWrapper(function () {
        expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
        done();
      });
    });


    it('should update itself when the context changes elsewhere', function (done) {
      var renderer2 = new TemplateRenderer(template);
      
      var c = new Controller(renderer, context);
      var c2 = new Controller(renderer2, context);

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c2.attach(new DOMNode('.fixtureB'));
      expect(fixtureB.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye';
      c._sync();

      asyncWrapper(function () {
        expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
        expect(fixtureB.innerHTML).toEqual('<div>bye</div>');
        expect(c._context.name).toEqual('bye');
        expect(c2._context.name).toEqual('bye');
        done();
      });
    });


    it('should fire a context updated event when the context changes', function (done) {
      var c = new Controller(renderer, context);
      var callback = jasmine.createSpy();

      c.on('contextUpdated', callback, this);
      c.attach(host);

      c._context.name = 'bye';
      c._sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {},
          changed: {
            name: 'bye'
          }
        });

        done();
      });
    });


    it('should fire a context updated event when the context changes elsewhere', function (done) {
      var c = new Controller(renderer, context);      
      var renderer2 = new TemplateRenderer(template);
      var c2 = new Controller(renderer2, context);

      c.attach(host);
      c2.attach(new DOMNode('.fixtureB'));

      var callback = jasmine.createSpy();
      c.on('contextUpdated', callback, this);

      c2._context.name = 'bye';
      c2._sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {},
          changed: {
            name: 'bye'
          }
        });

        done();
      });
    });


    it('should not re-render when the context changes and sync(false) is called,' +
       'but the internal objects should be updated', function (done) {
      var c = new Controller(renderer, context);

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye bye';
      c._sync(false);

      asyncWrapper(function () {
        expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
        expect(c._context.name).toEqual('bye bye');
        done();
      });
    });


    it('should update a context item when a key is defined', function (done) {
      renderer._template = '<div>{{@}}</div>';

      var c = new Controller(renderer, context, 'name');

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye';
      c._sync();

      asyncWrapper(function () {
        expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
        done();
      });
    });


    it('should not re-render when not required', function (done) {
      var renderer2 = new TemplateRenderer('<div>{{surname}}</div');
      var name = new Controller(renderer, context);
      var surname = new Controller(renderer2, context);
      
      spyOn(renderer, 'render').and.callThrough();
      spyOn(renderer2, 'render').and.callThrough();

      name.attach(host);
      surname.attach(new DOMNode('.fixtureB'));
      expect(renderer.render.calls.count()).toEqual(1);
      expect(renderer2.render.calls.count()).toEqual(1);

      context.name = 'hey';
      name._sync(true);

      asyncWrapper(function () {
        expect(renderer.render.calls.count()).toEqual(2);
        expect(renderer2.render.calls.count()).toEqual(1);
        done();
      });
    });


    // TODO: Change when Node is updated.
    xit('should destroy itself but the host should remain intact', function () {
      var c = new Controller(renderer, context);
      c.attach(host);

      c.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(host._isDestroyed).toBeTruthy();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
    });


    xit('should destroy itself when the host is destroyed', function () {
      var c = new Controller(renderer, context);
      c.attach(host);

      host.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(host._isDestroyed).toBeTruthy();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
    });
    

    xit('should destroy itself when the renderable is destroyed', function () {
      var c = new Controller(renderer, context);
      c.attach(host);

      renderer.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(host._isDestroyed).toBeTruthy();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
    });
  });

});