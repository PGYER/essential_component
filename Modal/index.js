// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { plClose } from '@pgyer/icons'

// style
const styles = theme => ({
  mask: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: '#000',
    opacity: '0.2',
    zIndex: 1251
  },
  content: {
    width: '80vw',
    height: '80vh',
    position: 'fixed',
    left: '10vw',
    top: '10vh',
    zIndex: 1251,
    padding: theme.spacing(2),
    background: '#fff',
    boxSizing: 'border-box',
    overflow: 'scroll'
  },
  close: {
    fontSize: theme.spacing(3) + 'px',
    position: 'absolute',
    right: theme.spacing(4) + 'px',
    top: theme.spacing(3) + 'px',
    cursor: 'pointer',
    color: '#8C8C8C'
  }
})

class Modal extends React.Component {
  render () {
    const { open, children, classes, onClose } = this.props
    return (
      <>
        {open && <Grid className={classes.mask} onClick={() => onClose()} />}
        {
          open &&
            <Grid className={classes.content}>
              {children}
              <Grid className={classes.close} onClick={() => onClose()}>
                <FontAwesomeIcon icon={plClose} />
              </Grid>
            </Grid>
        }
      </>
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(Modal)
