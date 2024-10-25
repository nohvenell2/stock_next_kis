'use client'
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const StockChart = ({ohlc, volume}) => {
    const chartContainerRef = useRef();
    const chartRef = useRef();

    // 샘플 캔들스틱 데이터
    const candleData = ohlc;
    // 샘플 거래량 데이터
    const volumeData = volume;

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
            height: chartContainerRef.current.clientWidth * 0.3,
            timeScale: {
                timeVisible: true,
                borderColor: '#D1D4DC',
            },
            rightPriceScale: {
                borderColor: '#D1D4DC',
            },
        });

        // 캔들스틱 시리즈 설정
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            // 캔들스틱 차트 영역 설정
            priceScaleId: 'right',
            scaleMargins: {
                top: 0.1,  // 위쪽 여백 10%
                bottom: 0.3  // 아래쪽 여백 30% (거래량 차트를 위한 공간)
            },
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
            priceScaleId: 'left',  // 독립적인 스케일 ID 할당
            // 거래량 차트 영역 설정
            scaleMargins: {
                top: 0.8,  // 위쪽 여백 80% (캔들스틱 차트 아래에 배치)
                bottom: 0,  // 아래쪽 여백 없음
            },
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8,  // 위쪽 여백 80% (캔들스틱 차트 아래에 배치)
                bottom: 0,  // 아래쪽 여백 없음
            },
        })

        // 거래량 차트의 색상을 캔들스틱에 따라 변경
        volumeData.forEach((item, index) => {
            if (index > 0) {
                if (candleData[index].close > candleData[index].open) {
                    item.color = '#26a69a';  // 상승시 녹색
                } else {
                    item.color = '#ef5350';  // 하락시 빨간색
                }
            }
        });

        // 데이터 설정
        candlestickSeries.setData(candleData);
        volumeSeries.setData(volumeData);

        // 차트 크기 조정 이벤트 리스너
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientWidth * 0.3
            });
        };

        window.addEventListener('resize', handleResize);

        // 차트 참조 저장
        chart.timeScale().fitContent()
        chartRef.current = chart;
        // 클린업 함수
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="text-lg font-semibold mb-4">Stock Price Chart</div>
            <div
                ref={chartContainerRef}
                className="w-full"
            />
        </div>
    );
};

export default StockChart;