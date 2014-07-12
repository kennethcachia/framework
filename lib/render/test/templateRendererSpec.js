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


    it('should find all the tokens in a template', function () {
      var t = new TemplateRenderer(
        '<div>{{name}}</div>' +
        '{{#items}}{{.}}{{/items}}');

      expect(t._tokens).toEqual({
        name: true,
        items: true
      });
    });


    it('should replace all the tokens in a template via replaceToken()', function () {
      var t = new TemplateRenderer('<div>{{@}} @ {{@}}</div>');

      t.replaceToken('@', 'name');
      expect(t._template).toEqual('<div>{{name}} @ {{name}}</div>');
      expect(t._tokens).toEqual({
        name: true
      });
    });


    it('should determine if a token is currently being used via isTokenUsed()', function () {
      var t = new TemplateRenderer('<div>{{name}}</div>');

      expect(t.isTokenUsed('name')).toBeTruthy();
      expect(t.isTokenUsed('surname')).toBeFalsy();
    });


    it('should determine if a template uses any tokens via hasTokens()', function () {
      var t = new TemplateRenderer('<div>{{name}}</div>');
      expect(t.hasTokens()).toBeTruthy();

      t = new TemplateRenderer('<div></div>');
      expect(t.hasTokens()).toBeFalsy();
    });


    it('should render itself within a DOMNode when render() is called', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.render(d);
      expect(d.innerHTML).toEqual('<div>Hello</div>');
    });


    it('should pass the correct context to Mustache', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>{{name}}</div>');
      var c = {
        name: 'mustache'
      };

      t.render(d, c);
      expect(document.querySelector('.fixture').innerHTML)
        .toEqual('<div>mustache</div>');
    });


    it('should augment the context with properties', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>{{hello}}-{{bye}}</div>');

      var c = {
        hello: 'hello'
      };

      var p = {
        bye: 'bye'
      };

      t.render(d, c, p);
      expect(document.querySelector('.fixture').innerHTML).toEqual('<div>hello-bye</div>');
    });


    it('should not touch the contents of the DOMNode when destroy() is called', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.render(d);
      expect(d.innerHTML).toEqual('<div>Hello</div>');

      t.destroy();
      expect(d.innerHTML).toEqual('<div>Hello</div>');
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
        content.render(new DOMNode('.content'), {
          content: 'Lorem ipsum'
        });
      });

      p.render(new DOMNode('.fixture'), {
        title: 'Home'
      });

      expect(fixture.innerHTML).toEqual(
        '<h1>Home</h1>' +
        '<div class="content">' +
          '<h2>Content</h2>' +
          '<div>Lorem ipsum</div>' +
        '</div>');
    });
  });

});