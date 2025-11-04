import { createBrowserRouter } from 'react-router'
import App from './App'
import { BarEchartExample } from './pages/echarts/bar'
import { threejsBase } from './pages/threejs/base';
import { threejsSunEarth } from './pages/threejs/sunEarth';
import { threejsLightBox } from './pages/threejs/lightBox';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/echarts",
    Component: BarEchartExample,
  },
  {
    path: "/threejs/base",
    Component: threejsBase,
  },
  {
    path: "/threejs/sun-earth",
    Component: threejsSunEarth,
  },
  {
    path: "/threejs/light-box",
    Component: threejsLightBox
  }
]);