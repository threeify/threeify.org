// https://medium.com/@austintoddj/using-google-analytics-with-next-js-423ea2d16a98

import React from 'react'
import { initGA, logPageView } from '../utils/analytics'
export default class Layout extends React.Component {
  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}