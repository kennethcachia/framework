define([

  'lib/render/template-renderer',
  'lib/dom/node',
  'lib/base/inherit',
  'lib/base/test/fixtures'

], function (TemplateRenderer, DOMNode, inherit, Fixtures) {

  describe('TemplateRenderer', function () {
    var fixture;
    var fixture2;

    beforeEach(function () {
      fixture = Fixtures.create();
      fixture2 = Fixtures.create('2');
    });


    afterEach(function () {
      Fixtures.remove(fixture);
      Fixtures.remove(fixture2);
    });


    it('should render itself within a DOMNode when render() is called', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.host = d;
      t.render();

      expect(d.innerHTML).toEqual('<div>Hello</div>');
    });


    it('should allow host to be defined after initialization', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div></div>');

      expect(function () {
        t.render();
      }).toThrowError('Incorrect type');

      expect(t._isRendered).toBeFalsy();

      t.host = d;
      t.render();

      expect(t._isRendered).toBeTruthy();
    });


    it('should remove itself from the previous host when host changes', function () {
      var f = new DOMNode('.fixture');
      var f2 = new DOMNode('.fixture2');
      var t = new TemplateRenderer('<div></div>');

      t.host = f2;
      t.render();

      expect(f2.innerHTML).toEqual('<div></div>');

      t.host = f;
      t.render();

      expect(f2.innerHTML).toEqual('');
      expect(f.innerHTML).toEqual('<div></div>');

      f2.destroy();
      expect(t._isDestroyed).toBeFalsy();

      f.destroy();
      expect(t._isDestroyed).toBeTruthy();
    });


    it('should pass the correct context to Mustache', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>{{name}}</div>');

      t.host = d;
      t.render({
        name: 'mustache'
      });

      expect(document.querySelector('.fixture').innerHTML).toEqual('<div>mustache</div>');
    });


    it('should augment the context with properties', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>{{hello}}-{{bye}}</div>');

      t.host = d;

      t.render({
        hello: 'hello'
      }, {
        bye: 'bye'
      });

      expect(document.querySelector('.fixture').innerHTML).toEqual('<div>hello-bye</div>');
    });


    it('should reset the contents of the DOMNode when destroy() is called', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.host = d;
      t.render();
      expect(d.innerHTML).toEqual('<div>Hello</div>');

      t.destroy();
      expect(d.innerHTML).toEqual('');
    });


    it('should destroy itself if the DOMNode is destroyed', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.host = d;
      t.render();
      d.destroy();

      expect(document.querySelector('.fixture')).toBeNull();
      expect(d._isDestroyed).toBeTruthy();
      expect(t._isDestroyed).toBeTruthy();
    });


    it('should support nesting', function () {
      function Page() {
        var template = '<h1>{{title}}</h1><div class="content"></div>';
        Page.superClass.call(this, template);
      }

      function Content() {
        var template = '<h2>Content</h2><div>{{content}}</div>';
        Page.superClass.call(this, template);
      }

      inherit(Page, TemplateRenderer);
      inherit(Content, TemplateRenderer);

      var p = new Page();
      var content = new Content();

      p.on('rendered', function () {
        content.host = p.host.one('.content');
        content.render({
          content: 'Lorem ipsum'
        });
      });

      p.host = new DOMNode('.fixture');
      p.render({
        title: 'Home'
      });

      expect(fixture.innerHTML).toEqual('<h1>Home</h1><div class="content"><h2>Content</h2><div>Lorem ipsum</div></div>');
    });
  });

});