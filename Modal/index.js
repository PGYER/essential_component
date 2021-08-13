// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

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
    zIndex: 1201
  },
  content: {
    width: '80vw',
    height: '80vh',
    position: 'fixed',
    left: '10vw',
    top: '10vh',
    zIndex: 1202,
    padding: theme.spacing(2),
    background: '#fff',
    boxSizing: 'border-box',
    overflow: 'scroll'
  }
})

class Modal extends React.Component {
  render () {
    const { open, children, classes, onClose } = this.props
    return (
      <>
        {open && <Grid className={classes.mask} onClick={() => onClose()} />}
        {open && <Grid className={classes.content}>{children}</Grid>}
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
