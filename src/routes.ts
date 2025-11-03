import { createBrowserRouter } from 'react-router'
import App from './App'
import { BarEchartExample } from './pages/echarts/bar'
import { threejsBase } from './pages/threejs/base';
import { threejsSunEarth } from './pages/threejs/sunEarth';

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
]);