// core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { psCaretDown } from '@pgyer/icons'

const styles = (theme) => ({
  datePicker: {
    userSelect: 'none',
    textAlign: 'center',
    width: theme.spacing(27)
  },
  datePickerHeader: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(5)
  },
  previousOrNext: {
    cursor: 'pointer',
    marginBottom: '6px',
    width: theme.spacing(4),
    lineHeight: theme.spacing(4) + 'px',
    '&:hover svg': {
      color: theme.palette.text.main
    }
  },
  icon: {
    fontSize: '8px',
    color: theme.palette.text.light
  },
  previousIcon: {
    transform: 'rotate(90deg)'
  },
  nextIcon: {
    transform: 'rotate(-90deg)'
  },
  yearAndMonth: {
    width: theme.spacing(19),
    '& span': {
      display: 'inline-block',
      lineHeight: theme.spacing(3) + 'px'
    }
  },
  showSelect: {
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 'bold'
    }
  },
  year: {
    width: theme.spacing(6)
  },
  month: {
    width: theme.spacing(3)
  },
  calendar: {
    display: 'flex',
    flexWrap: 'wrap',
    '& div': {
      fontSize: '12px'
    }
  },
  day: {
    display: 'flex',
    height: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  dayLabel: {
    cursor: 'pointer',
    position: 'relative',
    width: theme.spacing(3),
    lineHeight: theme.spacing(3) + 'px',
    '&:hover': {
      background: theme.palette.background.main
    }
  },
  dayLabelDisabled: {
    cursor: 'default',
    '&:hover': {
      background: 'none'
    }
  },
  disableSelect: {
    cursor: 'not-allowed',
    '&:hover': {
      background: 'none'
    }
  },
  dayLabelChecked: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main + ' !important'
  },
  dayLabelStart: {
    borderRadius: '4px 0px 0px 4px !important'
  },
  dayLabelEnd: {
    borderRadius: '0px 4px 4px 0px !important'
  },
  dayLabelStartEnd: {
    borderRadius: '4px !important'
  },
  dayLabelRange: {
    background: theme.palette.background.main
  },
  dayLabelDiffMonth: {
    color: theme.palette.text.lighter
  },
  dayLabelToday: {
    lineHeight: '22px',
    borderRadius: '4px',
    border: '1px solid ' + theme.palette.primary.main
  },
  dayAfter: {
    width: theme.spacing(1)
  },
  yearOrMonth: {
    width: '33.33%',
    cursor: 'pointer',
    height: theme.spacing(7),
    '& div': {
      lineHeight: theme.spacing(7) + 'px'
    },
    '&:hover': {
      background: theme.palette.background.main
    }
  },
  yearOrMonthActive: {
    background: theme.palette.primary.main + ' !important',
    '& div': {
      color: theme.palette.primary.contrastText
    }
  }
})

