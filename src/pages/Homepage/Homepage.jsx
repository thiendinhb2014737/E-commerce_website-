import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WapperTypeProduct, WrapperButtonMore, WrapperContentTime, WrapperLabelTime, WrapperProducts, WrapperTime } from "./style";
import SliderComponents from "../../components/SliderComponents/SliderComponents";
import slider1 from "../../assets/Images/slider1.png"
import slider2 from "../../assets/Images/slider2.png"
import slider3 from "../../assets/Images/slider3.png"
import male from "../../assets/Images/male.png"
import female from "../../assets/Images/female.png"
import unisex from "../../assets/Images/unisex.png"
import CardComponents from "../../components/CardComponents/CardComponents";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService"
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponents/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import * as EventService from "../../services/EventService"

import { Col, Row } from "antd";
import styled from "styled-components";
import ChatBotComponent from "../../components/ChatBotComponent/ChatBotComponent";

const Homepage = () => {
    const user = useSelector((state) => state?.user)
    const searchProduct = useSelector((state) => state?.product?.search)
    const [pending, setPending] = useState(false)
    const searchDebounce = useDebounce(searchProduct, 100)
    const [limit, setLimit] = useState(12)
    const [typeProduct, setTypeProduct] = useState([])


    const navigate = useNavigate()

    const [distances, setDistances] = useState();
    const [days, setDay] = useState();
    const [hours, setHour] = useState();
    const [minutes, setMinute] = useState();
    const [seconds, setSecond] = useState();
    const [discountEvent, setDiscountEvent] = useState();
    const [limitEvent, setLimitEvent] = useState(1)

    const fetchProductAll = async (context) => {
        setPending(true)
        const limit = context?.queryKey && context?.queryKey[1]
        // const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(limit)
        setPending(false)
        return res
    }

    // const fetchProductAllDiscount = async (context) => {
    //     setPending(true)
    //     const limit = context?.queryKey && context?.queryKey[1]
    //     // const search = context?.queryKey && context?.queryKey[2]
    //     const discountEvent = context?.queryKey && context?.queryKey[3]
    //     const res = await ProductService.getAllProductDiscount(limit, discountEvent)
    //     setPending(false)
    //     return res
    // }
    const fetchEvent = async (context) => {
        const limitEvent = context?.queryKey && context?.queryKey[1]
        const res = await EventService.getEvent(limitEvent)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProduct(res?.data)
        }
    }

    // bỏ isPending
    const { isLoading: isPending, data: products, isPlaceholderData } = useQuery({
        queryKey: ['products', limit], /// bỏ searchDebounce
        queryFn: fetchProductAll, retry: 3, retryDeplay: 1000, placeholderData: true
    })

    // const { isLoading: isPendingDiscount, data: productsDiscount, isPlaceholderDataDiscount } = useQuery({
    //     queryKey: ['productsDiscount', limit, discountEvent],/// bỏ searchDebounce
    //     queryFn: fetchProductAllDiscount, retry: 3, retryDeplay: 1000, placeholderData: true
    // })

    const { data: event } = useQuery({
        queryKey: ['event', limitEvent],
        queryFn: fetchEvent
    })

    const fullTime = new Date(`${event?.data[0]?.days} ${event?.data[0]?.hours}:${event?.data[0]?.minutes}:${event?.data[0]?.seconds}`).getTime()
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    useEffect(() => {
        setDiscountEvent(event?.data[0]?.discount)
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = (fullTime - now) / 1000
            setDistances(distance)
            if (distance > 0) {
                const days = `0${Math.floor(distance / 60 / 60 / 24)}`.slice(-2)
                const hours = `0${Math.floor(distance / 60 / 60 % 24)}`.slice(-2)
                const minutes = `0${Math.floor((distance / 60) % 60)}`.slice(-2)
                const seconds = `0${Math.floor(distance % 60)}`.slice(-2)
                setDay(Number(days))
                setHour(Number(hours))
                setMinute(Number(minutes))
                setSecond(Number(seconds))
            } else {
                clearInterval(interval)
            }
        }, 1000);
        return () => clearInterval(interval);

    }, [fullTime]);

    const handleNavigateGender = (gender) => {
        navigate(`/product-gender/${gender}`, { state: gender })
    }
    console.log(fullTime)
    console.log('products', products)

    return (
        <>
            <div className="body" style={{ width: '100%', backgroundColor: "#f5f5fa" }}>
                <div style={{ width: '1390px', margin: '0 auto', backgroundColor: "#fff", paddingTop: '10px' }}>
                    <WapperTypeProduct>
                        {typeProduct.map((item) => {
                            return (
                                <TypeProduct name={item} key={item} />
                            )
                        })}
                    </WapperTypeProduct>
                </div>
            </div>
            <div className="body" style={{ width: '100%', backgroundColor: "#f5f5fa" }}>
                <div id="container" style={{ margin: '0 auto', height: "100%", width: '1390px', backgroundColor: "#fff" }}>
                    <SliderComponents arrImages={[slider1, slider2, slider3]} />
                    < Loading isPending={pending || isPending}>
                        <div style={{ margin: '0 auto', height: "170px", backgroundColor: "#FFF", marginTop: '10px' }}>
                            <Row style={{ flexWrap: 'nowrap', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
                                <Col span={8} style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                                    <WrapperContentPopup style={{ padding: '8px', cursor: 'pointer', background: '#f5f5fa', borderRadius: '4px', textAlign: 'center', marginBottom: '5px', marginRight: '5px' }} onClick={() => handleNavigateGender('nam')}> THỜI TRANG NAM</WrapperContentPopup>
                                    <WrapperContentPopupImg src={male} style={{ width: '400px', height: '150px', border: '1px solid #f5f5f5', borderRadius: '5%', marginLeft: '32px' }} onClick={() => handleNavigateGender('nam')} />
                                </Col>
                                <Col span={8} style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                                    <WrapperContentPopup style={{ padding: '8px', cursor: 'pointer', background: '#f5f5fa', borderRadius: '4px', textAlign: 'center', marginBottom: '5px', marginRight: '5px' }} onClick={() => handleNavigateGender('nữ')}> THỜI TRANG NỮ</WrapperContentPopup>
                                    <WrapperContentPopupImg src={female} style={{ width: '400px', height: '150px', border: '1px solid #f5f5f5', borderRadius: '5%', marginLeft: '32px' }} onClick={() => handleNavigateGender('nữ')} />
                                </Col>
                                <Col span={8} style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                                    <WrapperContentPopup style={{ padding: '8px', cursor: 'pointer', background: '#f5f5fa', borderRadius: '4px', textAlign: 'center', marginBottom: '5px' }} onClick={() => handleNavigateGender('unisex')}> THỜI TRANG NAM-NỮ</WrapperContentPopup>
                                    <WrapperContentPopupImg src={unisex} style={{ width: '400px', height: '150px', border: '1px solid #f5f5f5', borderRadius: '5%', marginLeft: '32px' }} onClick={() => handleNavigateGender('unisex')} />
                                </Col>
                            </Row>

                        </div>
                        {((days >= 0) && (hours >= 0) && (minutes >= 0) && (seconds > 0)) ? (
                            <WrapperContentTime>
                                <WrapperLabelTime>
                                    <WrapperTime>{days}</WrapperTime>
                                    <p>Ngày</p>
                                </WrapperLabelTime>
                                <WrapperLabelTime>
                                    <WrapperTime>{hours}</WrapperTime>
                                    <p>Giờ</p>
                                </WrapperLabelTime>
                                <WrapperLabelTime>
                                    <WrapperTime>{minutes}</WrapperTime>
                                    <p>Phút</p>
                                </WrapperLabelTime>
                                <WrapperLabelTime>
                                    <WrapperTime>{seconds}</WrapperTime>
                                    <p>Giây</p>
                                </WrapperLabelTime>

                            </WrapperContentTime>
                        ) : <div></div>
                        }
                        {
                            ((days >= 0) && (hours >= 0) && (minutes >= 0) && (seconds > 0)) ? (
                                <div id="container" style={{ margin: '0 auto', height: "100%", width: '1390px', backgroundColor: "#fff", border: '2px solid #5774F8', margin: '0px' }}>
                                    <WrapperProducts>
                                        {products?.data?.filter((pro) => {
                                            if (searchDebounce === '') {
                                                return pro
                                            } else if (pro?.name?.toLowerCase().includes(searchDebounce?.toLowerCase())) {
                                                return pro
                                            }
                                        })?.map((product) => {
                                            if (product.discount >= discountEvent) {
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
                                            }

                                        })}
                                    </WrapperProducts>
                                </div>
                            ) : <div></div>
                        }

                        <WrapperProducts>
                            {products?.data?.filter((pro) => {
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

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px', paddingBottom: '20px' }}>
                            <WrapperButtonMore
                                textbutton={isPlaceholderData ? 'Load more' : ' Xem thêm'} type='outline'
                                styleButton={{
                                    border: '1px solid rgb(10, 104, 255)',
                                    color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(10, 104, 255)'}`,
                                    width: '240px',
                                    height: '38px',
                                    borderRadius: '4px'
                                }}
                                disabled={products?.total === products?.data?.length || products.totalPage === 1}
                                styletextbutton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                                onClick={() => setLimit((prev) => prev + 6)}
                            />
                        </div>
                    </Loading>
                </div>
            </div>
            {/* {
                user ? (
                   
                ) : <div></div>
            } */}
        </>

    )
}
export default Homepage

export const WrapperContentPopup = styled.p`
border-radius: 6px;
box-shadow: 0 3px 3px #efefef;
    &:hover {
        color: #888;
    }
`
export const WrapperContentPopupImg = styled.img`
border-radius: 6px;
box-shadow: 0 5px 5px #efefef;
opacity: 0.93;
transition: opacity 1s linear;
    &:hover {
        opacity: 0.5;
    }
`
