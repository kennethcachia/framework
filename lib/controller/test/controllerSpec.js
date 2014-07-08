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

    beforeEach(function () {
      fixtureA = Fixtures.create('A');
      fixtureB = Fixtures.create('B');

      renderer = new TemplateRenderer(template);
      renderer.host = new DOMNode('.fixtureA');

      context = {
        name: 'hello'
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

      c.attach();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
      expect(c._isAttached).toBeTruthy();
    });


    it('should only attach itself once', function () {
      var c = new Controller(renderer, context);
      var callbackFn = jasmine.createSpy();

      c.on('attached', callbackFn);

      c.attach();
      c.attach();
      expect(callbackFn.calls.count()).toEqual(1);
    });


    it('should augment the properties object when addProperty() is called', function () {
      var c = new Controller(renderer, context);

      c.addProperty('hello', 'bye');
      expect(c._properties).toEqual({hello: 'bye'});
    });


    it('should re-render when the context changes and sync() is called', function () {
      var c = new Controller(renderer, context);

      c.attach();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      context.name = 'bye';
      c._sync();
      expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
    });


    it('should update itself when the context changes elsewhere', function () {
      var renderer2 = new TemplateRenderer(template);
      renderer2.host = new DOMNode('.fixtureB');

      var c = new Controller(renderer, context);
      var c2 = new Controller(renderer2, context);

      c.attach();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c2.attach();
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

      c.attach();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye bye';
      c._sync(false);
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');
      expect(c._context.name).toEqual('bye bye');
      expect(c._localContext.name).toEqual('bye bye');
    });


    it('should update a context item when a key is defined', function () {
      renderer._template = '<div>{{@}}</div>';

      var c = new Controller(renderer, context, 'name');

      c.attach();
      expect(fixtureA.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye';
      c._sync();
      expect(fixtureA.innerHTML).toEqual('<div>bye</div>');
    });


    it('should destroy the renderable when it is destroyed', function () {
      var c = new Controller(renderer, context);

      c.attach();
      c.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(fixtureA.innerHTML).toEqual('');
    });

    
    it('should destroy itself when the renderable is destroyed', function () {
      var c = new Controller(renderer, context);

      c.attach();
      renderer.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(fixtureB.innerHTML).toEqual('');
    });
  });

});