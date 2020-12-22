// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

// components
import Snackbar from '@material-ui/core/Snackbar'
import { Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { psConfirm, psExclamationTriangle, psClose } from '@pgyer/icons'

const styles = (theme) => ({})

class NotificationBar extends React.Component {
  render () {
    const { key, theme, level, open, onClose, message, action, anchorOrigin, offset } = this.props
    const palette = theme.palette[['success', 'warning', 'error'][level || 0] || 'success']
    const icon = [psConfirm, psExclamationTriangle, psClose][level || 0] || psConfirm

    const messageBody = (
      <React.Fragment>
        <span style={{ color: palette.main }}>
          <FontAwesomeIcon icon={icon} /> &nbsp;&nbsp;
        </span>
        <Typography variant='body2' component='span'>{message}</Typography>
      </React.Fragment>
    )

    const appendStyle = {}
    const parsedOffset = parseInt(offset) > 0 ? parseInt(offset) : 0

    if (anchorOrigin && anchorOrigin.vertical && anchorOrigin.vertical === 'bottom') {
      appendStyle.bottom = 24 + (parsedOffset) * 72
    } else {
      appendStyle.top = 24 + (parsedOffset) * 72
    }

    return (
      <Snackbar
        key={key}
        anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={onClose}
        ContentProps={{
          style: { borderLeft: theme.spacing(0.5) + 'px solid ' + palette.main }
        }}
        style={appendStyle}
        message={messageBody}
        action={action}
      />
    )
  }
}

NotificationBar.propTypes = {
  level: PropTypes.number.isRequired,
  offset: PropTypes.number,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  key: PropTypes.number,
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  action: PropTypes.object,
  anchorOrigin: PropTypes.object
}

export default withTheme(
  withStyles(styles)(NotificationBar)
)
