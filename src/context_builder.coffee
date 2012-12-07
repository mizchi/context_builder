Contextify = require 'contextify'
jsdom = require 'jsdom'
path = require 'path'

module.exports = class ContextBuilder
  constructor: ({scripts, html, root}) ->
    @ctx = null
    @html = html or '<html><body></body></html>'
    @scripts =
      if scripts?.length?
        for i in scripts
          path.join root, i
      else
        []
    @is_built = false

  build: (cb) ->
    jsdom.env html: @html, scripts: @scripts, done: (err, @ctx) =>
      console.warn err if err
      @is_built = true
      cb(err)

  addHelper: (helpers)->
    for key, val of helpers
      @ctx[key] = val

  run: =>
    @ctx.run "(#{arguments[0]})()"

  _do: (f) =>
    => @run(f)

  _async: (f) =>
    (done) =>
      @ctx.done = done
      @run(f)
