import React from 'react'
import { useEcharts } from '../hooks/useEcharts'
import type { EChartsOption } from 'echarts'

interface BarChartProps {
  data: Array<{ name: string; value: number; }>;
  title?: string;
  width?: string | number;
  height?: string | number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title = '柱状图',
  width = '100%',
  height = '400px',
}) => {
  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      name: '数值',
      type: 'bar',
      data: data.map(item => item.value),
      itemStyle: {
        color: '#5470c6',
      },
    }],
  };

  const { chartRef } = useEcharts(option, [data]);

  return (
    <div
      ref={chartRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: '300px', // 确保有最小高度
      }}
    />
  )
}

export default BarChart