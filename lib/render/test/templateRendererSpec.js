define([

  'lib/render/template-renderer',
  'lib/dom/node'

], function (TemplateRenderer, DOMNode) {

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
      var t = new TemplateRenderer('<div>Hello</div>', d, {});

      t.render();

      expect(d.innerHTML).toEqual('<div>Hello</div>');

      d.destroy();
    });


    it('should pass the correct context to Mustache', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>{{name}}</div>', d, {
        name: 'mustache'
      });

      t.render();

      expect(document.querySelector('.fixture').innerHTML).toEqual('<div>mustache</div>');
    });


    it('should reset the contents of the DOMNode when destroy() is called', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>', d, {});

      t.render();
      expect(d.innerHTML).toEqual('<div>Hello</div>');

      t.destroy();
      expect(d.innerHTML).toEqual('');
    });


    it('should destroy itself if the DOMNode is destroyed', function () {
      var d = new DOMNode('.fixture');
      var t = new TemplateRenderer('<div>Hello</div>', d, {});

      t.render();
      d.destroy();

      expect(document.querySelector('.fixture')).toBeNull();
      expect(d._isDestroyed).toBeTruthy();
      expect(t._isDestroyed).toBeTruthy();
    });
  });

});