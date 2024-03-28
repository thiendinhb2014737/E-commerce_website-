import React, { useEffect, useState } from 'react'
import { WapperLabelText, WapperTextValue, WrapperContent, WrapperTextPrice } from './style'
import TypeProduct from '../TypeProduct/TypeProduct'
import * as ProductService from "../../services/ProductService"

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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
    const handleNavigateGender = (gender) => {
        navigate(`/product-gender/${gender}`, { state: gender })
    }
    const handleNavigateFashion = (fashion) => {
        navigate(`/product-fashion/${fashion}`, { state: fashion })
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
            <WapperLabelText>Giá sản phẩm:</WapperLabelText>
            <WrapperContent style={{ cursor: 'pointer' }}>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='200000' onClick={() => handleNavigatePrice(200000)}>Dưới 200.000</WrapperContentPopup>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='200001' onClick={() => handleNavigatePrice(200001)}>Trên 200.000</WrapperContentPopup>
            </WrapperContent>
            <WapperLabelText>Thể loại sản phẩm:</WapperLabelText>
            <WrapperContent style={{ cursor: 'pointer' }}>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='nam' onClick={() => handleNavigateGender('nam')}>Sản phẩm nam</WrapperContentPopup>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='nữ' onClick={() => handleNavigateGender('nữ')}>Sản phẩm nữ</WrapperContentPopup>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='unisex' onClick={() => handleNavigateGender('unisex')}>Sản phẩm unisex</WrapperContentPopup>
            </WrapperContent>
            <WapperLabelText>Phong cách:</WapperLabelText>
            <WrapperContent style={{ cursor: 'pointer' }}>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='Áo sơ mi' onClick={() => handleNavigateFashion('Áo sơ mi')}>Đồ công sở</WrapperContentPopup>
                <WrapperContentPopup
                    style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center' }}
                    value='Áo thun' onClick={() => handleNavigateFashion('Áo thun')}>Đồ thể thao</WrapperContentPopup>
            </WrapperContent>
        </div>
    )
}

export default NavbarComponents
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #888;
    }
`