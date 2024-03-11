import React, { useEffect, useState } from 'react'
import { WapperLabelText, WapperTextValue, WrapperContent, WrapperTextPrice } from './style'
import TypeProduct from '../TypeProduct/TypeProduct'
import * as ProductService from "../../services/ProductService"

import { useNavigate } from 'react-router-dom'

const NavbarComponents = () => {
    const onChange = () => { }
    const [typeProduct, setTypeProduct] = useState([])
    const [priceProduct, setPriceProduct] = useState([])
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProduct(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
    const fetchAllPriceProduct = async () => {
        const res = await ProductService.getAllPriceProduct()
        if (res?.status === 'OK') {
            setPriceProduct(res?.data)
        }
    }
    useEffect(() => {
        fetchAllPriceProduct()
    }, [])

    const navigate = useNavigate()
    const handleNavigatePrice = (fprice) => {
        navigate(`/product-price/${fprice}`, { state: fprice })
    }
    return (
        <div>
            <WapperLabelText>Danh mục sản phẩm:</WapperLabelText>
            <WrapperContent style={{ cursor: 'pointer' }}>
                {typeProduct.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}

            </WrapperContent>
            <WapperLabelText>Lọc theo giá:</WapperLabelText>
            <WrapperContent style={{ cursor: 'pointer' }}>
                <span value='200000' onClick={() => handleNavigatePrice(200000)}>Dưới 200000</span>
                <span value='200001' onClick={() => handleNavigatePrice(200001)}>Trên 200000</span>
            </WrapperContent>
        </div>
    )
}

export default NavbarComponents