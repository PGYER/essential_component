// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// components
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  timePickerInput: {
    width: theme.spacing(18),
    '& input': {
      textAlign: 'center',
      letterSpacing: '1px'
    }
  },
  icon: {
    fontSize: theme.spacing(1)
  },
  timePicker: {
    width: 'auto',
    paddingTop: theme.spacing(0.5)
  },
  HMS: {
    width: theme.spacing(7),
    overflow: 'hidden',
    height: theme.spacing(28),
    borderBottom: '1px solid ' + theme.palette.border,
    borderRight: '1px solid ' + theme.palette.border,
    '&:hover': {
      overflowY: 'scroll'
    }
  },
  noBorderRight: {
    borderRight: 0
  },
  label: {
    cursor: 'pointer',
    textAlign: 'center',
    height: theme.spacing(4),
    lineHeight: theme.spacing(4) + 'px',
    '&:hover': {
      background: theme.palette.background.main
    }
  },
  labelActive: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.light + ' !important'
  },
  after: {
    height: theme.spacing(24)
  },
  footer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& a': {
      textDecoration: 'none'
    }
  },
  confirm: {
    padding: '2px 8px',
    minWidth: theme.spacing(5),
    height: theme.spacing(3)
  }
})

class TimePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hour: !props.hour ? 0 : props.hour,
      minute: !props.minute ? 0 : props.minute,
      seconds: !props.seconds ? 0 : props.seconds,
      language: !props.language ? 'zh-cn' : props.language
    }

    this.HMSField = ['hour', 'minute', 'seconds']
    this.HMSArr = [this.createArray(24), this.createArray(60), this.createArray(60)]
    this.HMSRef = [React.createRef(), React.createRef(), React.createRef()]
  }

  componentDidMount () {
    this.scroll('all', 'auto')
  }

  createArray (max) {
    return new Array(max).fill(0).map((item, index) => this.intFillZero(index))
  }

  intFillZero (num) {
    return num < 10 ? '0' + num : num
  }

  scroll (offset, behavior) {
    window.setTimeout(() => {
      const { hour, minute, seconds } = this.state
      const HMSValue = [hour, minute, seconds]
      offset = offset === 'all' ? [0, 1, 2] : [offset]
      offset.map(item => this.HMSRef[item].current && this.HMSRef[item].current.scrollTo({ top: 32 * HMSValue[item], behavior: behavior }))
    }, 0)
  }

  isZHCN () {
    return this.props.language === 'zh-cn'
  }

  renderHMS (offset) {
    const { classes, showSecond } = this.props
    const { hour, minute, seconds } = this.state
    const HMSValue = [hour, minute]
    showSecond && HMSValue.push(seconds)

    return (
      <Grid item className={[classes.HMS, offset === HMSValue.length - 1 ? classes.noBorderRight : ''].join(' ')} ref={this.HMSRef[offset]}>
        {this.HMSArr[offset].map((item, index) => (
          <Typography
            key={index}
            variant='body1'
            component='div'
            onClick={e => {
              const data = {}
              data[this.HMSField[offset]] = index
              this.setState(data)
              this.scroll(offset, 'smooth')
            }}
            className={[classes.label, HMSValue[offset] === index ? classes.labelActive : ''].join(' ')}
          >
            {item}
          </Typography>
        ))}
        <Grid className={classes.after} />
      </Grid>
    )
  }

  render () {
    const { confirm, classes, showSecond } = this.props
    const { hour, minute, seconds } = this.state

    return (
      <>
        <Grid container className={classes.timePicker} direction='column' spacing={0}>
          <Grid item>
            <Grid container>
              {this.renderHMS(0)}
              {this.renderHMS(1)}
              {showSecond && this.renderHMS(2)}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems='center' className={classes.footer}>
              <Grid item>
                <Typography variant='body1' component='div'>
                  <a
                    href='#'
                    onClick={e => {
                      const date = new Date()
                      const data = {
                        hour: date.getHours(),
                        minute: date.getMinutes(),
                        seconds: date.getSeconds()
                      }
                      confirm(data)
                      this.setState(data)
                      this.scroll('all', 'smooth')
                      e.preventDefault()
                    }}
                  >
                    {this.isZHCN() ? '此 刻' : 'Now'}
                  </a>
                </Typography>
              </Grid>
              <Grid item align='right'>
                <Button
                  color='primary'
                  variant='contained'
                  className={classes.confirm}
                  onClick={e => {
                    confirm({ hour: hour, minute: minute, seconds: seconds })
                    this.setState({ anchorEl: null })
                  }}
                >
                  {this.isZHCN() ? '确 定' : 'OK'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}

TimePicker.propTypes = {
  hour: PropTypes.number,
  minute: PropTypes.number,
  seconds: PropTypes.number,
  confirm: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['zh-cn', 'en-us']),
  showSecond: PropTypes.bool,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)((TimePicker))
