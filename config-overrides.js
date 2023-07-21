const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@assets' : 'src/assets',
    '@components': 'src/components',
    '@pages' : 'src/pages',
    '@styles' : 'src/styles',
    '@datas': 'src/datas',
    '@routers': 'src/routers',
    '@constants': 'src/constants',
    '@store': 'src/store',
    '@services': 'src/services',
    '@helpers': 'src/helpers',
    '@utils': 'src/utils',
  })(config)

  return config
}