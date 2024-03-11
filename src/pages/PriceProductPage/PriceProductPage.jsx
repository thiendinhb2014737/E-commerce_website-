
import React, { useEffect, useState } from 'react'
import NavbarComponents from '../../components/NavbarComponents/NavbarComponents'
import CardComponents from '../../components/CardComponents/CardComponents'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from "../../services/ProductService"
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
const PriceProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 100)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })

    const fetchProductPrice = async (fprice, page, limit) => {
        const res = await ProductService.getProductPrice(fprice, page, limit)
        if (res?.status === 'OK') {
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })

        } else { }
    }

    useEffect(() => {
        if (state) {
            fetchProductPrice(state, panigate.page, panigate.limit)
        }

    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({ ...pageSize, page: current - 1, limit: pageSize })
    }
    return (
        <div style={{ width: '100%', background: '#efefef', height: '100vh' }}>
            <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: '100%' }}>
                    <WrapperNavbar span={4} >
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
            </div>

        </div>

    )
}

export default PriceProductPage