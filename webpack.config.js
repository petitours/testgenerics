import path from 'path'

export default {
  entry: {
    main: path.resolve('assets/js/main.js')
  },
  output: {
    path: path.resolve('assets/js/'),
    filename: '[name].min.js'
  }
}
