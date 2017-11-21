import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

const timer = null;
class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 30 };
    this.timer = 0;
  }

  componentDidMount() {
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };
  secondsToTime(secs) {
    const hours = Math.floor(secs / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  };

  render() {
    return (
      <View>
        <Button transparent dark onPress={this.startTimer}>
          <Text>
            Start s: {this.state.time.s}
            {/* m: {this.state.time.m} */}
          </Text>
        </Button>
      </View>
    );
  }
}
// let smallTimer = null;
// export default function getTimer() {
//   if (smallTimer == null) {
//     smallTimer = new Timer();
//   }
//   return smallTimer;
// }
export default Timer;
