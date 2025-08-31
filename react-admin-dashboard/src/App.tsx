import './App.css'
import { useState } from 'react'



function App() {

  const [products, setProducts] = useState ([

    { id: 1, name: "Laptop Pro", category: "Electronics", stock: 15, price:  1299},
    { id: 2, name: "Wireless Headphones", category: "Electronics", stock: 8, price: 199 },
    { id: 3, name: "Office Chair", category: "Funiture", stock: 3, price: 299},

  ])

  const [searchTerm, setSearchTerm] = useState("")

  const [showAddModal, setShowAddModal] = useState(false)

  const [newProduct, setNewProduct] = useState({
   name: "",
   category: "",
   stock: 0,
   price: 0
  })

const handleAddProduct = () => {

setProducts([...products, { ...newProduct, id: Date.now() }])

setNewProduct ({ name: "", category: "", stock: 0 , price: 0 })



setShowAddModal(false)

}

const handleDeleteProduct = (productId) => {

  setProducts(products.filter(product => product.id !== productId))

}

const [selectedCategory, setSelectedCategory] = useState("All")


return (

<div className="app">

   <h1> Product Inventory Dashboard </h1>

<button 
onClick={() => setShowAddModal(true)}
className="add-button"
> Add New Product </button>

    <input 
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}

/>
     <div className="category-filters">
         <button
             onClick={() => setSelectedCategory("All")}
             className={selectedCategory === "All" ? "active" : ""}
               >
              All
          </button>
          <button
              onClick={() => setSelectedCategory("Electronics")}
              className={selectedCategory === "Electronics" ? "active" : ""}
              >
               Electronics
          </button>
          <button 
                onClick={() => setSelectedCategory("Furniture")}
                className={selectedCategory === "Funiture" ? "active" : ""}
                > 
                   Furniture
               </button>
     </div>


   <div className="product-list">




       {products.filter(product => {

        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
        return matchesSearch && matchesCategory 
}).map(product => (




    
    <div key={product.id}>

     <span className={product.stock <= 3 ? "low-stock" : ""}>
      {product.name} - Stock: {product.stock}
      </span>
     <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>

    </div>

       ))}
   </div>

  {showAddModal  && (
   <div className="modal-overlay">
          <div className="modal">
             <h2> Add New Product</h2>
             <form>
       <input
          type="text"
          placeholder="Product name"
         value={newProduct.name}
       onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
  />
     <input
     type="text"
     placeholder="Category"
     value={newProduct.category}
     onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
     
     />

     <input 
     type="number"
     placeholder="Stock quantity"
     value={newProduct.stock}
     onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
       />

         <input
         type="number"
         placeholder="Price"
         value={newProduct.price}
         onChange={(e)  => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}

         />
        
        <div className="hex">
          <button type="button" onClick={handleAddProduct}> Save Product </button>
          <button onClick={() => setShowAddModal(false)}>Close</button>
       </div>
</form>


        </div>
    </div>

  ) }


</div>


)


}

export default App
