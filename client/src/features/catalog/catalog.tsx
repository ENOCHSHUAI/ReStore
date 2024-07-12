import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";


export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    

    return (
        <>
            <ProductList products={products}/>
        </>
    )
}
 