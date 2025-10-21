import { createBrowserRouter } from 'react-router'
import App from './App'
import { BarEchartExample } from './pages/echarts/bar'
import { threejsBase } from './pages/threejs/base';

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
]);