ContextBuilder = require '../../src/context_builder'

env = new ContextBuilder
  scripts: [
    "jquery.js"
    "underscore.js"
    "backbone.js"
  ]

env.build ->
  env.run ->
    setTimeout (->
      console.log (key for key of window).length
    ), 100
