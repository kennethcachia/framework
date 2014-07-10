/**
 * @module lib/ui/base
 */
define([

  'lib/controller/controller',
  'lib/base/inherit',
  'lib/render/template-renderer',
  'lib/base/properties',
  'lib/base/assert',
  'lib/base/check'

], function (Controller, inherit, TemplateRenderer, Properties, Assert, Check) {

  // TODO: Add and detach events (destroy).
  // TODO: make template and hiddenClass private?
  // TODO: is template via the constructor necessary?

  /**
   * A base object for UI components.
   * 
   * @alias module:lib/ui/base
   * @class
   * @extends Controller
   * @param {String} template The template to compile.
   * @param {Object} context The context.
   * @param {String=} key The context item to be updated.
   */
  var UIBase = function (template, context, key) {
    Properties.defineImmutableProperty(
      this, 'template', template);

    Properties.defineImmutableProperty(
      this, 'renderer', new TemplateRenderer(template));

    Properties.defineImmutableProperty(
      this, 'className', this.className);

    Properties.defineImmutableProperty(
      this, 'hiddenClass', this.hiddenClass);

    UIBase.superClass.call(this, this.renderer, context, key);

    this._childrenToAttach = [];
    this._attachedChildren = [];

    this.renderer.before('rendered', this._addClassNames, this);
    this.renderer.after('rendered', this._updateChildren, this);

    this.after('attached', this._attachChildren, this);
    this.after('attached', this.bindEvents, this);
  };

  inherit(UIBase, Controller);


  /**
   * @readOnly
   * @property {String} template
   *           The template to compile.
   */
  UIBase.prototype.template = null;


  /**
   * @readOnly
   * @property {TemplateRenderer} renderer
   *           The TemplateRenderer used by this component.
   */
  UIBase.prototype.renderer = null;


  /**
   * @readOnly
   * @default ui
   * @property {String} className
   *           The className added on the component's host.
   */
  UIBase.prototype.className = null;


  /**
   * @default
   * @readOnly
   * @property {String} hiddenClass 
   *           The class added to the host when hidden.
   */
  UIBase.prototype.hiddenClass = 'ui-hidden';


  /**
   * Attaches a child to itself if it is
   * already attached, or waits until it's
   * attached first.
   * 
   * @method
   * @param {Function} ctor The child's constructor.
   * @param {String} selector
   *        The selector used when constructing the child's host.
   *        Must be a child node of this component.
   * @param {*} arguments
   *        A set of arguments to be used at initialization.
   */
  UIBase.prototype.attachChild = function () {
    this._childrenToAttach.push(arguments);

    if (this._isAttached) {
      this._attachChild(arguments);
    }
  };


  /**
   * An optional method that can be used to
   * register DOM events. It's called after
   * the component is attached.
   * 
   * @method
   */
  UIBase.prototype.bindEvents = function () {};


  /**
   * Adds the hidden class to the host.
   *
   * @method
   */
  UIBase.prototype.hide = function () {
    Assert.isTruthy(this._isAttached);
    this._host.addClass(this.hiddenClass);
  };


  /**
   * Removes the hidden class from the host.
   *
   * @method
   */
  UIBase.prototype.show = function () {
    Assert.isTruthy(this._isAttached);
    this._host.removeClass(this.hiddenClass);
  };


  /**
   * Adds ui specific classes to the host.
   *
   * @method
   * @private
   */
  UIBase.prototype._addClassNames = function () {
    if (Check.isString(this.className)) {
      this._host.addClass(this.className);
    }

    this._host.addClass('ui');
  };


  /**
   * Invoked after this component is attached
   * and attaches all of it's children.
   * 
   * @method
   * @private
   */
  UIBase.prototype._attachChildren = function () {
    this._childrenToAttach.forEach(
      this._attachChild, this);
  };


  /**
   * Attaches a single child to itself.
   * 
   * @method
   * @private
   * @param {Array} args
   *        A set of arguments to be used at initialization.
   */
  UIBase.prototype._attachChild = function (args) {
    var Ctor = args[0];
    var selector = args[1];

    Assert.isFunction(Ctor);
    Assert.isString(selector);
    Assert.isTruthy(args.length <= 10);

    var child = new Ctor(args[2], args[3], args[4],
      args[5], args[6], args[7], args[8], args[9]);

    child.attach(this._host.one(selector));

    this._attachedChildren.push(child);

    this.addObjectToDestroy(child);
  };


  /**
   * Invoked after the renderer for this component
   * finishes rendering, and updates the hosts for
   * all of the attached children.
   * 
   * @method
   * @private
   */
  UIBase.prototype._updateChildren = function () {
    var selector;

    this._attachedChildren.forEach(function (child, i) {
      selector = this._childrenToAttach[i][1];
      this._updateChild(child, selector);
    });
  };


  /**
   * Updates a single child.
   * 
   * @method
   * @private
   * @param {UIBase} child The child to update.
   * @param {String} selector 
   *        The selector for this child's host.
   */
  UIBase.prototype._updateChild = function (child, selector) {
    var host = this._host.one(selector);

    child.renderer.host = host;
    child._updateRenderable();
  };


  /* override */
  UIBase.prototype.destructor = function () {
    this.template = null;
    this.renderer = null;
    this.className = null;
    this.hiddenClass = null;

    this._childrenToAttach = null;
    this._attachedChildren = null;

    UIBase.super.destructor.call(this);
  };


  return UIBase;

});