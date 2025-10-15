import React, { useState } from 'react'
import { EnergyChart, SvgChart} from './3d'
import SvgPathDemo from './3d/SvgPathDemo'
import { Link } from 'react-router'
// import './App.css'

// 定义产品数据类型
interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

// 定义组件 Props 类型
interface ProductCategoryRowProps {
  category: string;
}

interface ProductRowProps {
  product: Product;
}

// 部分属性可选，如：type userLogin = PartialBy<User, 'password'>
// type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface ProductTableProps {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
}

interface FilterableProductTableProps {
  products: Product[];
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  )
}

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
  const rows: React.ReactElement[] = []
  let lastCatetory: string | null = null

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return
    }

    if (product.category !== lastCatetory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
    }
    rows.push(<ProductRow product={product} key={product.name} />)
    lastCatetory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }: SearchBarProps) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS: Product[] = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
]

function App(): React.ReactElement {
  const [currentView, setCurrentView] = useState<'products' | 'energy' | 'svg-demo'>('svg-demo');

  return (
    <div>
      {/* 导航栏 */}
      <nav style={{
        padding: '1rem',
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('svg-demo')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'svg-demo' ? '#3b82f6' : 'transparent',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            SVG路径演示
          </button>
          <button
            onClick={() => setCurrentView('energy')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'energy' ? '#3b82f6' : 'transparent',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            3D 能源图表
          </button>
          <button
            onClick={() => setCurrentView('products')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'products' ? '#3b82f6' : 'transparent',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            产品表格
          </button>
          <Link to="/pages/echarts/bar" style={{
            padding: '0.5rem 1rem',
            color: 'white',
            textDecoration: 'none',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Concerts
          </Link>
        </div>
      </nav>

      {/* 内容区域 */}
      {currentView === 'svg-demo' ? (
        <SvgPathDemo />
      ) : currentView === 'energy' ? (
        <div style={{height: '100vh'}}>
          <EnergyChart />
          <SvgChart />
        </div>
      ) : (
        <div style={{ padding: '1rem' }}>
          <FilterableProductTable products={PRODUCTS} />
        </div>
      )}
    </div>
  );
}

export default App
