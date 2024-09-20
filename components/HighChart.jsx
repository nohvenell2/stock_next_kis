'use client'
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts/highstock';
const HighchartsReact = dynamic(() => import('highcharts-react-official').then(mod => mod.default), { ssr: false });

const HighChart = ({data}) => {
  const options = {
    chart:{
      height:'60%'
    },
    accessibility:{
      enabled: false
    },
    credits:{
      enabled: false
    },
    rangeSelector: {
      selected: 1
    },
    /*
    title: {
      text: 'Stock Price Candlestick Chart'
    },
    */
    xAxis: {
      type: 'datetime',
    },
    yAxis: [{
      /*
      title: {
        text: 'OHLC'
      },
      */
      height: '70%',
      lineWidth: 2,
      resize: {
        enabled: true
      },
      offset: 20,
      labels:{
        align:'left',
        x:3
      }
      
    }, {
      /*
      title: {
        text: 'Volume'
      },
      */
      top: '72%',
      height: '28%',
      lineWidth: 2,
      offset: 20,
      labels:{
        align:'left',
        x:3
      }
  }],
    series: [
      {
        type: 'candlestick',
        name: 'Stock Price',
        data: data[1],
        tooltip: {
          valueDecimals: 0
        },
        yAxis:0
      },
      {
        type: 'column',
        name: 'Volume',
        data: data[2],
        yAxis:1
      }
    ],
    plotOptions: {
      candlestick: {
        color: 'dodgerblue',
        lineColor: 'blue',
        upColor: 'tomato',
        upLineColor: 'red'
      }
    },
  };
  return (
    data.length === 0 ? <div>Select Stock</div> :
    <div>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'} // Highstock 사용
      options={options}
    />
  </div>
  )
}
export default HighChart;
