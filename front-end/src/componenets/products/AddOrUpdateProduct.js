import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {getCategories} from "../../redux/actions/categoryActions"
import {updateProduct} from "../../redux/actions/productActions"
import {createProduct} from "../../redux/actions/productActions"
import ProductDetail from "./ProductDetail"

function AddOrUpdateProduct({
    products,
    categories,
    getProducts,
    getCategories,
    updateProduct,
    createProduct,
    history,
    ...props
}) {
    const [product, setProduct] = useState({...props.product});
    useEffect(()=>{
        if(categories.length === 0){
            getCategories();
        }
        setProduct({...props.product});
    },[props.product]);

    function handleChange(event){
        const{name, value}=event.target;
        setProduct(previousProduct=>({
            ...previousProduct,
            [name]:name==="category_id"?parseInt(value,10):value
        }));
    }

    function handleUpdate(event){
        event.preventDefault();
        updateProduct(product).then(()=>{
            history.push("/")
        });
    }

    function handleCreate(event){
        event.preventDefault();
        createProduct(product).then(()=>{
            history.push("/")
        });
    }

    return(
        <ProductDetail product={product} categories={categories} onChange={handleChange} onSave={product.id ? handleUpdate : handleCreate}></ProductDetail>
    )

}

export function getProductById(products, productId){
    let product = products.find(product=>product.id===productId)||null;
    return product;
}

function mapStateToProps(state, ownProps){
    const productId=ownProps.match?.params?.productId
    const product = productId && state.productListReducer.length>0?getProductById(state.productListReducer,productId):{}
    return{
        product,
        products :state.productListReducer,
        categories:state.categoryListReducer
    }
}

const mapDispatchToProps={
    getCategories,updateProduct,createProduct
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOrUpdateProduct)