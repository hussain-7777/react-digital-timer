// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  timerLimit: 25,
  isTimerRunning: false,
  timeElapsedInSecs: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.IntervalId)

  onDecrementTimerLimit = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onIncrementTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimit, timeElapsedInSecs} = this.state
    const isButtonsDisabled = timeElapsedInSecs > 0

    return (
      <div className="timer-limit-controller-con">
        <p>Set Timer limit</p>
        <div className="timer-limit-con">
          <button
            type="button"
            className="timer-limit-btn"
            onClick={this.onDecrementTimerLimit}
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <div className="timer-limit-value-con">
            <p>{timerLimit}</p>
          </div>
          <button
            type="button"
            className="timer-limit-btn"
            onClick={this.onIncrementTimerLimit}
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onTimerReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onIncrementtimeElapsedInSecs = () => {
    const {timerLimit, timeElapsedInSecs} = this.state
    const isTimerCompleted = timeElapsedInSecs === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSecs: prevState.timeElapsedInSecs + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSecs, timerLimit} = this.state
    const isTimerCompleted = timeElapsedInSecs === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSecs: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.onIncrementtimeElapsedInSecs, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAlt = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-con">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            className="timer-controller-icon"
            alt={startOrPauseAlt}
          />
          <p className="timer-controller-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onTimerReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="timer-controller-icon"
            alt="reset icon"
          />
          <p className="timer-controller-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSecs, timerLimit} = this.state
    const totalSecondsRemaining = timerLimit * 60 - timeElapsedInSecs
    const minutes = Math.floor(totalSecondsRemaining / 60)
    const seconds = Math.floor(totalSecondsRemaining % 60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerLabel = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-bg-con">
        <h1>Digital Timer</h1>
        <div className="digital-timer-con">
          <div className="timer-display-con">
            <div className="elapsed-time-con">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-label">{timerLabel}</p>
            </div>
          </div>
          <div className="timer-controls-con">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
