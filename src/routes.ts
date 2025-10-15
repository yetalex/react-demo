import { createBrowserRouter } from 'react-router'
import App from './App'
import { BarEchartExample } from './pages/echarts/bar'

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/echarts",
    Component: BarEchartExample,
  },
]);