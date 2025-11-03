import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Sun() {
  const sunRef = useRef<HTMLCanvasElement>(null);
  const earthRef = useRef<HTMLCanvasElement>(null);

  // 三维初始化逻辑改为在组件挂载后执行
  useEffect(() => {
    const canvas = sunRef.current;
    if (!canvas) return;

    // 1. 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    // 要更新旋转角度的对象数组
    const objects: THREE.Object3D[] = [];

    // 一球多用
    const radius = 1;
    const widthSegments = 6; // 细分更多一点更圆滑
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // 放置一个点光源
    const color = 0xffffff;
    const intensity = 500;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 0, 0);
    scene.add(light);

    // 摄像头放在原点的正上方向下看
    const fov = 75;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, 1, near, far);
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // 太阳节点
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // 再添加一个地球月亮空间
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    // 添加一个地球进去
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);  // 把地球变为太阳的子节点
    objects.push(earthMesh);

    // 添加一个月亮
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5); // 缩小月亮的大小
    moonOrbit.add(moonMesh);  // 把月亮变为地球的子节点
    objects.push(moonMesh);

    // 为每个节点添加一个AxesHelper
    objects.forEach((node) => {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 1;
      node.add(axes);
    })

    // 统一按照 canvas 的大小设置渲染尺寸及相机宽高比
    const resize = () => {
      const width = canvas.clientWidth || canvas.width;
      const height = canvas.clientHeight || canvas.height;
      const aspect = width / height;
      renderer.setSize(width, height, false);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId = 0;
    const render = (time: number) => {
      time *= 0.001; // 转换为秒

      objects.forEach((object, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        object.rotation.y = rot;
      });
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // 清理资源
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      sphereGeometry.dispose();
      sunMaterial.dispose();
    };
  }, []);

  return (
    <div>
      {/* 为了能正确计算尺寸，给 canvas 一个可见大小 */}
      <canvas ref={sunRef} style={{ width: '600px', height: '400px', display: 'block' }} />
      <canvas ref={earthRef} />
    </div>
  )
}