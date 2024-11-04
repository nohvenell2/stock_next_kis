// This software includes components from TradingView licensed by TradingView Inc.
// See https://www.tradingview.com/ for more information.
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { modTime } from '@/util/format_time';
import IndexChartLegend from './IndexChart_legend';

const IndexChart = ({ chartTitle, data_index }) => {
    const chartContainerRef = useRef();
    const [cursorData, setCursorData] = useState(null)
    const time_formatter_ko = (time) => modTime(time) //그래프 x 축 시간 형식 변경함수
    useEffect(() => {
        if (data_index){
            // 차트 생성
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { color: '#ffffff' },
                    textColor: '#333333',
                    //저작권 로고
                    attributionLogo:true,
                },
                grid: {
                    vertLines: { color: '#f0f0f0' },
                    horzLines: { color: '#f0f0f0' },
                },
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientWidth * 0.4,
                timeScale: {
                    timeVisible: true,
                    borderColor: '#D1D4DC',
                },
                rightPriceScale: {
                    borderColor: '#D1D4DC',
                },
                localization:
                {
                    //todo timeFormatter: (time)=>{ date = new Date(time*1000) ...}
                    timeFormatter: time_formatter_ko
                },
            });

            // 캔들스틱 시리즈 설정
            const areaSeries = chart.addAreaSeries({
                lineColor:'#2962FF',
                bottomColor: '#FFFFFF',
                topColor:'#FFFFFF',
                lineWidth:2
            });

            // 데이터 설정
            areaSeries.setData(data_index);

            const recentPeriodStart = data_index[data_index.length - 365]?.time || data_index[0]?.time; // 최근 n일 기준
            const recentPeriodEnd = data_index[data_index.length - 1]?.time;
            chart.timeScale().setVisibleRange({
                from: recentPeriodStart,
                to: recentPeriodEnd,
            });
            chart.subscribeCrosshairMove((param) => {
                if (param.time) {
                    const data = param.seriesData.get(areaSeries)
                    setCursorData(data)
                }
            })

            // 차트 크기 조정 이벤트 리스너
            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientWidth * 0.4
                });
            };
            window.addEventListener('resize', handleResize);
            // 클린업 함수
            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        }
    }, []);
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            { data_index?
                <div ref={chartContainerRef} className="w-full relative" >
                    <IndexChartLegend chartTitle={chartTitle} cursorData={cursorData}/>
                </div>
                :
                <></>
            }
        </div>
    );
};

export default IndexChart;