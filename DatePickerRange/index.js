// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// components
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { plCalendar } from '@pgyer/icons'
import DatePickerBase from '../DatePicker/DatePickerBase'

// style
const styles = theme => ({
  datePickerControl: {
    width: theme.spacing(81)
  },
  rangeGroup: {
    width: theme.spacing(19),
    '& button': {
      marginBottom: theme.spacing(1),
      padding: 0 + ' !important'
    }
  },
  datePicker: {
    width: theme.spacing(62)
  },
  btnGroup: {
    width: '100%',
    textAlign: 'right',
    paddingRight: theme.spacing(2),
    '& button': {
      marginLeft: theme.spacing(1)
    }
  }
})

class DatePickerRange extends React.Component {
  constructor (props) {
    super(props)
    const now = new Date()
    this.state = {
      mode: 'range',
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      startDate: !props.startDate ? 0 : props.startDate,
      endDate: !props.endDate ? 0 : props.endDate,
      endDateTmp: 0,
      language: !props.language ? 'zh-cn' : props.language,
      btnOffset: 7
    }
  }

  onChange (data) {
    this.setState({
      ...this.state,
      ...data,
      btnOffset: 7
    })
  }

  setDateRange (offset, btnOffset) {
    let startDate = 0
    let endDate = 0
    const now = new Date().getTime()
    const oneDay = 24 * 3600 * 1000

    if (offset === -1) {
      startDate = 0
    } else if (offset === 0) {
      startDate = endDate = now
    } else if (offset === 1) {
      startDate = endDate = now
    } else if (offset === 2) {
      startDate = endDate = now - oneDay
    } else {
      startDate = now - (offset - 1) * oneDay
      endDate = now
    }

    this.setState({
      startDate: startDate,
      endDate: endDate,
      btnOffset: btnOffset
    })
  }

  isZHCN () {
    return this.props.language === 'zh-cn'
  }

  render () {
    const { year, month, startDate, endDate, btnOffset } = this.state
    const { onChange, onClose, classes } = this.props
    const monthTmp = month + 1
    const newYear = year + (monthTmp > 12 ? 1 : 0)
    const newMonth = monthTmp > 12 ? 1 : monthTmp
    const dateRanges = [
      [0, '项目周期', 'Project Cycle'],
      [1, '今天', 'Today'],
      [2, '昨天', 'Yesterday'],
      [7, '最近 7 天', 'Last 7 Days'],
      [30, '最近一个月', 'Last Month'],
      [90, '最近三个月', 'L Three Months'],
      [365, '最近一年', 'Last Year'],
      [-1, '自定义时间', 'Custom Time']
    ]

    return (
      <Grid container className={classes.datePickerControl} spacing={4}>
        <Grid item className={classes.rangeGroup}>
          {dateRanges.map((item, index) => (
            <Button
              key={index}
              fullWidth
              color='primary'
              variant={btnOffset === index ? 'contained' : 'outlined'}
              onClick={e => this.setDateRange(item[0], index)}
            >
              {this.isZHCN() ? item[1] : item[2]}
            </Button>
          ))}
        </Grid>
        <Grid item className={classes.datePicker}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                disabled
                fullWidth
                variant='outlined'
                value={startDate ? new Date(startDate).toLocaleDateString() : ''}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><FontAwesomeIcon icon={plCalendar} /></InputAdornment>
                }}
              />
              <DatePickerBase
                {...this.state}
                hideNext={Boolean(true)}
                onChange={data => this.onChange(data)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                fullWidth
                variant='outlined'
                value={endDate ? new Date(endDate).toLocaleDateString() : ''}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><FontAwesomeIcon icon={plCalendar} /></InputAdornment>
                }}
              />
              <DatePickerBase
                {...this.state}
                year={newYear}
                month={newMonth}
                hidePrevious={Boolean(true)}
                onChange={data => this.onChange(data)}
              />
            </Grid>
            <Grid className={classes.btnGroup}>
              <Button color='primary' variant='outlined' onClick={() => onClose()}>{this.isZHCN() ? '取消' : 'Cancel'}</Button>
              <Button
                color='primary'
                variant='contained'
                onClick={e => onChange({ start: startDate, end: endDate })}
              >
                {this.isZHCN() ? '确认' : 'Ok'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

DatePickerRange.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  language: PropTypes.oneOf(['zh-cn', 'en-us']),
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DatePickerRange)
