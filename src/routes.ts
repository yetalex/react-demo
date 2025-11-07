import { createBrowserRouter } from 'react-router'
import App from './App'
import { BarEchartExample } from './pages/echarts/bar'
import { threejsBase } from './pages/threejs/base';
import { threejsSunEarth } from './pages/threejs/sunEarth';
import { threejsLightBox } from './pages/threejs/lightBox';
import { d3 } from './pages/d3/index';
import { d3Example } from './pages/d3/example';

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
  },
  {
    path: "/d3",
    Component: d3,
    children: [
      {
        index: true,
        Component: d3Example,
      },
      {
        path: "example",
        Component: d3Example,
      }
    ]
  }
]);