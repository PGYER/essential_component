// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// components
import Grid from '@material-ui/core/Grid'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

import DatePickerBase from '../DatePicker/DatePickerBase'
import TimePicker from '../TimePicker/index'

const styles = (theme) => ({
  dateTime: {
    width: theme.spacing(27)
  },
  dateTimeInput: {
    width: `clac(100% - ${theme.spacing(2)}px)`,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    marginLeft: theme.spacing(1),
    border: '1px solid ' + theme.palette.border,
    borderRadius: theme.spacing(0.5),
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center'
  },
  time: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer'
  }
})

class DateTimePicker extends React.Component {
  constructor (props) {
    super(props)
    const now = props.divideTime > 0 ? new Date(props.divideTime) : new Date()

    this.state = {
      timeAnchor: null,
      resultDate: props.time > 0 ? new Date(this.timeStampToDate(props.time)).getTime() : 0,
      resultTime: props.time > 0 ? (this.timeStampToTime(props.time).split(':')[0] * 60 * 60 + this.timeStampToTime(props.time).split(':')[1] * 60) * 1000 : 0,
      date: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        divideDate: props.divideTime > 0 ? new Date(this.timeStampToDate(props.divideTime)).getTime() : 0,
        divideType: props.divideType,
        startDate: props.time && props.time > 0 ? new Date(this.timeStampToDate(props.time)).getTime() : 0,
        language: !props.language ? 'zh-cn' : props.language
      },
      time: {
        hour: this.timeStampToTime(props.time) ? this.timeStampToTime(props.time).split(':')[0] : 0,
        minute: this.timeStampToTime(props.time) ? this.timeStampToTime(props.time).split(':')[1] : 0
      }
    }
  }

  timeStampToDate (timestamp) {
    if (timestamp <= 0) {
      return ''
    }
    const date = new Date(timestamp)
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/')
  }

  timeStampToTime (timestamp) {
    if (timestamp <= 0) {
      return ''
    }
    const date = new Date(timestamp)
    return [date.getHours, date.getMinutes()].join(':')
  }

  formatNumber (num) {
    return num < 10 ? '0' + num : num
  }

  formatDate (timestamp) {
    if (timestamp <= 0) {
      return ''
    }
    const date = new Date(timestamp)

    if (this.state.date.language === 'zh-cn') {
      return [date.getFullYear(), this.formatNumber(date.getMonth() + 1), this.formatNumber(date.getDate())].join('-')
    } else {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')
    }
  }

  formatTime (timestamp) {
    if (timestamp <= 0) {
      return ''
    }

    const time = timestamp / 1000
    const hours = parseInt(time / (60 * 60))
    const minutes = parseInt((time - hours * 60 * 60) / 60)

    return this.formatNumber(hours) + ':' + this.formatNumber(minutes)
  }

  changeDate (data) {
    const { date } = this.state
    this.setState({
      resultDate: data.startDate,
      date: { ...date, ...data }
    })
    setTimeout(() => this.checkDateTime())
  }

  changeTime (data) {
    this.setState({
      timeAnchor: null,
      resultTime: (data.hour * 60 * 60 + data.minute * 60) * 1000,
      time: {
        hour: data.hour,
        minute: data.minute
      }
    })
    setTimeout(() => this.checkDateTime())
  }

  checkDateTime () {
    const { resultDate, resultTime, date } = this.state
    const { divideTime, divideType } = this.props

    const result = resultDate + resultTime

    if (!divideTime || !divideType) {
      this.onChange()
      return true
    }

    let fixedResult = 0
    if (divideType === 'before' && result >= divideTime) {
      fixedResult = divideTime - 60 * 60 * 1000
    } else if (divideType === 'after' && result <= divideTime) {
      fixedResult = divideTime + 60 * 60 * 1000
    }

    if (fixedResult) {
      const fixedDate = this.timeStampToDate(fixedResult)
      const fixedTime = this.timeStampToTime(fixedResult)

      this.setState({
        resultDate: new Date(fixedDate).getTime(),
        resultTime: (fixedTime.split[0] * 60 * 60 + fixedTime.split[1] * 60) * 1000,
        date: { ...date, ...{ startDate: new Date(fixedDate).getTime } }
      })
    }

    setTimeout(() => this.onChange())
  }

  onChange () {
    const { resultDate, resultTime } = this.state
    const { onChange } = this.props

    onChange({ date: resultDate + resultTime })
  }

  render () {
    const { classes, language } = this.props
    const { date, resultDate, resultTime, timeAnchor, time } = this.state
    const formatDate = this.formatDate(resultDate)
    const formatTime = this.formatTime(resultTime)

    return (
      <Grid className={classes.dateTime}>
        <Grid className={classes.dateTimeInput}>
          <Grid><Typography variant={formatDate ? 'body1' : 'body2'}>{formatDate || (language === 'zh-cn' ? '选择日期' : 'Date')}</Typography></Grid>
          {formatDate &&
            <Grid className={classes.time} onClick={e => this.setState({ timeAnchor: e.currentTarget })}>
              <Typography variant={formatTime ? 'body1' : 'body2'}>{formatTime || (language === 'zh-cn' ? '选择时间' : 'Time')}</Typography>
            </Grid>}
        </Grid>
        <DatePickerBase {...date} onChange={data => this.changeDate(data)} />
        <Popover
          open={Boolean(timeAnchor)}
          elevation={10}
          id='time-picker'
          anchorEl={timeAnchor}
          classes={{ paper: classes.popover }}
          onClose={() => this.setState({ timeAnchor: null })}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: -4 }}
        >
          <TimePicker
            language={!this.props.language ? 'zh-cn' : this.props.language}
            hour={time.hour}
            minute={time.minute}
            confirm={data => this.changeTime(data)}
          />
        </Popover>
      </Grid>
    )
  }
}

DateTimePicker.propTypes = {
  divideTime: PropTypes.number,
  divideType: PropTypes.oneOf([undefined, 'before', 'after']),
  time: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['zh-cn', 'en-us']),
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DateTimePicker)
