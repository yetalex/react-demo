import React, { useState } from 'react'
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
  return <FilterableProductTable products={PRODUCTS} />
}

export default App
