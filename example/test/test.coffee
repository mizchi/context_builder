TestRunner = require '../../src/test_runner'
ck = require 'coffeekup' # npm install coffeekup

settings =
  root: __dirname
  html: ck.render ->
    div id:'hoge', -> 'div'
  scripts: [
    "lib/jquery.js"
    "lib/underscore.js"
    "lib/backbone.js"
  ]

runner = new TestRunner settings
{_do, _async} = runner

describe 'hoge', ->
  beforeEach (done)->
    runner.build done

  it 'should have id hoge', _do ->
    ok $('#hoge').size() is  1

  it 'should have id hoge', _async ->
    ok $('#hoge').size() is  1
    setTimeout done, 100
