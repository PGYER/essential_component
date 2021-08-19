// core
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// component
import { withStyles, withTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
  loading: {
    textAlign: 'center',
    marginTop: theme.spacing(30)
  }
})

class MFEContainer extends React.Component {
  constructor (props) {
    super(props)
    this.appID = props.appID
    this.appPath = props.appPath
    this.resourceHost = '/' + this.appID
    this.resourcePatterns = [/\/static\/(css|js)\/.*\.(css|js)/i]
    this.assetBundleMain = []
    this.assetBundleContainer = window.document.createElement('div')
    this.assetLoadedCount = 0
    this.hooks = props.hooks
    this.mountedFlag = true
    this.instanceID = this.appID + new Date().getTime().toString(36)

    this.state = {
      error: false
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.currentLanguage !== nextProps.currentLanguage) {
      typeof this.hooks.setLanguage === 'function' &&
      this.hooks.setLanguage(nextProps.currentLanguage)
      return false
    }

    if (nextProps.hooks !== this.props.hooks) {
      this.updateHooks(nextProps.hooks)
      return false
    }

    return true
  }

  componentDidMount () {
    if (
      window['webpackJsonp' + this.appID] &&
      window['webpackJsonp' + this.appID].push &&
      window.document.querySelector('[asset-bundle-id=' + this.appID + ']')) {
      // app loaded, mount app
      this.mountApp()
      return true
    }
    // load app
    this.assetBundleContainer = window.document.createElement('div')
    this.assetLoadedCount = 0
    delete window['webpackJsonp' + this.appID]
    const xhr = new window.XMLHttpRequest()
    xhr.open('GET', ['', this.appID, this.appPath].join('/'))
    xhr.addEventListener('load', (e) => {
      if (xhr.status === 200) {
        const parseNode = window.document.createElement('html-content')
        parseNode.innerHTML = xhr.responseText
        const scriptNode = [...parseNode.getElementsByTagName('link'), ...parseNode.getElementsByTagName('script')]
        for (let nodeOffset = 0; nodeOffset < scriptNode.length; nodeOffset++) {
          for (let patternOffset = 0; patternOffset < this.resourcePatterns.length; patternOffset++) {
            let testURL = scriptNode[nodeOffset].href || scriptNode[nodeOffset].src || ''
            if (testURL.match(this.resourcePatterns[patternOffset])) {
              const matchPath = testURL.match(/[0-9a-z_-]+:\/\/[0-9a-z_.-]+(.*)$/i)
              if (matchPath) {
                testURL = matchPath[1]
              }

              const targetDom = window.document.createElement(scriptNode[nodeOffset].tagName)
              targetDom.addEventListener('load', () => this.resourceLoaded())
              targetDom.addEventListener('error', () => this.resourceError())
              targetDom.addEventListener('timeout', () => this.resourceError())

              if (scriptNode[nodeOffset].href) {
                targetDom.href = this.resourceHost + testURL
                targetDom.setAttribute('rel', 'stylesheet')
              } else if (scriptNode[nodeOffset].src) {
                targetDom.src = this.resourceHost + testURL
                targetDom.setAttribute('type', 'text/javascript')
              }

              if (testURL.indexOf('/main.') > -1) {
                this.assetBundleMain.push(targetDom)
              } else {
                this.assetBundleContainer.appendChild(targetDom)
              }

              break
            }
          }
        }
        this.assetBundleContainer.setAttribute('asset-bundle-id', this.appID)
        window.document.body.appendChild(this.assetBundleContainer)
      }
    })
    xhr.addEventListener('error', () => this.resourceError())
    xhr.addEventListener('timeout', () => this.resourceError())
    xhr.send(null)
  }

  componentWillUnmount () {
    // unmount app
    this.mountedFlag = false
    this.unmountApp()
  }

  resourceLoaded () {
    this.assetLoadedCount++
    if (this.assetLoadedCount === this.assetBundleContainer.childNodes.length) {
      if (this.assetBundleMain.length) {
        // mount main bundle
        for (let bundleIndex = 0; bundleIndex < this.assetBundleMain.length; bundleIndex++) {
          this.assetBundleContainer.appendChild(this.assetBundleMain[bundleIndex])
        }
        this.assetBundleMain = []
        return false
      }

      // mount app
      this.mountApp()
      return true
    }
  }

  resourceError () {
    // unmount assets
    document.body.removeChild(this.assetBundleContainer)
    this.setState({ error: true })
  }

  mountApp () {
    if (!this.mountedFlag) {
      return false
    }

    window[this.appID].hooks &&
    typeof window[this.appID].hooks.mount === 'function' &&
    window[this.appID].hooks.mount({
      route: this.props.route,
      anchor: '#root' + this.instanceID,
      hooks: this.hooks
    })

    this.updateHooks(this.props.hooks)
  }

  unmountApp () {
    window[this.appID] &&
    window[this.appID].hooks &&
    typeof window[this.appID].hooks.unmount === 'function' &&
    window[this.appID].hooks.unmount({
      anchor: '#root' + this.instanceID
    })
  }

  updateHooks (hooks) {
    window[this.appID] &&
    window[this.appID].hooks &&
    typeof window[this.appID].hooks.updateHooks === 'function' &&
    window[this.appID].hooks.updateHooks(hooks)
  }

  render () {
    const { classes } = this.props
    return (
      <div id={'root' + this.instanceID} className={'root' + this.appID}>
        {this.state.error && <div> Mount Error </div>}
        {!this.state.error && <Grid item xs={12} className={classes.loading}><CircularProgress size={48} /></Grid>}
      </div>
    )
  }
}

MFEContainer.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  appID: PropTypes.string.isRequired,
  appPath: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  hooks: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.DataStore.currentLanguage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withTheme(
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(MFEContainer)
  )
)
