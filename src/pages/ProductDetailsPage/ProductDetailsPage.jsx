import React from 'react'
import ProductDetailsComponents from '../../components/ProductDetailsComponents/ProductDetailsComponents'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
    const { id } = useParams()
    //console.log('params', id)
    const navigate = useNavigate()
    return (
        <div style={{ height: '100vh', width: '100%', background: '#efefef' }}>
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <h4><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang chủ</span>/Chi tiết sản phẩm</h4>
                <ProductDetailsComponents idProduct={id} />

            </div>
        </div>
    )
}

export default ProductDetailsPage