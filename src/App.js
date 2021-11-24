import React, { useState, useEffect } from "react";
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()

        setCart(cart)
    }

    return (
        <Router>
            <div>
                <Navbar totalItem={cart.total_items} />
                <Routes>
                    <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}>
                    </Route>
                    <Route path="/cart" element={<Cart
                        cart={cart}
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart} />}>
                    </Route>
                    <Route path="/checkout" element={<Checkout cart={cart}/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App