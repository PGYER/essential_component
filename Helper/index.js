// core
import React from 'react'
import PropTypes from 'prop-types'

// components
import { withStyles, withTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { plHelp, plAngleDown } from '@pgyer/icons'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import MFEContainer from '../MFEContainer'
import Modal from '../Modal'

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
    transition: 'all .1s',
    right: 0,
    zIndex: 1250,
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
  hideHelper: {
    right: '-30px'
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
    transition: 'all .3s',
    right: theme.spacing(2) + 'px',
    width: theme.spacing(45),
    height: theme.spacing(66),
    zIndex: 1250,
    boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.21)',
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1) + 'px'
  },
  showRobot: {
    bottom: theme.spacing(1) + 'px'
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
  }
})

class Helper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      hooks: Object.create({}),
      showCreateTicket: false
    }

    this.tag = new Date().getTime()
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

    this.setState({
      hooks: {
        ...this.state.hooks,
        createTicket: () => {
          this.setState({ showCreateTicket: true })
        }
      }
    })
  }

  show () {
    if (this.state.open) {
      return true
    }

    this.setState({
      open: true
    })
  }

  hide () {
    this.setState({
      open: false
    })
  }

  isZHCN () {
    return this.props.language === 'zh-cn'
  }

  render () {
    const { classes } = this.props
    const { open, showCreateTicket, hooks } = this.state
    return (
      <>
        <Grid className={[classes.helper, open ? classes.hideHelper : ''].join(' ')} onClick={() => this.show()}>
          <FontAwesomeIcon icon={plHelp} className={classes.helperIcon} />
          <Typography variant='body1' component='div' className={classes.helperText}>{this.isZHCN() ? '帮助' : 'HELP'}</Typography>
        </Grid>
        <Grid className={[classes.robot, open ? classes.showRobot : ''].join(' ')}>
          <Grid className={classes.robotHeader}>
            <Grid>
              <Typography variant='body1' component='span' className={classes.white}>{this.isZHCN() ? '文档' : 'DOC'} | Powered By Seed</Typography>
            </Grid>
            <Grid className={classes.down} onClick={() => this.hide()}><FontAwesomeIcon icon={plAngleDown} className={classes.helperIcon} /></Grid>
          </Grid>
          <Grid className={classes.robotBody}>
            <MFEContainer
              appID='_pgyer_kf_'
              appPath='app/index.html'
              route='/smartOnline'
              hooks={hooks}
            />
            {showCreateTicket &&
              <Modal open={showCreateTicket} onClose={() => this.setState({ showCreateTicket: false })}>
                <MFEContainer
                  appID='_pgyer_kf_'
                  appPath='app/index.html'
                  route='/createTicket'
                  hooks={hooks}
                />
              </Modal>}
          </Grid>
        </Grid>
      </>
    )
  }
}

Helper.propTypes = {
  classes: PropTypes.object.isRequired,
  language: PropTypes.oneOf(['zh-cn', 'en-us'])
}

export default withTheme(
  withStyles(styles)(Helper)
)
