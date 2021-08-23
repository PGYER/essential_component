// core
import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { withStyles, withTheme } from '@material-ui/core/styles'

// components
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { plHelp } from '@pgyer/icons'

const styles = (theme) => ({
  mainColor: {
    color: theme.palette.primary.main
  }
})

class ShowHelper extends React.Component {
  getDoc () {
    const { docID, appID } = this.props
    const data = {
      docID: docID,
      appID: appID,
      verifyKey: 'kf_doc_verify_key'
    }
    window.postMessage(data, window.location.origin)
  }

  render () {
    const { tooltip, title, type, intl, classes } = this.props
    if (type === 'button') {
      return (
        <Button variant='contained' color='primary' onClick={() => { this.getDoc() }}>
          <FontAwesomeIcon icon={plHelp} />&nbsp;&nbsp;
          {title || intl.formatMessage({ id: 'label.learnMore' })}
        </Button>
      )
    } else if (type === 'icon') {
      return (
        <Tooltip title={tooltip || intl.formatMessage({ id: 'label.learnMore' })} placement='top'>
          <Typography
            variant='body2'
            component='span'
            className={classes.mainColor}
            style={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => { this.getDoc() }}
          >
            <FontAwesomeIcon icon={plHelp} />
          </Typography>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title={tooltip || intl.formatMessage({ id: 'label.learnMore' })} placement='top'>
          <Typography
            variant='body2'
            component='span'
            className={classes.mainColor}
            style={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => { this.getDoc() }}
          >
            {title || intl.formatMessage({ id: 'label.learnMore' })}&nbsp;
            <FontAwesomeIcon icon={plHelp} />
          </Typography>
        </Tooltip>
      )
    }
  }
}

ShowHelper.propTypes = {
  docID: PropTypes.string,
  appID: PropTypes.string,
  title: PropTypes.string,
  tooltip: PropTypes.string,
  type: PropTypes.string,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
}

export default injectIntl(
  withTheme(
    withStyles(styles)(ShowHelper)
  )
)
