import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function TriggleBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 获取 canvas 元素
    const canvas = canvasRef.current;
    
    // 场景、相机、渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      canvas: canvas 
    });
    
    renderer.setClearColor(0x000011);
    
    // 初始设置渲染器尺寸
    const initialWidth = canvas.clientWidth;
    const initialHeight = canvas.clientHeight;
    renderer.setSize(initialWidth, initialHeight, false);
    camera.aspect = initialWidth / initialHeight;
    camera.updateProjectionMatrix();

    // 创建四面体几何体
    const geometry = new THREE.TetrahedronGeometry(1);
    
    // 为每个面设置不同的颜色
    const colors = [
      new THREE.Color(0xff0000), // 红色
      new THREE.Color(0x00ff00), // 绿色  
      new THREE.Color(0x0000ff), // 蓝色
      new THREE.Color(0xffff00), // 黄色
    ];
    
    // 获取位置属性
    const positionAttribute = geometry.getAttribute('position');
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
    
    // 为每个顶点设置颜色（四面体有4个面，每个面3个顶点）
    for (let i = 0; i < positionAttribute.count; i++) {
      const faceIndex = Math.floor(i / 3) % colors.length;
      const color = colors[faceIndex];
      colorAttribute.setXYZ(i, color.r, color.g, color.b);
    }
    
    geometry.setAttribute('color', colorAttribute);

    // 创建材质，启用顶点颜色
    const material = new THREE.MeshPhongMaterial({ 
      vertexColors: true,
      shininess: 100
    });

    // 创建四面体网格
    const pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // 添加定向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // 响应式处理
    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    // 渲染循环
    function render(time: number) {
      time *= 0.001; // 转换为秒

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      // 四面体旋转动画
      pyramid.rotation.x = time * 0.5;
      pyramid.rotation.y = time * 0.7;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // 清理函数
    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        width: '100%',
        height: '100vh', 
        border: '1px solid #ccc',
        display: 'block'
      }} 
    />
  );
}

export default TriggleBox;