class DatePickerBase extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      days: [],
      selectYearStart: 0,
      showSelectYear: false,
      showSelectMonth: false
    }
  }

  componentDidMount () {
    this.setDays(this.props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.year !== this.props.year || nextProps.month !== this.props.month) {
      this.setDays(nextProps)
      return false
    }

    return true
  }

  setDays (props) {
    const { year, month, language } = props
    const days = {
      'zh-cn': ['一', '二', '三', '四', '五', '六', '日'],
      'en-us': ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    }[language]
    let date = this.timeStampToDate(new Date([year, this.formatNumber(month)].join('-')).getTime())
    date = this.diffOneDayDate(date, 1 - (!date.getDay() ? 7 : date.getDay()))

    while (days.length !== 7 * 7) {
      days.push(date)
      date = this.diffOneDayDate(date, 1)
    }

    this.setState({ days: days, selectYearStart: year })
  }

  diffOneDayDate (date, change) {
    return this.timeStampToDate(date.getTime() + 24 * 3600 * 1000 * change)
  }

  timeStampToDate (timestamp) {
    const date = new Date(timestamp)
    return timestamp && new Date([date.getFullYear(), this.formatNumber(date.getMonth() + 1), this.formatNumber(date.getDate()) + 'T00:00:00'].join('-'))
  }

  formatNumber (num) {
    return num < 10 ? '0' + num : num
  }

  changeDateRange (date) {
    const { mode, onChange } = this.props
    const startDate = this.timeStampToDate(this.props.startDate)
    const endDate = this.timeStampToDate(this.props.endDate)

    if (mode === 'range') {
      if (!startDate) {
        onChange({
          startDate: date.getTime(),
          endDate: 0,
          endDateTmp: 0
        })
      } else {
        const canSetEnd = !endDate && date.getTime() >= startDate.getTime()
        onChange({
          startDate: canSetEnd ? startDate.getTime() : date.getTime(),
          endDate: canSetEnd ? date.getTime() : 0,
          endDateTmp: 0
        })
      }
    } else {
      onChange({
        startDate: date.getTime(),
        endDate: date.getTime()
      })
    }
  }

  changeMonth (change) {
    const { year, month, onChange, hidePrevious } = this.props

    const monthTmp = month + (hidePrevious ? 0 : change)
    const newYear = year + (monthTmp > 12 ? 1 : (monthTmp < 1 ? -1 : 0))
    const newMonth = monthTmp > 12 ? 1 : (monthTmp < 1 ? 12 : monthTmp)
    onChange({ year: newYear, month: newMonth })
  }

  getYearRange () {
    const { selectYearStart } = this.state
    let startYear = selectYearStart - (selectYearStart % 10)
    startYear = selectYearStart === startYear ? startYear - 10 : startYear

    return new Array(12).fill(startYear).map((item, index) => (item + index))
  }

  changeYearRange (change) {
    const { selectYearStart } = this.state
    let newSelectYearStart = selectYearStart + change
    newSelectYearStart = newSelectYearStart <= 0 ? selectYearStart : newSelectYearStart

    this.setState({ selectYearStart: newSelectYearStart })
  }

  isZHCN () {
    return this.props.language === 'zh-cn'
  }

  render () {
    const { mode, divideDate, divideType, year, month, onChange, hidePrevious, hideNext, timezoneOffset, classes } = this.props
    const { days, showSelectYear, showSelectMonth } = this.state

    const startDate = this.timeStampToDate(this.props.startDate)
    const endDate = this.timeStampToDate(this.props.endDate)
    const endDateTmp = this.timeStampToDate(this.props.endDateTmp)
    const nowDate = this.timeStampToDate(new Date().getTime() + (timezoneOffset || 0))
    const years = showSelectYear && this.getYearRange()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
      <Grid container className={classes.datePicker}>
        <Grid item xs={12} className={classes.datePickerHeader}>
          <Grid
            className={classes.previousOrNext}
            onClick={e => {
              showSelectYear && this.changeYearRange(-10)
              !showSelectYear && !showSelectMonth && this.changeMonth(-1)
            }}
          >
            {(!hidePrevious || showSelectYear) && !showSelectMonth && <FontAwesomeIcon icon={psCaretDown} className={[classes.icon, classes.previousIcon].join(' ')} />}
          </Grid>
          <Grid className={classes.yearAndMonth}>
            {!showSelectYear && !showSelectMonth &&
              <Typography variant='body1' component='div'>
                <span className={classes.showSelect} onClick={e => this.setState({ showSelectYear: true })}>
                  <span className={classes.year}>{year}</span><span>{this.isZHCN() ? '年' : ''}</span>
                </span>
                <span className={classes.showSelect} onClick={e => this.setState({ showSelectMonth: true })}>
                  <span className={classes.month}>{this.isZHCN() ? month : months[month - 1]}</span><span>{this.isZHCN() ? '月' : ''}</span>
                </span>
              </Typography>}
            {showSelectYear && <Typography variant='body1' component='div'>{years[1]} - {years[10]}</Typography>}
            {showSelectMonth && <Typography variant='body1' component='div'>{this.isZHCN() ? month + ' 月' : months[month - 1]}</Typography>}
          </Grid>
          <Grid
            className={classes.previousOrNext}
            onClick={e => {
              showSelectYear && this.changeYearRange(10)
              !showSelectYear && !showSelectMonth && this.changeMonth(1)
            }}
          >
            {(!hideNext || showSelectYear) && !showSelectMonth && <FontAwesomeIcon icon={psCaretDown} className={[classes.icon, classes.nextIcon].join(' ')} />}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.calendar}>
          {!showSelectYear && !showSelectMonth && days.map((date, index) => {
            const isDate = typeof date === 'object'
            const isSameMonth = isDate && date.getMonth() + 1 === month
            const disableSelect = isDate && mode !== 'range' && divideDate > 0 && (date.getFullYear() !== new Date(divideDate).getFullYear() || date.getMonth() !== new Date(divideDate).getMonth() || date.getDate() !== new Date(divideDate).getDate()) &&
            ((divideType === 'before' && date.getTime() > divideDate) || (divideType === 'after' && date.getTime() < divideDate))
            let isStartDate = false
            let isEndDate = false
            let isRangeDate = false
            const isToday = isDate && date.getTime() === nowDate.getTime()

            if (isSameMonth) {
              isStartDate = startDate && date.getTime() === startDate.getTime()
              isEndDate = endDate && date.getTime() === endDate.getTime()

              if (mode === 'range') {
                isRangeDate = !isStartDate && !isEndDate && startDate && date.getTime() > startDate.getTime() &&
                  ((endDate && date.getTime() < endDate.getTime()) || (endDateTmp && date.getTime() <= endDateTmp.getTime()))
              }
            }

            return (
              <Grid key={index} className={classes.day}>
                <Typography
                  variant='body1'
                  component='div'
                  className={[
                    classes.dayLabel,
                    !isDate ? classes.dayLabelDisabled : '',
                    disableSelect ? classes.disableSelect : '',
                    !isSameMonth ? classes.dayLabelDiffMonth : '',
                    isStartDate || isEndDate ? classes.dayLabelChecked : '',
                    isStartDate && !isEndDate ? classes.dayLabelStart : '',
                    isEndDate && !isStartDate ? classes.dayLabelEnd : '',
                    isStartDate && isEndDate ? classes.dayLabelStartEnd : '',
                    isRangeDate ? classes.dayLabelRange : '',
                    isToday ? classes.dayLabelToday : ''
                  ].filter(item => item).join(' ')}
                  onClick={e => isDate && !disableSelect && this.changeDateRange(date)}
                  onMouseOver={e => {
                    if (mode === 'range' && isDate && startDate && !endDate) {
                      onChange({ endDateTmp: date.getTime() })
                    }
                  }}
                >
                  {isDate ? date.getDate() : date}
                </Typography>
                {(index + 1) % 7 !== 0 &&
                  <Grid className={[
                    classes.dayAfter,
                    (isRangeDate && (endDate || (endDateTmp && endDateTmp.getTime() !== date.getTime()))) ||
                    (isStartDate && ((endDate && !isEndDate) || (endDateTmp && endDateTmp.getTime() > startDate.getTime()))) ? classes.dayLabelRange : ''
                  ].join(' ')}
                  />}
              </Grid>
            )
          })}

          {showSelectYear && years.map((item, index) =>
            <Grid
              key={index}
              className={[classes.yearOrMonth, year === item ? classes.yearOrMonthActive : ''].join(' ')}
              onClick={e => {
                onChange({ year: item })
                this.setState({ showSelectYear: false, showSelectMonth: true })
              }}
            >
              <Typography variant='h6' component='div'>{item}</Typography>
            </Grid>
          )}

          {showSelectMonth && months.map((item, index) =>
            <Grid
              key={index}
              className={[classes.yearOrMonth, (index + 1) === month ? classes.yearOrMonthActive : ''].join(' ')}
              onClick={e => {
                onChange({ month: index + 1 })
                this.setState({ showSelectMonth: false })
              }}
            >
              <Typography variant='h6' component='div'>{this.isZHCN() ? index + 1 : item}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }
}

DatePickerBase.propTypes = {
  mode: PropTypes.oneOf([undefined, 'range']),
  divideDate: PropTypes.number,
  divideType: PropTypes.oneOf([undefined, 'before', 'after']),
  year: PropTypes.number,
  month: PropTypes.number,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  endDateTmp: PropTypes.number,
  onChange: PropTypes.func,
  language: PropTypes.oneOf(['zh-cn', 'en-us']),
  hidePrevious: PropTypes.bool,
  hideNext: PropTypes.bool,
  timezoneOffset: PropTypes.number,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DatePickerBase)
