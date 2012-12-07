# ContextBuilder

This helps you to build DOM test environment without browser nor global pollution.


## HOW TO USE

TestRunner is tuned for Mocha BDD Style.

```
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

  it 'should callback with timeout', _async ->
    setTimeout done, 100

```

```
$ mocha --compilers coffee:coffee-script --ignore-leaks test.coffee
```


"_do" and "_async" wrap contextify. In lambda after that, you can code like on browser.


## TODO

- change implicit done on _async
- wrap describe and it
