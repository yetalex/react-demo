import React from 'react';

const SvgPathDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>SVG路径分析演示</h2>
      
      {/* 原始路径 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>1. 原始路径（只有填充）</h3>
        <svg width="700" height="200" viewBox="0 0 700 200" style={{ border: '1px solid #ccc' }}>
          <defs>
            <linearGradient id="gradLoad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#4ecdc4" />
            </linearGradient>
          </defs>
          <path d=" 
            M 140,40 
            L 140,104 
            C 290,136, 410,20, 560,40 
            L 560,100 
            C 410,120, 290,136, 140,104 
            Z 
          " fill="url(#gradLoad)" />
        </svg>
      </div>

      {/* 添加描边的路径 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>2. 添加描边后的路径（可以看到所有线条）</h3>
        <svg width="700" height="200" viewBox="0 0 700 200" style={{ border: '1px solid #ccc' }}>
          <defs>
            <linearGradient id="gradLoad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d=" 
            M 140,40 
            L 140,104 
            C 290,136, 410,20, 560,40 
            L 560,100 
            C 410,120, 290,136, 140,104 
            Z 
          " fill="url(#gradLoad2)" stroke="red" strokeWidth="2" />
        </svg>
      </div>

      {/* 分步展示每个命令 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>3. 分步展示每个路径命令</h3>
        <svg width="700" height="200" viewBox="0 0 700 200" style={{ border: '1px solid #ccc' }}>
          {/* 起点 */}
          <circle cx="140" cy="40" r="3" fill="blue" />
          <text x="145" y="35" fontSize="12" fill="blue">起点 M(140,40)</text>
          
          {/* 第一条直线 L 140,104 */}
          <line x1="140" y1="40" x2="140" y2="104" stroke="red" strokeWidth="3" />
          <circle cx="140" cy="104" r="3" fill="red" />
          <text x="145" y="110" fontSize="12" fill="red">L(140,104)</text>
          
          {/* 第一条贝塞尔曲线 */}
          <path d="M 140,104 C 290,136, 410,20, 560,40" fill="none" stroke="green" strokeWidth="2" />
          <circle cx="560" cy="40" r="3" fill="green" />
          <text x="565" y="35" fontSize="12" fill="green">C终点(560,40)</text>
          
          {/* 第二条直线 L 560,100 */}
          <line x1="560" y1="40" x2="560" y2="100" stroke="orange" strokeWidth="2" />
          <circle cx="560" cy="100" r="3" fill="orange" />
          <text x="565" y="105" fontSize="12" fill="orange">L(560,100)</text>
          
          {/* 第二条贝塞尔曲线 */}
          <path d="M 560,100 C 410,120, 290,136, 140,104" fill="none" stroke="purple" strokeWidth="2" />
          
          {/* Z命令闭合路径 */}
          <line x1="140" y1="104" x2="140" y2="40" stroke="brown" strokeWidth="2" strokeDasharray="5,5" />
          <text x="100" y="75" fontSize="12" fill="brown">Z闭合</text>
        </svg>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h4>结论：</h4>
        <ul>
          <li><strong>红色粗线</strong>：从 (140,40) 到 (140,104) 的直线 - 这条线确实存在！</li>
          <li><strong>绿色曲线</strong>：第一条贝塞尔曲线从 (140,104) 开始</li>
          <li><strong>橙色线</strong>：第二条直线从 (560,40) 到 (560,100)</li>
          <li><strong>紫色曲线</strong>：第二条贝塞尔曲线回到 (140,104)</li>
          <li><strong>棕色虚线</strong>：Z命令闭合路径回到起点</li>
        </ul>
        <p><strong>原因分析</strong>：在原始路径中看不到直线是因为只有填充没有描边，而且这条垂直线在整个形状中不太显眼。</p>
      </div>
    </div>
  );
};

export default SvgPathDemo;