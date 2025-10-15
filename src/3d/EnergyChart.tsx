import React from 'react';

// --- 1. 配置和计算 ---
const CHART_WIDTH = 700;
const CHART_HEIGHT = 400;
const BOX_WIDTH = 140;
const GAP = 20; // 负载和电网之间的间隙

const BATTERY_ENERGY = 200;
const LOAD_PERCENTAGE = 20;
const GRID_PERCENTAGE = 80;

const SOURCE_COLOR = '#4ECDC4'; // 青色
const LOAD_COLOR = '#A855F7';   // 紫色
const GRID_COLOR = '#3B82F6';   // 蓝色

// 派生计算
const loadValue = BATTERY_ENERGY * (LOAD_PERCENTAGE / 100);
const gridValue = BATTERY_ENERGY * (GRID_PERCENTAGE / 100);

// 高度计算 (需求 1, 3)
const rightTotalHeight = CHART_HEIGHT * 0.8; // 右侧总高度
const batteryHeight = rightTotalHeight;
const batteryTop = (CHART_HEIGHT - batteryHeight) / 2;

const rightAvailableHeight = rightTotalHeight - GAP;
const loadHeight = rightAvailableHeight * (LOAD_PERCENTAGE / 100);
const gridHeight = rightAvailableHeight * (GRID_PERCENTAGE / 100);

// 位置计算
const loadTop = (CHART_HEIGHT - rightTotalHeight) / 2;
const gridTop = loadTop + loadHeight + GAP; // (需求 2)

const batteryX = 0;
const rightColumnX = CHART_WIDTH - BOX_WIDTH;

// --- 2. 路径计算 (需求 4, 5) ---
const flowSourceRight = batteryX + BOX_WIDTH;

// 负载流量路径
const loadPath = `
  M ${flowSourceRight},${batteryTop} 
  L ${flowSourceRight},${batteryTop + batteryHeight * (LOAD_PERCENTAGE / 100)}
  C ${flowSourceRight + 150},${batteryTop + batteryHeight * 0.3}, ${rightColumnX - 150},${loadTop - 20}, ${rightColumnX},${loadTop}
  L ${rightColumnX},${loadTop + loadHeight}
  C ${rightColumnX - 150},${loadTop + loadHeight + 20}, ${flowSourceRight + 150},${batteryTop + batteryHeight * 0.3}, ${flowSourceRight},${batteryTop + batteryHeight * (LOAD_PERCENTAGE / 100)}
  Z
`;

// 电网流量路径
const gridPath = `
  M ${flowSourceRight},${batteryTop + batteryHeight * (LOAD_PERCENTAGE / 100)}
  L ${flowSourceRight},${batteryTop + batteryHeight}
  C ${flowSourceRight + 150},${batteryTop + batteryHeight}, ${rightColumnX - 150},${gridTop + gridHeight + 20}, ${rightColumnX},${gridTop + gridHeight}
  L ${rightColumnX},${gridTop}
  C ${rightColumnX - 150},${gridTop - 20}, ${flowSourceRight + 150},${batteryTop + batteryHeight * 0.7}, ${flowSourceRight},${batteryTop + batteryHeight * (LOAD_PERCENTAGE / 100)}
  Z
`;

// --- 3. 组件定义 ---
const DataCard = ({ title, value, unit, style }: { title: string; value: number; unit: string; style?: React.CSSProperties }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    borderRadius: '8px',
    padding: '10px',
    ...style
  }}>
    <div style={{ fontSize: '14px', opacity: 0.9 }}>{title}</div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>{value.toFixed(2)}</div>
    <div style={{ fontSize: '12px', opacity: 0.8 }}>{unit}</div>
  </div>
);

const EnergyFlowChart: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1E293B',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ position: 'relative', width: CHART_WIDTH, height: CHART_HEIGHT }}>
        {/* SVG 能量流 */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradLoad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SOURCE_COLOR} stopOpacity={0.8} />
              <stop offset="100%" stopColor={LOAD_COLOR} stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="gradGrid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SOURCE_COLOR} stopOpacity={0.8} />
              <stop offset="100%" stopColor={GRID_COLOR} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <path d={loadPath} fill="url(#gradLoad)" />
          <path d={gridPath} fill="url(#gradGrid)" />

          {/* 百分比文本 */}
          <text x={CHART_WIDTH / 2 - 20} y={batteryTop + loadHeight * 0.6} fill="white" fontSize="16">{`${LOAD_PERCENTAGE}%`}</text>
          <text x={CHART_WIDTH / 2 - 20} y={gridTop + gridHeight * 0.4} fill="white" fontSize="16">{`${GRID_PERCENTAGE}%`}</text>
        </svg>

        {/* 数据卡片 */}
        <DataCard
          title="电池"
          value={BATTERY_ENERGY}
          unit="kWh"
          style={{
            position: 'absolute',
            left: batteryX,
            top: batteryTop,
            width: BOX_WIDTH,
            height: batteryHeight,
            backgroundColor: SOURCE_COLOR,
          }}
        />
        <DataCard
          title="负载"
          value={loadValue}
          unit="kWh"
          style={{
            position: 'absolute',
            left: rightColumnX,
            top: loadTop,
            width: BOX_WIDTH,
            height: loadHeight,
            backgroundColor: LOAD_COLOR,
          }}
        />
        <DataCard
          title="电网"
          value={gridValue}
          unit="kWh"
          style={{
            position: 'absolute',
            left: rightColumnX,
            top: gridTop,
            width: BOX_WIDTH,
            height: gridHeight,
            backgroundColor: GRID_COLOR,
          }}
        />
      </div>
    </div>
  );
};

export default EnergyFlowChart;