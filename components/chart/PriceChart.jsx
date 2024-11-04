"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import PriceChartLegend from './PriceChart_legend';
import { modTime } from '@/util/format_time';

const PriceChart = ({ chartTitle, data_ohlc, data_volume }) => {
    const chartContainerRef = useRef();
    const chartRef = useRef();
    const candlestickSeriesRef = useRef();
    const lineSeriesRef = useRef();
    const volumeSeriesRef = useRef();
    const [viewPeroid, setViewPeriod] = useState(75);
    const [cursorData, setCursorData] = useState(null);
    const [chartType, setChartType] = useState('Candle');

    const price_formatter_ko = p => `${p}`;
    const time_formatter_ko = (time) => modTime(time);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333333',
                attributionLogo: true,
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
            localization: {
                priceFormatter: price_formatter_ko,
                timeFormatter: time_formatter_ko,
            },
        });
        // chart 의 ref
        chartRef.current = chart;
        // candle stick 차트 설정
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: 'tomato',
            downColor: 'dodgerblue',
            borderVisible: false,
            wickUpColor: 'red',
            wickDownColor: 'blue',
            priceScaleId: 'right',
        });
        candlestickSeries.setData(data_ohlc);
        candlestickSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.1, bottom: 0.2 },
        });
        candlestickSeriesRef.current = candlestickSeries; // 캔들스틱 차트 ref 
        // 거래량 차트 설정
        const volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
            visible:true
        });
        volumeSeries.setData(data_volume);
        volumeSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.8, bottom: 0 },
        });
        volumeSeriesRef.current = volumeSeries; // 거래량 차트 ref
        // 라인 차트 설정
        const lineSeries = chart.addLineSeries({
            color: '#2962FF',
            priceScaleId: 'right',
            visible:false
        });
        lineSeries.setData(data_ohlc.map((d) => ({ time: d.time, value: d.close })));
        lineSeriesRef.current = lineSeries; // 라인 차트 ref

        // 초기에 화면에서 보여주는 주가 날짜 범위 설정
        const recentPeriodStart = data_ohlc[data_ohlc.length - viewPeroid]?.time || data_ohlc[0]?.time;
        const recentPeriodEnd = data_ohlc[data_ohlc.length - 1]?.time;
        chart.timeScale().setVisibleRange({
            from: recentPeriodStart,
            to: recentPeriodEnd,
        });
        
        // 현재 마우스 위치의 차트 값 state 로 관리
        chart.subscribeCrosshairMove((param) => {
            if (param.time) {
                const data = param.seriesData.get(candlestickSeries);
                setCursorData(data);
            }
        });
        // 사이즈 조절 함수
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientWidth * 0.4,
            });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data_ohlc, data_volume]);

    useEffect(() => {
        if (chartType === 'Candle') {
            candlestickSeriesRef.current.applyOptions({ visible: true });
            lineSeriesRef.current.applyOptions({ visible: false });
        } else if (chartType === 'Line') {
            candlestickSeriesRef.current.applyOptions({ visible: false });
            lineSeriesRef.current.applyOptions({ visible: true });
        }
    }, [chartType]);

    useEffect(()=>{
        const recentPeriodStart = data_ohlc[data_ohlc.length - viewPeroid]?.time || data_ohlc[0]?.time;
        const recentPeriodEnd = data_ohlc[data_ohlc.length - 1]?.time;
        chartRef.current.timeScale().setVisibleRange({
            from: recentPeriodStart,
            to: recentPeriodEnd,
        });
    },[viewPeroid])

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {/* <PriceChartLegend chartTitle={chartTitle} cursorData={cursorData}/> */}
            <div ref={chartContainerRef} className="w-full relative">
            <PriceChartLegend chartTitle={chartTitle} cursorData={cursorData} ref={chartRef} />
            </div>
            <div>
                <button
                    onClick={() => setChartType('Candle')}
                    style={{
                        backgroundColor: chartType === 'Candle' ? '#2962FF' : '#f0f0f0',
                        color: chartType === 'Candle' ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        margin: '0 4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Candle
                </button>
                <button
                    onClick={() => setChartType('Line')}
                    style={{
                        backgroundColor: chartType === 'Line' ? '#2962FF' : '#f0f0f0',
                        color: chartType === 'Line' ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        margin: '0 4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Line
                </button>
                <button
                    onClick={() => setViewPeriod(24)}
                    style={{
                        backgroundColor: viewPeroid === 24 ? '#2962FF' : '#f0f0f0',
                        color: viewPeroid === 24 ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        margin: '0 4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    1m
                </button>
                <button
                    onClick={() => setViewPeriod(66)}
                    style={{
                        backgroundColor: viewPeroid === 66 ? '#2962FF' : '#f0f0f0',
                        color: viewPeroid === 66 ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        margin: '0 4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    3m
                </button>
                <button
                    onClick={() => setViewPeriod(255)}
                    style={{
                        backgroundColor: viewPeroid === 255 ? '#2962FF' : '#f0f0f0',
                        color: viewPeroid === 255 ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        margin: '0 4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    1y
                </button>
                <button
                    onClick={() => setViewPeriod(765)}
                    style={{
                        backgroundColor: viewPeroid === 765 ? '#2962FF' : '#f0f0f0',
                        color: viewPeroid === 765 ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        margin: '0 4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    3y
                </button>
            </div>
        </div>
    );
};

export default PriceChart;
