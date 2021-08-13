// core
import React from 'react'
import PropTypes from 'prop-types'

// components
import { withStyles, withTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { plHelp, plAngleDown } from '@pgyer/icons'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  hidden: {
    display: 'none'
  },
  helper: {
    width: '30px',
    padding: '15px 0',
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    bottom: theme.spacing(10) + 'px',
    right: 0,
    zIndex: 1200,
    cursor: 'pointer',
    color: '#fff',
    textAlign: 'center',
    fontSize: theme.spacing(1.5) + 'px',
    boxShadow: theme.boxShadow.card,
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  helperIcon: {
    fontSize: theme.spacing(2) + 'px'
  },
  helperText: {
    wordWrap: 'break-word',
    width: theme.spacing(1.5) + 'px',
    textAlign: 'center',
    fontSize: theme.spacing(1.5) + 'px',
    letterSpacing: theme.spacing(1.5) + 'px',
    marginTop: theme.spacing(1.5),
    color: '#fff'
  },
  robot: {
    position: 'fixed',
    bottom: '-' + theme.spacing(70) + 'px',
    right: theme.spacing(2) + 'px',
    width: theme.spacing(45),
    height: theme.spacing(66),
    zIndex: 2000,
    boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.21)',
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1) + 'px'
  },
  robotHeader: {
    width: '100%',
    height: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.spacing(1) + 'px',
    borderTopRightRadius: theme.spacing(1) + 'px',
    padding: '0 ' + theme.spacing(2) + 'px',
    boxSizing: 'border-box',
    color: '#fff',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  robotBody: {
    height: theme.spacing(60)
  },
  white: {
    color: '#fff'
  },
  down: {
    height: '100%',
    flexGrow: 1,
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  leftToRight: {
    animation: '$leftToRight 0.3s ease-out forwards',
    right: '-30px'
  },
  rightToLeft: {
    animation: '$rightToLeft 0.3s ease-in forwards',
    right: 0
  },
  topToBottom: {
    animation: '$topToBottom 0.3s ease-out forwards',
    bottom: '-' + theme.spacing(70)
  },
  bottomToTop: {
    animation: '$bottomToTop 0.3s ease-in forwards',
    bottom: theme.spacing(1) + 'px'
  },
  '@keyframes leftToRight': {
    from: {
      right: '0px'
    },
    to: {
      right: '-30px'
    }
  },
  '@keyframes rightToLeft': {
    from: {
      right: '-30px'
    },
    to: {
      right: '0px'
    }
  },
  '@keyframes topToBottom': {
    from: {
      bottom: theme.spacing(1) + 'px'
    },
    to: {
      bottom: '-' + theme.spacing(70)
    }
  },
  '@keyframes bottomToTop': {
    from: {
      bottom: '-' + theme.spacing(70)
    },
    to: {
      bottom: theme.spacing(1) + 'px'
    }
  }
})

class Helper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      helperClass: '',
      robotClass: ''
    }
  }

  componentDidMount () {
    window.addEventListener('message', (e) => {
      if (e.origin === window.location.origin &&
        e.data &&
        e.data.verifyKey &&
        e.data.verifyKey === 'kf_doc_verify_key'
      ) {
        this.show()
      }
    })
  }

  show () {
    if (this.state.open) {
      return true
    }

    this.setState({
      helperClass: 'leftToRight',
      robotClass: 'bottomToTop'
    })
  }

  hide () {
    this.setState({
      helperClass: 'rightToLeft',
      robotClass: 'topToBottom',
      open: false
    })
  }

  isZHCN () {
    return this.props.language === 'zh-cn'
  }

  render () {
    const { classes, children } = this.props
    const { helperClass, robotClass } = this.state
    return (
      <>
        <Grid className={[classes.helper, helperClass ? classes[helperClass] : ''].join(' ')} onClick={() => this.show()}>
          <FontAwesomeIcon icon={plHelp} className={classes.helperIcon} />
          <Typography variant='body1' component='div' className={classes.helperText}>{this.isZHCN() ? '帮助' : 'HELP'}</Typography>
        </Grid>
        <Grid className={[classes.robot, robotClass ? classes[robotClass] : ''].join(' ')}>
          <Grid className={classes.robotHeader}>
            <Grid>
              <Typography variant='body1' component='span' className={classes.white}>{this.isZHCN() ? '文档' : 'DOC'} | Powered By Seed</Typography>
            </Grid>
            <Grid className={classes.down} onClick={() => this.hide()}><FontAwesomeIcon icon={plAngleDown} className={classes.helperIcon} /></Grid>
          </Grid>
          <Grid className={classes.robotBody}>
            {children}
          </Grid>
        </Grid>
      </>
    )
  }
}

Helper.propTypes = {
  classes: PropTypes.object.isRequired,
  language: PropTypes.oneOf(['zh-cn', 'en-us']),
  children: PropTypes.any.isRequired
}

export default withTheme(
  withStyles(styles)(Helper)
)
