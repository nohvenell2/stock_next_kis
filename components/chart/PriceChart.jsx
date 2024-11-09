"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createChart, LineStyle } from 'lightweight-charts';
import PriceChartLegend from './PriceChart_legend';
import { modTime } from '@/util/format_time';
import { formatBigNumber_kr, formatFloatInt, formatNumberComma } from '@/util/format_number';
import ButtonDefault from './button/ButtonDefault';
import StockTitle from '../stock_title/StockTitle';
const PriceChart = ({ market, chartTitle, data_ohlc, data_volume }) => {
    const chartContainerRef = useRef();
    const chartRef = useRef();
    const candlestickSeriesRef = useRef();
    const lineSeriesRef = useRef();
    const volumeSeriesRef = useRef();
    const [viewPeroid, setViewPeriod] = useState(75);
    const [cursorData, setCursorData] = useState(null);
    const [chartType, setChartType] = useState('Candle');
    // 화폐 단위
    const currency_symbol = { 'kospi': '₩', 'snp500': '$' }?.[market]
    // 차트 x축 시간 포멧 변경
    function time_formatter_ko(time) { return modTime(time); }
    // 차트 y축 가격 포멧 변경
    function price_formatter(price) {
        const price_number = formatFloatInt(price, 2)
        return `${formatNumberComma(price_number, currency_symbol)}`
    }
    // 차트 y축 거래량 포멧 변경
    function volume_formatter(volume) {
        return formatBigNumber_kr(volume, '', ' 주')
    }
    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333333',
                attributionLogo: true,
            },
            grid: {
                vertLines: {
                    color: '#f0f0f0',
                },
                horzLines: {
                    color: '#f0f0f0',
                },
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
                timeFormatter: time_formatter_ko,
            },
            crosshair: {
                vertLine: {
                    width: 5,
                    color: '#C3BCDB44',
                    style: LineStyle.Solid,
                    labelBackgroundColor: '#494949',
                },
                horzLine: {
                    labelBackgroundColor: '#494949',
                }
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
            priceFormat: {
                type: 'custom',
                formatter: price_formatter
            },
            //priceLineColor:'blue'
        });
        candlestickSeries.setData(data_ohlc);
        candlestickSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.1, bottom: 0.3 },
        });
        candlestickSeriesRef.current = candlestickSeries; // 캔들스틱 차트 ref 
        // 거래량 차트 설정
        const volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceScaleId: 'volume',
            visible: true,
            priceFormat: {
                type: 'custom',
                formatter: volume_formatter
            },
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
            visible: false
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
            if (!param?.time) return
            const data = param.seriesData.get(candlestickSeries);
            setCursorData(data);
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

    useEffect(() => {
        const recentPeriodStart = data_ohlc[data_ohlc.length - viewPeroid]?.time || data_ohlc[0]?.time;
        const recentPeriodEnd = data_ohlc[data_ohlc.length - 1]?.time;
        chartRef.current.timeScale().setVisibleRange({
            from: recentPeriodStart,
            to: recentPeriodEnd,
        });
    }, [viewPeroid])

    return (
        <div className="w-ful max-w-6xl border border-gray-200 bg-slate-200 px-4 py-4 shadow-sm">
            <div className="w-full">
                <div className='flex items-center mb-2 gap-2'>
                    <ButtonDefault title='Line' indexState='Line' stateCurrent={chartType} handleClick={setChartType} />
                    <ButtonDefault title='Candle' indexState='Candle' stateCurrent={chartType} handleClick={setChartType} />
                    <span className='mx-5'> |</span>
                    <ButtonDefault title='1M' indexState={24} stateCurrent={viewPeroid} handleClick={setViewPeriod} />
                    <ButtonDefault title='3M' indexState={66} stateCurrent={viewPeroid} handleClick={setViewPeriod} />
                    <ButtonDefault title='1y' indexState={225} stateCurrent={viewPeroid} handleClick={setViewPeriod} />
                    <ButtonDefault title='3y' indexState={765} stateCurrent={viewPeroid} handleClick={setViewPeriod} />
                </div>
            </div>

            <div ref={chartContainerRef} className="w-full relative">
                <PriceChartLegend chartTitle={chartTitle} cursorData={cursorData} />
            </div>

        </div>
    );
};

export default PriceChart;
