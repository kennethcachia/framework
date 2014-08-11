/**
 * @module lib/ui/input-file
 */
define([

  'lib/ui/input-base',
  'lib/base/inherit',
  'lib/base/assert',
  'lib/file/abstract-reader'

], function (InputBase, inherit, Assert, AbstractReader) {

  /**
   * A file uploader.
   * 
   * @alias module:lib/ui/input-file
   * @class
   * @extends InputBase
   * @param {Boolean} multiple
   *        Allows multiple files to be selected if true.
   * @param {AbstractReader} reader
   *        The Reader to be used when processing the selected files.
   * @param {Object} context The context.
   * @param {String} key
   *        The context item to be updated.
   *        The value this key points to must be an array.
   */
  var InputFile = function (multiple, reader, context, key) {
    InputFile.superClass.call(this, 'change', context, key);

    Assert.isArray(context[key]);
    Assert.isInstanceOf(reader, AbstractReader);

    this._reader = reader;
    this.addProperty('multiple', multiple);
  };

  inherit(InputFile, InputBase);


  /* override */
  InputFile.prototype.template = '<input {{#multiple}}multiple="true"{{/multiple}} type="file" />';


  /* override */
  InputFile.prototype.className = 'ui-input-file';


  /* override */
  InputFile.prototype._onChange = function (target) {
    var files = target._node.files;

    // TODO: read multiple files
    var file = files.item(0);

    this._reader.read(file).then(function (result) {

      this._context[this._key].push({
        // TODO: use filename
        name: 'Uploaded asset',
        html: result
      });

      this._sync(false);

    }.bind(this), function () {
      // TODO: show overlay
      console.log(arguments);
    });
  };


  return InputFile;

});