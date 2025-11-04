import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function LightBox() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 场景、相机、渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000011);
    mountRef.current.appendChild(renderer.domElement);

    // 创建发光球体
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // 发光材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 添加光晕效果
    const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // 添加点光源
    const pointLight = new THREE.PointLight(0x00ff88, 2, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

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

      // 球体旋转动画
      sphere.rotation.x = time * 0.5;
      sphere.rotation.y = time * 0.7;
      
      glowSphere.rotation.x = time * 0.3;
      glowSphere.rotation.y = time * 0.5;

      // 光强度变化
      pointLight.intensity = 2 + Math.sin(time * 2) * 0.5;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // 清理函数
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}

export default LightBox;