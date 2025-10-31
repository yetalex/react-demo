import { useRef, useEffect } from 'react';
import * as THREE from 'three'

const BaseBox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 获取 canvas 元素
    const canvas = canvasRef.current;
    
    // 设置 canvas 尺寸
    // const width = 800;
    // const height = 600;
    // canvas.width = width;
    // canvas.height = height;

    // 1. 创建渲染器
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      canvas: canvas 
    });
    // renderer.setSize(width, height);

    // 2. 需要一个透视摄像机
    const fov = 75;  // 视野范围，这里指垂直方向为75度
    const aspect = 2; // 画布的宽高比
    const near = 0.1; // 近裁剪面
    const far = 5; // 远裁剪面
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2; // 相机位置在z轴上为2，这样才能看到场景中的物体

    // 3. 需要一个场景
    const scene = new THREE.Scene();
    
    // 4. 需要一个几何体
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    
    // 5. 需要一个材质
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    
    // 6. 需要一个网格
    // const cube = new THREE.Mesh(geometry, material);
    
    // 把网格添加到场景中
    // scene.add(cube);

    function makeInstance(geometry: THREE.BufferGeometry, color: number, x: number) {
      const material = new THREE.MeshPhongMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = x;
      scene.add(cube);
      return cube;
    }
    const cubes = [
      makeInstance(geometry, 0x44aa88,  0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844,  2),
    ];

    function render(time: number) {
      time *= 0.001; // 转换为秒

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      })

      // cube.rotation.x = time;
      // cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
    // 7. 创建一束光
    const color = 0xFFFFFF;
    const intnsity = 3;
    const light = new THREE.DirectionalLight(color, intnsity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // 渲染场景
    renderer.render(scene, camera);

    // 清理函数
    return () => {
      geometry.dispose();
      // material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="base-box">
      <canvas 
        ref={canvasRef} 
        style={{
          width: '100%',
          height: '100%', 
          border: '1px solid #ccc',
          display: 'block'
        }} 
      />
    </div>
  )
}

export default BaseBox