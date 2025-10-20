import { useState, useEffect } from 'react';
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
  const [data, setData] = useState(barData);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('effecting...')
      setData((preData) => [
        ...preData,
        { name: '周一', value: 210 },
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [])
  
  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h1>ECharts React 示例</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <BarChart 
          data={data} 
          title="N周销售数据" 
          height={400}
        />
      </div>
    </div>
  );
}