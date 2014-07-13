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


    it('should throw an error when context is empty', function () {
      expect(function () {
        new Controller(renderer, {});
      }).toThrowError('Is empty');
    });


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


    it('should re-render when the context changes and sync() is called', function () {
      var c = new Controller(renderer, context);

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      context.name = 'bye';
      c._sync();
      expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
    });


    it('should update itself when the context changes elsewhere', function () {
      var renderer2 = new TemplateRenderer(template);
      
      var c = new Controller(renderer, context);
      var c2 = new Controller(renderer2, context);

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c2.attach(new DOMNode('.fixtureB'));
      expect(fixtureB.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye';
      c._sync();
      expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
      expect(fixtureB.innerHTML).toEqual('<div>bye</div>');
      expect(c._context.name).toEqual('bye');
      expect(c2._context.name).toEqual('bye');
    });


    it('should not re-render when the context changes and sync(false) is called,' +
       'but the internal objects should be updated', function () {
      var c = new Controller(renderer, context);

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye bye';
      c._sync(false);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
      expect(c._context.name).toEqual('bye bye');
    });


    it('should update a context item when a key is defined', function () {
      renderer._template = '<div>{{@}}</div>';

      var c = new Controller(renderer, context, 'name');

      c.attach(host);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye';
      c._sync();
      expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
    });


    it('should not re-render when not required', function () {
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
      expect(renderer.render.calls.count()).toEqual(2);
      expect(renderer2.render.calls.count()).toEqual(1);
    });


    it('should destroy itself but the host should remain intact', function () {
      var c = new Controller(renderer, context);
      c.attach(host);

      c.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(host._isDestroyed).toBeTruthy();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
    });


    it('should destroy itself when the host is destroyed', function () {
      var c = new Controller(renderer, context);
      c.attach(host);

      host.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(host._isDestroyed).toBeTruthy();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
    });
    

    it('should destroy itself when the renderable is destroyed', function () {
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