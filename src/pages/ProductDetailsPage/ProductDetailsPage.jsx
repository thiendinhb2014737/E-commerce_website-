import React from 'react'
import ProductDetailsComponents from '../../components/ProductDetailsComponents/ProductDetailsComponents'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
    const { id } = useParams()
    //console.log('params', id)
    const navigate = useNavigate()
    return (
        <div style={{ width: '100%', background: '#f5f5fa' }}>
            <div style={{ width: '1350px', height: '100%', margin: '0 auto', background: '#fff', padding: '8px 0px 0px 8px' }}>
                <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Chi tiết sản phẩm</h4>
                <ProductDetailsComponents idProduct={id} />
            </div>
        </div>
    )
}

export default ProductDetailsPage