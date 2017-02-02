const flyd = require('flyd')
const h = require('snabbdom/h')
const R = require('ramda')

const map = R.addIndex(R.map)

const labels = options => {
  options = R.merge({
    names: []
  , active$: flyd.stream(0)
  }, options)
  return h('div', {
    attrs: {
      'data-ff-tabswap': 'active:' + options.active$()
    , 'data-ff-tabswap-labels': true
    , 'data-ff-tabswap-labels-count': options.names.length
    }
  },
    map(labelSingle(options.active$), options.names)
  )
}

const labelSingle = active$ => (name, idx) =>
  h('div', {
    attrs: {'data-ff-tabswap-label-wrapper': true}
  }, [
    h("a", {
      on: {click: [active$, idx]}
    , attrs: {
        'data-ff-tabswap-label': active$() === idx ? 'active' : 'inactive'
      }
    }, [name || ''])
  ])


const content = options => {
  options = R.merge({
    sections: []
  , active$: flyd.stream(0)
  }, options)
  return h('div', {
    attrs: {
      'data-ff-tabswap': 'active:' + options.active$()
    , 'data-ff-tabswap-content-wrapper': true
    , 'data-ff-tabswap-count': options.sections.length
    }
  },
    map(contentSingle(options.active$), options.sections)
  )
}

const contentSingle = active$ => (section, idx) =>
  h('div', {
    attrs: { 'data-ff-tabswap-content': active$() === idx ? 'active' : 'inactive' }
  }, section)


module.exports = {labels, content}
