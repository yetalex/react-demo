import { useRef, useEffect } from 'react';
import * as THREE from 'three'

const BaseBox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 获取 canvas 元素
    const canvas = canvasRef.current;
    
    // 设置 canvas 尺寸
    const width = 800;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      canvas: canvas 
    });
    renderer.setSize(width, height);

    // 需要一个透视摄像机
    const fov = 75;  // 视野范围，这里指垂直方向为75度
    const aspect = width / height; // 画布的宽高比
    const near = 0.1; // 近裁剪面
    const far = 5; // 远裁剪面
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2; // 相机位置在z轴上为2，这样才能看到场景中的物体

    // 需要一个场景
    const scene = new THREE.Scene();
    
    // 需要一个几何体
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    
    // 需要一个材质
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    
    // 需要一个网格
    const mesh = new THREE.Mesh(geometry, material);
    
    // 把网格添加到场景中
    scene.add(mesh);

    // 渲染场景
    renderer.render(scene, camera);

    // 清理函数
    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="base-box">
      <canvas 
        ref={canvasRef} 
        style={{ 
          border: '1px solid #ccc',
          display: 'block'
        }} 
      />
    </div>
  )
}

export default BaseBox