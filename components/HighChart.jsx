'use client'
import Highcharts from 'highcharts/highstock';
import { useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Options_Korean from '@/constants/chart_korean.js';
//차트 한글화 옵션
const lang_Options = Options_Korean
const HighChart = ({ data }) => {
    //차트 한글화 적용
    useEffect(() => {
        if (typeof Highcharts !== 'undefined') {
            Highcharts.setOptions(lang_Options);
        }
    }, [])
    const options = {
        /*
        title: {
            text: 'Stock Price Candlestick Chart'
        },
        */
        chart: {
            height: '55%',
            /* reflow: false */
        },
        accessibility: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        rangeSelector: {
            selected: 1,
            //inputEnabled:false,
            //범위 설정 옵션 한글화
            inputDateFormat: '%Y %b %e일',
            //버튼 한글화
            buttons: [{
                type: 'month',
                count: 1,
                text: '1달',
            }, {
                type: 'month',
                count: 3,
                text: '3달',
            }, {
                type: 'month',
                count: 6,
                text: '반년',
            }, {
                type: 'ytd',
                text: '올해',
            }, {
                type: 'year',
                count: 1,
                text: '1년',
            }, {
                type: 'all',
                text: '전체',
            }
            ]
        },
        navigator: {
            //enabled:false,
            adaptToUpdatedData: false,
            handles: {
                enabled: false
            },
            xAxis: {
                dateTimeLabelFormats: {
                    day: '%b. %e일',
                    week: '%b. %e일',
                    month: '%y년 \'%b',
                    year: '%Y년'
                }
            },
        },
        xAxis: {
            type: 'datetime',
            //x축 날짜 한글화
            dateTimeLabelFormats: {
                millisecond: '%H시 %M분 %S초 %L밀리초',
                second: '%H시 %M분 %S초',
                minute: '%H시 %M분',
                hour: '%H시 %M분',
                day: '%b %e일',  // 월은 한국어로 표시되도록 설정 필요
                week: '%b %e일',
                month: '%Y년 %b',  // %b는 월의 축약형인데, 한국어로 표기되도록 설정 필요
                year: '%Y년'
            },
        },
        yAxis: [{
            /*
            title: {
            s    text: 'OHLC'
            },
            */
            height: '75%',
            lineWidth: 2,
            resize: {
                enabled: true
            },
            offset: 20,
            labels: {
                align: 'left',
                x: 3,
                format: '{text}원'
            }

        }, {
            /*
            title: {
                text: 'Volume'
            },
            */
            top: '77%',
            height: '23%',
            lineWidth: 2,
            offset: 20,
            labels: {
                align: 'left',
                x: 3
            }
        }],
        series: [
            {
                type: 'candlestick',
                name: 'Stock Price',
                data: data[1],
                tooltip: {
                    valueDecimals: 0,
                    pointFormat: `
                        <b style="fontSize: 14px;"> OHLC</b><br/>
                        <span style="fontSize: 14px;">시가: {point.open} 원</span><br/>
                        <span style="fontSize: 14px;">고가: {point.high} 원</span><br/>
                        <span style="fontSize: 14px;">저가: {point.low} 원</span><br/>
                        <span style="fontSize: 14px;">종가: {point.close} 원</span>
                    `,
                },
                yAxis: 0
            },
            {
                type: 'column',
                name: '거래량',
                data: data[2],
                yAxis: 1
            }
        ],
        plotOptions: {
            candlestick: {
                color: 'dodgerblue',
                lineColor: 'blue',
                upColor: 'tomato',
                upLineColor: 'red'
            },
        },
        //툴팁 한글화
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H시 %M분 %S초 %L밀리초',
                second: '%H시 %M분 %S초',
                minute: '%H시 %M분',
                hour: '%H시 %M분',
                day: '%Y년 %b %e일 %A',
                week: '%b %e일',
                month: '%Y년 %b',
                year: '%Y년'
            },
            style: {
                fontSize: '16px'
            }
        }
    };
    return (
        data.length === 0 ? <div>No Data</div> :
            <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'} // Highstock 사용
                    options={options}
            />
    )
}
export default HighChart;
