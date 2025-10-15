import BarChart from "../../components/BarChart";

 // 示例数据
const barData = [
  { name: '周一', value: 120 },
  { name: '周二', value: 200 },
  { name: '周三', value: 150 },
  { name: '周四', value: 80 },
  { name: '周五', value: 70 },
  { name: '周六', value: 110 },
  { name: '周日', value: 170 }
];


export const BarEchartExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ECharts React 示例</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <BarChart 
          data={barData} 
          title="N周销售数据" 
          height={400}
        />
      </div>
    </div>
  );
}