import { Col, Image, Radio, Rate, Row } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import imgProductSmall from '../../assets/Images/a2.png'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {
    StarOutlined, PlusOutlined, MinusOutlined, HeartOutlined
} from '@ant-design/icons';
import ButtonComponents from '../ButtonComponents/ButtonComponents'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slice/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils';
import * as mess from '../Message/Message'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent';
import CommentComponent from '../CommentComponent/CommentComponent';
import Loading from '../LoadingComponents/Loading'
import * as message from '../../components/Message/Message'
import { addloveProProduct } from '../../redux/slice/loveProductSlice';

const ProductDetailsComponents = ({ idProduct }) => {
    const [numberProduct, setNumberProduct] = useState(1)
    const user = useSelector((state) => state?.user)
    const order = useSelector((state) => state?.order)
    const lovePro = useSelector((state) => state?.lovePro)

    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const [placement, SetPlacement] = useState('');
    const [color, setColor] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => {
        setNumberProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }
    const { isLoading: isPending, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct, enabled: !!idProduct
    })
    useEffect(() => {
        initFacebookSDK()
    }, [])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if ((orderRedux?.amount + numberProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [numberProduct])

    useEffect(() => {
        if (order.isSucessOrder) {
            mess.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumberProduct(numberProduct + 1)
            }
        } else {
            if (!limited) {
                setNumberProduct(numberProduct - 1)
            }
        }
    }

    const placementChange = (e) => {
        SetPlacement(e.target.value);
    };
    const colorChange = (e) => {
        setColor(e.target.value)
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            if (color !== '' && placement !== '') {
                const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
                if ((orderRedux?.amount + numberProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
                    dispatch(addOrderProduct({
                        ///
                        userID: user?.id,
                        orderItem: {
                            name: productDetails?.name,
                            amount: numberProduct,
                            image: productDetails?.image,
                            price: productDetails?.price,
                            product: productDetails?._id,
                            discount: productDetails?.discount,
                            size: placement,
                            color: color,
                            countInStock: productDetails?.countInStock
                        },
                    }))
                } else {
                    setErrorLimitOrder(true)
                }
            } else {
                message.error('Vui lòng chọn kích cỡ và màu sắc!')
            }
        }
    }
    const loveProRedux = lovePro?.loveProItems?.find((item) => item.product === productDetails?._id)
    const handleLovePro = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const loveProRedux = lovePro?.loveProItems?.find((item) => item.product === productDetails?._id)
            if (!loveProRedux) {
                dispatch(addloveProProduct({
                    userID: user?.id,
                    loveProItem: {
                        name: productDetails?.name,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInStock: productDetails?.countInStock,
                        gender: productDetails?.gender,
                        selled: productDetails?.selled,
                        rating: productDetails?.rating,
                        description: productDetails?.description
                    },
                }))
            } else {
                message.error('Bạn đã thêm sản phẩm vào mục Yêu thích rồi!')
            }
        }
    }
    console.log(productDetails)


    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt='img product' preview={false} />
                    {/* <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imgProductSmall} alt='img small' preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imgProductSmall} alt='img small' preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imgProductSmall} alt='img small' preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imgProductSmall} alt='img small' preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imgProductSmall} alt='img small' preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imgProductSmall} alt='img small' preview={false} />
                        </WrapperStyleColImage>

                    </Row> */}
                </Col>
                <Col span={14} style={{ paddingLeft: '6px' }}>
                    <WrapperStyleNameProduct>
                        {productDetails?.name}
                        {
                            !loveProRedux ? <HeartOutlined style={{ paddingLeft: '10px', width: '30px', height: '30px' }} onClick={handleLovePro} /> :
                                <HeartOutlined style={{ paddingLeft: '10px', width: '30px', height: '30px', color: 'red' }} onClick={handleLovePro} />
                        }
                    </WrapperStyleNameProduct>
                    <WrapperStyleTextSell>Thể loại: {productDetails?.gender}</WrapperStyleTextSell>
                    <div>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell>| Đã bán {productDetails?.selled || 0}+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>

                    <p>Số lượng size còn lại:</p>
                    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                        <span>{productDetails?.countS}</span>
                        <span>{productDetails?.countM}</span>
                        <span>{productDetails?.countL}</span>
                        <span>{productDetails?.countXL}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Radio.Group value={placement} onChange={placementChange}>
                            <Radio.Button value={productDetails?.sizeS} disabled={productDetails?.countS === 0} >{productDetails?.sizeS}</Radio.Button>
                            <Radio.Button value={productDetails?.sizeM} disabled={productDetails?.countS === 0}>{productDetails?.sizeM}</Radio.Button>
                            <Radio.Button value={productDetails?.sizeL} disabled={productDetails?.countS === 0}>{productDetails?.sizeL}</Radio.Button>
                            <Radio.Button value={productDetails?.sizeXL} disabled={productDetails?.countS === 0}>{productDetails?.sizeXL}</Radio.Button>
                        </Radio.Group>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Số lượng màu còn lại:</p>
                    {placement === 'S' ?
                        (
                            <div>
                                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>

                                    <span>{productDetails?.countColorBeS}</span>
                                    <span>{productDetails?.countColorWhiteS}</span>
                                    <span>{productDetails?.countColorBlackS}</span>
                                    <span>{productDetails?.countColorBlueS}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Radio.Group value={color} onChange={colorChange}>
                                        <Radio.Button
                                            value={productDetails?.colorBe}
                                            style={{ background: `${productDetails?.colorBe}`, width: '40px' }}
                                            disabled={productDetails?.countColorBeS === 0}>
                                        </Radio.Button>
                                        <Radio.Button
                                            value={productDetails?.colorWhite} s
                                            tyle={{ background: `${productDetails?.colorWhite}`, width: '42px' }}
                                            disabled={productDetails?.countColorWhiteS === 0}
                                        ></Radio.Button>
                                        <Radio.Button
                                            value={productDetails?.colorBlack}
                                            style={{ background: `${productDetails?.colorBlack}`, width: '42px' }}
                                            disabled={productDetails?.countColorBlackS === 0}
                                        ></Radio.Button>
                                        <Radio.Button
                                            value={productDetails?.colorBlue}
                                            style={{ background: `${productDetails?.colorBlue}`, width: '40px' }}
                                            disabled={productDetails?.countColorBlueS === 0}
                                        ></Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        ) : placement === 'M' ?
                            (
                                <div>
                                    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                        <span>{productDetails?.countColorBeM}</span>
                                        <span>{productDetails?.countColorWhiteM}</span>
                                        <span>{productDetails?.countColorBlackM}</span>
                                        <span>{productDetails?.countColorBlueM}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Radio.Group value={color} onChange={colorChange}>
                                            <Radio.Button
                                                value={productDetails?.colorBe}
                                                style={{ background: `${productDetails?.colorBe}`, width: '40px' }}
                                                disabled={productDetails?.countColorBeM === 0}>
                                            </Radio.Button>
                                            <Radio.Button
                                                value={productDetails?.colorWhite} s
                                                tyle={{ background: `${productDetails?.colorWhite}`, width: '42px' }}
                                                disabled={productDetails?.countColorWhiteM === 0}
                                            ></Radio.Button>
                                            <Radio.Button
                                                value={productDetails?.colorBlack}
                                                style={{ background: `${productDetails?.colorBlack}`, width: '42px' }}
                                                disabled={productDetails?.countColorBlackM === 0}
                                            ></Radio.Button>
                                            <Radio.Button
                                                value={productDetails?.colorBlue}
                                                style={{ background: `${productDetails?.colorBlue}`, width: '40px' }}
                                                disabled={productDetails?.countColorBlueM === 0}
                                            ></Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            ) : placement === 'L' ?
                                (
                                    <div>
                                        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                            <span>{productDetails?.countColorBeL}</span>
                                            <span>{productDetails?.countColorWhiteL}</span>
                                            <span>{productDetails?.countColorBlackL}</span>
                                            <span>{productDetails?.countColorBlueL}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Radio.Group value={color} onChange={colorChange}>
                                                <Radio.Button
                                                    value={productDetails?.colorBe}
                                                    style={{ background: `${productDetails?.colorBe}`, width: '40px' }}
                                                    disabled={productDetails?.countColorBeL === 0}>
                                                </Radio.Button>
                                                <Radio.Button
                                                    value={productDetails?.colorWhite} s
                                                    tyle={{ background: `${productDetails?.colorWhite}`, width: '42px' }}
                                                    disabled={productDetails?.countColorWhiteL === 0}
                                                ></Radio.Button>
                                                <Radio.Button
                                                    value={productDetails?.colorBlack}
                                                    style={{ background: `${productDetails?.colorBlack}`, width: '42px' }}
                                                    disabled={productDetails?.countColorBlackL === 0}
                                                ></Radio.Button>
                                                <Radio.Button
                                                    value={productDetails?.colorBlue}
                                                    style={{ background: `${productDetails?.colorBlue}`, width: '40px' }}
                                                    disabled={productDetails?.countColorBlueL === 0}
                                                ></Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                ) : placement === 'XL' ?
                                    (
                                        <div>
                                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                                                <span>{productDetails?.countColorBeXL}</span>
                                                <span>{productDetails?.countColorWhiteXL}</span>
                                                <span>{productDetails?.countColorBlackXL}</span>
                                                <span>{productDetails?.countColorBlueXL}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Radio.Group value={color} onChange={colorChange}>
                                                    <Radio.Button
                                                        value={productDetails?.colorBe}
                                                        style={{ background: `${productDetails?.colorBe}`, width: '40px' }}
                                                        disabled={productDetails?.countColorBeXL === 0}>
                                                    </Radio.Button>
                                                    <Radio.Button
                                                        value={productDetails?.colorWhite} s
                                                        tyle={{ background: `${productDetails?.colorWhite}`, width: '42px' }}
                                                        disabled={productDetails?.countColorWhiteXL === 0}
                                                    ></Radio.Button>
                                                    <Radio.Button
                                                        value={productDetails?.colorBlack}
                                                        style={{ background: `${productDetails?.colorBlack}`, width: '42px' }}
                                                        disabled={productDetails?.countColorBlackXL === 0}
                                                    ></Radio.Button>
                                                    <Radio.Button
                                                        value={productDetails?.colorBlue}
                                                        style={{ background: `${productDetails?.colorBlue}`, width: '40px' }}
                                                        disabled={productDetails?.countColorBlueXL === 0}
                                                    ></Radio.Button>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                    ) : <div></div>
                    }

                    <LikeButtonComponent
                        dataHref={process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/" : window.location.href}
                    />
                    {/* <WrapperAddressProduct>
                        <span>Giao đến</span>
                        <span className='address'>{user?.address}</span> -
                        <span className='change-address'>Đổi địa chỉ</span>
                    </WrapperAddressProduct> */}
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng còn lại ({productDetails?.countInStock}) sản phẩm</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numberProduct === 1)}>
                                <MinusOutlined style={{ fontSize: '20px' }} />
                            </button>

                            <WrapperInputNumber onChange={onChange} defaultValue={1} value={numberProduct} max={productDetails?.countInStock} min={1} />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numberProduct === productDetails?.countInStock)}>
                                <PlusOutlined style={{ fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                        <WrapperStyleTextSell>Mô tả: {productDetails?.description}</WrapperStyleTextSell>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponents
                                size={20}
                                styleButton={{ background: 'rgb(255, 57, 69)', height: '49px', width: '220px', border: 'none', borderRadius: '4px' }}
                                textbutton={'Mua ngay'}
                                styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                onClick={handleAddOrderProduct}
                            >
                            </ButtonComponents>
                            {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm đã hết hàng</div>}
                        </div>
                    </div>
                </Col>
                <CommentComponent dataHref={process.env.REACT_APP_IS_LOCAL ? "https://clothingStore.com" : window.location.href} width="1350" />
            </Row>
        </Loading>
    )
}

export default ProductDetailsComponents