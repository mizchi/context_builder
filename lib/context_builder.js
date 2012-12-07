// Generated by CoffeeScript 1.4.0
(function() {
  var ContextBuilder, Contextify, jsdom, path,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Contextify = require('contextify');

  jsdom = require('jsdom');

  path = require('path');

  module.exports = ContextBuilder = (function() {

    ContextBuilder.prototype.deribing_from_global = ['console', 'setTimeout', 'setInterval'];

    function ContextBuilder(_arg) {
      var html, i, root, scripts;
      scripts = _arg.scripts, html = _arg.html, root = _arg.root;
      this._async = __bind(this._async, this);

      this._do = __bind(this._do, this);

      this.run = __bind(this.run, this);

      this.ctx = null;
      this.html = html || '<html><body></body></html>';
      this.scripts = (function() {
        var _i, _len, _results;
        if ((scripts != null ? scripts.length : void 0) != null) {
          _results = [];
          for (_i = 0, _len = scripts.length; _i < _len; _i++) {
            i = scripts[_i];
            _results.push(path.join(root, i));
          }
          return _results;
        } else {
          return [];
        }
      })();
      this.is_built = false;
    }

    ContextBuilder.prototype.build = function(cb) {
      var _this = this;
      return jsdom.env({
        html: this.html,
        scripts: this.scripts,
        done: function(err, ctx) {
          _this.ctx = ctx;
          if (err) {
            console.warn(err);
          }
          _this._import(_this.ctx, global, _this.deribing_from_global);
          _this.is_built = true;
          return cb(err);
        }
      });
    };

    ContextBuilder.prototype.addHelper = function(helpers) {
      var key, val, _results;
      _results = [];
      for (key in helpers) {
        val = helpers[key];
        _results.push(this.ctx[key] = val);
      }
      return _results;
    };

    ContextBuilder.prototype.run = function() {
      return this.ctx.run("(" + arguments[0] + ")()");
    };

    ContextBuilder.prototype._do = function(f) {
      var _this = this;
      return function() {
        return _this.run(f);
      };
    };

    ContextBuilder.prototype._async = function(f) {
      var _this = this;
      return function(done) {
        _this.ctx.done = done;
        return _this.run(f);
      };
    };

    ContextBuilder.prototype._import = function(to, from, ns) {
      var name, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = ns.length; _i < _len; _i++) {
        name = ns[_i];
        _results.push(to[name] = from[name]);
      }
      return _results;
    };

    return ContextBuilder;

  })();

}).call(this);