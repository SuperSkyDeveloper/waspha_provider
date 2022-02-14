import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './ChartStyles';
import {Colors, Metrics} from './../../theme';
import {BarChart} from 'react-native-chart-kit';

export default function ChartView(props) {
  const {data} = props;

  let earningData = [];
  // get value from data push into array
  data.earning &&
    data.earning.orders &&
    data.earning.orders.map((item) => {
      earningData.push(item.total_earning);
    });

  const barData = {
    labels: ['10', '15', '20', '25', '30', '35'],
    datasets: [
      {
        data: earningData,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.background.accent,
    backgroundGradientFrom: Colors.background.accent,
    backgroundGradientTo: Colors.background.accent,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <>
      {!_.isEmpty(earningData) && (
        <BarChart
          style={{borderRadius: Metrics.borderRadius}}
          data={barData}
          width={Metrics.screenWidth - 20}
          height={220}
          // yAxisLabel={'$'}
          chartConfig={chartConfig}
          withInnerLines={true}
          showBarTops={true}
          showValuesOnTopOfBars={false}
        />
      )}
    </>
  );
}
