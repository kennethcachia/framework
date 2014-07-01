define([

  'lib/render/template-renderer',
  'lib/dom/node',
  'lib/base/inherit'

], function (TemplateRenderer, DOMNode, inherit) {

  describe('TemplateRenderer', function () {
    var fixture;


    beforeEach(function () {
      fixture = document.createElement('div');
      fixture.classList.add('fixture');

      document.body.appendChild(fixture);
    });


    afterEach(function () {
      fixture.remove();
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

      t.render(d, {
        name: 'mustache'
      });

      expect(document.querySelector('.fixture').innerHTML).toEqual('<div>mustache</div>');
    });


    it('should reset the contents of the DOMNode when destroy() is called', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.render(d);
      expect(d.innerHTML).toEqual('<div>Hello</div>');

      t.destroy();
      expect(d.innerHTML).toEqual('');
    });


    it('should destroy itself if the DOMNode is destroyed', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>');

      t.render(d);
      d.destroy();

      expect(document.querySelector('.fixture')).toBeNull();
      expect(d._isDestroyed).toBeTruthy();
      expect(t._isDestroyed).toBeTruthy();
    });


    it('should allow template nesting', function () {
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
        content.render(p.anchor.one('.content'), {
          content: 'Lorem ipsum'
        });
      });

      p.render(new DOMNode('body'), {
        title: 'Home'
      });

      expect(document.body.innerHTML).toEqual('<h1>Home</h1><div class="content"><h2>Content</h2><div>Lorem ipsum</div></div>');
    });
  });

});