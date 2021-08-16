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
  box: {
    width: '80vw',
    height: '80vh',
    position: 'fixed',
    left: '10vw',
    top: '10vh',
    zIndex: 1251,
    padding: theme.spacing(2),
    background: '#fff',
    boxSizing: 'border-box',
    // overflow: 'scroll',
    paddingTop: theme.spacing(3) + 'px'
  },
  content: {
    width: '100%',
    height: '100%',
    overflow: 'scroll'
  },
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    position: 'absolute',
    top: '-' + theme.spacing(1) + 'px',
    right: '-' + theme.spacing(1) + 'px',
    color: theme.palette.secondary.contrastText,
    textAlign: 'center',
    lineHeight: theme.spacing(4) + 'px',
    cursor: 'pointer',
    borderRadius: theme.spacing(0.5),
    background: theme.palette.primary.main
  },
  icon: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    verticalAlign: 'unset'
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
            <Grid className={classes.box}>
              <span className={classes.close} onClick={(e) => onClose()}>
                <FontAwesomeIcon className={classes.icon} icon={plClose} />
              </span>
              <Grid className={classes.content}>
                {children}
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
