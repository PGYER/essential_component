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
    const { key, theme, level, open, onClose, message, action, anchorOrigin } = this.props
    const palette = theme.palette[['success', 'warning', 'error'][level || 0] || 'success']
    const icon = [psConfirm, psExclamationTriangle, psClose][level || 0] || psConfirm

    const messageBody = (
      <>
        <span style={{ color: palette.main }}>
          <FontAwesomeIcon icon={icon} /> &nbsp;&nbsp;
        </span>
        <Typography variant='body2' component='span'>{message}</Typography>
      </>
    )

    return (
      <Snackbar
        key={key}
        anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={onClose}
        ContentProps={{
          style: { borderLeft: theme.spacing(0.5) + 'px solid ' + palette.main }
        }}
        message={messageBody}
        action={action}
      />
    )
  }
}

NotificationBar.propTypes = {
  level: PropTypes.number.isRequired,
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
