'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import LWChartLegend from './LWChart_legend';

const LWChart = ({ chartTitle, data_ohlc, data_volume }) => {
    const chartContainerRef = useRef();
    const tooltipRef = useRef()
    const [cursorData, setCursorData] = useState(null)
    const price_formatter_ko = p => `${p}`
    useEffect(() => {
        // 차트 생성
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333333',
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
                priceFormatter: price_formatter_ko
                //todo timeFormatter: (time)=>{ date = new Date(time*1000) ...}
            },
        });

        // 캔들스틱 시리즈 설정
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: 'tomato',
            downColor: 'dodgerblue',
            borderVisible: false,
            wickUpColor: 'red',
            wickDownColor: 'blue',
            priceScaleId: 'right',
        });
        candlestickSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1,  // 위쪽 여백 10%
                bottom: 0.2  // 아래쪽 여백 30% (거래량 차트를 위한 공간)
            },
        })

        // 거래량 시리즈 설정
        const volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: 'volume',  // 독립적인 스케일 ID 할당
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8,  // 위쪽 여백 80% (캔들스틱 차트 아래에 배치)
                bottom: 0,  // 아래쪽 여백 없음
            },
        })

        // 데이터 설정
        candlestickSeries.setData(data_ohlc);
        volumeSeries.setData(data_volume);

        const recentPeriodStart = data_ohlc[data_ohlc.length - 90]?.time || data_ohlc[0]?.time; // 최근 90일 기준
        const recentPeriodEnd = data_ohlc[data_ohlc.length - 1]?.time;
        chart.timeScale().setVisibleRange({
            from: recentPeriodStart,
            to: recentPeriodEnd,
        });
        chart.subscribeCrosshairMove((param) => {
            if (param.time) {
                const data = param.seriesData.get(candlestickSeries)
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
    }, []);
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div ref={chartContainerRef} className="w-full relative" >
                <LWChartLegend chartTitle={chartTitle} cursorData={cursorData}/>
            </div>
        </div>
    );
};

export default LWChart;