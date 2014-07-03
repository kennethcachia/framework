define([

  'lib/ui/base',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/dom/node'

], function (Base, inherit, TemplateRenderer, DOMNode) {

  describe('Base', function () {
    var template = '<div>{{name}}</div>';
    var fixture;
    var context;
    var renderer;

    beforeEach(function () {
      fixture = document.createElement('div');
      fixture.classList.add('fixture');
      document.body.appendChild(fixture);

      fixture2 = document.createElement('div');
      fixture2.classList.add('fixture2');
      document.body.appendChild(fixture2);

      renderer = new TemplateRenderer(template)
      renderer.host = new DOMNode('.fixture');

      context = {
        name: 'hello'
      };
    });


    afterEach(function () {
      fixture.remove();
      fixture2.remove();
    });


    it('should render created', function () {
      var c = new Base(renderer, context);
      expect(fixture.innerHTML).toEqual('<div>hello</div>');
    });


    it('should re-render when the context changes and sync() is called', function () {
      var c = new Base(renderer, context);
      expect(fixture.innerHTML).toEqual('<div>hello</div>');

      context.name = 'bye';
      c._sync();
      expect(fixture.innerHTML).toEqual('<div>bye</div>');
    });


    it('should update itself when the context changes elsewhere', function () {
      var renderer2 = new TemplateRenderer(template);
      renderer2.host = new DOMNode('.fixture2');

      var c = new Base(renderer, context);
      var c2 = new Base(renderer2, context);
      expect(fixture.innerHTML).toEqual('<div>hello</div>');
      expect(fixture2.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye';
      c._sync();
      expect(fixture.innerHTML).toEqual('<div>bye</div>');
      expect(fixture2.innerHTML).toEqual('<div>bye</div>');
      expect(c._context.name).toEqual('bye');
      expect(c2._context.name).toEqual('bye');
    });


    it('should not re-render when the context changes and sync(false) is called,' +
       'but the internal objects should be updated', function () {
      var c = new Base(renderer, context);
      expect(fixture.innerHTML).toEqual('<div>hello</div>');

      c._context.name = 'bye bye'
      c._sync(false);
      expect(fixture.innerHTML).toEqual('<div>hello</div>');
      expect(c._context.name).toEqual('bye bye');
      expect(c._localContext.name).toEqual('bye bye');
    });


    it('should destroy the renderable when it is destroyed', function () {
      var c = new Base(renderer, context);

      c.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(fixture.innerHTML).toEqual('');
    });

    
    it('should destroy itself when the renderable is destroyed', function () {
      var c = new Base(renderer, context);

      renderer.destroy();
      expect(c._isDestroyed).toBeTruthy();
      expect(renderer._isDestroyed).toBeTruthy();
      expect(fixture.innerHTML).toEqual('');
    });
  });

});