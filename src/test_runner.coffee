ContextBuilder = require './context_builder'
module.exports = class TestRunner extends ContextBuilder
  activateAssertion: ->
    @addHelper require 'assert'
  build: (done) ->
    super (err) =>
      @activateAssertion()
      done(err)
