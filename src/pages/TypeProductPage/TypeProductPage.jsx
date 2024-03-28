import React, { useEffect, useState } from 'react'
import NavbarComponents from '../../components/NavbarComponents/NavbarComponents'
import CardComponents from '../../components/CardComponents/CardComponents'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import * as ProductService from "../../services/ProductService"
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import Loading from '../../components/LoadingComponents/Loading'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 100)
    const navigate = useNavigate()
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })
    const [isPending, setIsPending] = useState(false)

    const fetchProductType = async (type, page, limit) => {
        setIsPending(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 'OK') {
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
            setIsPending(false)
        } else { }
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }

    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({ ...pageSize, page: current - 1, limit: pageSize })
    }
    return (
        <div style={{ width: '100%', background: '#f5f5fa', height: '100%' }}>
            <div style={{ width: '1350px', margin: '0 auto', height: '100%', padding: '8px' }}>
                <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Thể loại sản phẩm</h4>
                <Loading isPending={isPending}>
                    <Row style={{ flexWrap: 'nowrap', height: '100%' }}>
                        <WrapperNavbar span={4} style={{ background: '#6B86FF' }}>
                            <NavbarComponents />
                        </WrapperNavbar>

                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts >
                                {products?.filter((pro) => {
                                    if (searchDebounce === '') {
                                        return pro
                                    } else if (pro?.name?.toLowerCase().includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product) => {
                                    return (
                                        <CardComponents
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            selled={product.selled}
                                            discount={product.discount}
                                            id={product._id}
                                        />
                                    )
                                })}
                            </WrapperProducts>
                            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                        </Col>

                    </Row>
                </Loading>
            </div>

        </div>
    )
}

export default TypeProductPage