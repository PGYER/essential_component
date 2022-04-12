// core
import React from 'react'
import PropTypes from 'prop-types'

// components
import DatePickerBase from './DatePickerBase'

class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    const now = props.divideDate > 0 ? new Date(props.divideDate) : new Date()
    this.state = {
      mode: props.mode,
      divideDate: props.divideDate,
      divideType: props.divideType,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      startDate: !props.startDate ? 0 : props.startDate,
      endDate: props.startDate && props.mode !== 'range' ? props.startDate : (!props.endDate ? 0 : props.endDate),
      endDateTmp: 0,
      language: !props.language ? 'zh-cn' : props.language
    }
  }

  render () {
    const { onChange } = this.props
    return (
      <DatePickerBase
        {...this.state}
        onChange={data => {
          if (this.state.mode === 'range') {
            data.startDate && data.endDate && onChange({
              start: data.startDate,
              end: data.endDate
            })
          } else {
            data.startDate && onChange({
              date: data.startDate
            })
          }

          this.setState({ ...this.state, ...data })
        }}
      />
    )
  }
}

DatePicker.propTypes = {
  mode: PropTypes.oneOf([undefined, 'range']),
  divideDate: PropTypes.number,
  divideType: PropTypes.oneOf([undefined, 'before', 'after']),
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['zh-cn', 'en-us'])
}

export default DatePicker
