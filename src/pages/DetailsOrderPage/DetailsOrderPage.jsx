import React, { useState } from 'react'
import { Lable, WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfo, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent, WrapperValue } from './style'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponents/Loading'
import { Button, Card, Col, Image, Radio, Row } from 'antd'
import { WrapperAddressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperStyleNameProduct } from '../../components/ProductDetailsComponents/style'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import ModalComponents from '../../components/ModalComponents/ModalComponents'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as mes from '../../components/Message/Message'
import * as ProductService from '../../services/ProductService'
import { addorderEvaluateProduct } from '../../redux/slice/orderEvaluateSlice';
import { useDispatch, useSelector } from 'react-redux'
import {
  StarOutlined
} from '@ant-design/icons';
const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false)
  const [evaluate, setEvaluate] = useState('')
  const [isEvaluated, setIsEvaluated] = useState(false)
  const [isOpenEvaluateComplete, setIsOpenEvaluateComplete] = useState(false)
  const [evaluateIDPro, setEvaluateIDPro] = useState('')
  const { state } = location
  const { id } = params
  const dispatch = useDispatch()
  const evaluatedListOrder = useSelector((state) => state?.orderEvaluate)

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }
  const queryOrder = useQuery({
    queryKey: ['orders-details'],
    queryFn: fetchDetailsOrder,
    enabled: !!id
  })

  const { isLoading, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [data])
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  const handleOnChangeEvaluate = (id) => {
    setIsOpenEvaluate(true)
    setEvaluateIDPro(id)
  }
  const onChangeEvaluate = (e) => {
    setEvaluate(e.target.value);
  }
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, ...rests } = data
      const res = ProductService.evaluate(id, rests)
      return res
    },
  )

  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      mes.success('Đánh giá sản phẩm thành công!')
      setIsEvaluated(true)
      setIsOpenEvaluate(false)
      setIsOpenEvaluateComplete(true)
      // handleUpdateEvalue()
    } else if (isErrorUpdated) {
      mes.error('Đánh giá sản phẩm thất bại!')
    }
  }, [isSuccessUpdated])

  const handleEvalute = () => {
    mutationUpdate.mutate({ id: evaluateIDPro, rating: evaluate })
  }
  const orderEvaluatedRedux = evaluatedListOrder?.ListOrderEvaluated?.find((item) => item.ListOrderEvaluated === id)
  const handleOnEvaluated = () => {
    setIsOpenEvaluateComplete(false)
    dispatch(addorderEvaluateProduct({
      ListOrderEvaluated: id,
    }))
  }

  // console.log(evaluatedListOrder.ListOrderEvaluated)
  // console.log(isEvaluated)
  // console.log('orderEvaluatedRedux', orderEvaluatedRedux)
  return (
    <Loading isPending={isLoading}>
      <div style={{ width: '100%', height: '100%', background: '#f5f5fa' }}>
        <div style={{ width: '1350px', margin: '0 auto', height: '1350px', padding: '5px' }}>
          <div style={{ display: 'flex', padding: '5px' }}>
            <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span></h4>
            <h4 style={{ padding: '0 5px' }}>|</h4>
            <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/my-order') }}> Đơn hàng của tôi</span> | Chi tiết đơn hàng</h4>
          </div>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <Card title="Địa chỉ người nhận" bordered={false} >
                <WrapperContentInfo>
                  <div className='name-info'>{data?.shippingAddress?.fullName}</div>
                  <div className='address-info'><span>Địa chỉ giao hàng: </span> {`${data?.shippingAddress?.address}`}</div>
                  <div className='phone-info'><span>Số điện thoại: </span> {data?.shippingAddress?.phone}</div>
                </WrapperContentInfo>
              </Card>
            </WrapperInfoUser>

            <WrapperInfoUser>
              <Card title="Hình thức giao hàng" bordered={false} >
                <WrapperContentInfo>
                  <div className='delivery-info' style={{ width: 250 }}><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
                  <div className='delivery-fee' style={{ width: 250 }}><span>Phí vận chuyển: </span> {data?.shippingPrice}</div>
                </WrapperContentInfo>
              </Card>
            </WrapperInfoUser>

            <WrapperInfoUser>
              <Card title="Hình thức thanh toán" bordered={false} >
                <WrapperContentInfo>
                  <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
                  <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                </WrapperContentInfo>
              </Card>
            </WrapperInfoUser>
            <Card title="Thông tin sản phẩm" bordered={false} style={{ width: 250 }}>
              <WrapperAllPrice>
                <WrapperItemLabel>Tổng tiền hàng</WrapperItemLabel>
                <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <WrapperItemLabel>Tổng thanh toán</WrapperItemLabel>
                <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
              </WrapperAllPrice>
            </Card>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Card title="Thông tin sản phẩm" bordered={false} style={{ width: '1350px' }}>
                <WrapperInfo>
                  <div>
                    <Lable>Mã đơn hàng:</Lable>
                    <WrapperValue>
                      <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{data?.maDH}</span>
                    </WrapperValue>
                  </div>
                </WrapperInfo>
                {data?.orderItems?.map((order) => {
                  return (
                    <Row key={order?.product} style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                      <Col span={5} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                        <Image src={order?.image} alt='img product' preview={false} style={{ width: '150px' }} onClick={() => handleDetailsProduct(order?.product)} />
                      </Col>
                      <Col span={19} style={{ paddingLeft: '6px' }}>
                        <WrapperStyleNameProduct style={{ fontSize: '18px', margin: '4px', padding: '0', display: 'flex' }}>{order?.name} (size {order?.size}, màu{<div style={{ width: '20px', height: '20px', background: `${order?.color}`, marginLeft: '5px', marginTop: '5px' }} />} )</WrapperStyleNameProduct>
                        <WrapperPriceProduct>
                          <WrapperPriceTextProduct style={{ fontSize: '18px', margin: '4px', padding: '0' }}>{convertPrice(order?.price)} (x{order?.amount})</WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                        <WrapperPriceProduct>
                          <WrapperPriceTextProduct style={{ fontSize: '18px', margin: '4px', padding: '0' }}>(Giảm giá: {convertPrice((priceMemo * order?.discount) / 100)})</WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                        <WrapperAddressProduct>

                          {
                            data?.statusOder === 'Đã xác nhận' ?
                              !orderEvaluatedRedux && isEvaluated === false ?
                                <ButtonComponents
                                  onClick={() => handleOnChangeEvaluate(order?.product)}
                                  size={40}
                                  styleButton={{
                                    height: '36px',
                                    border: '1px solid #9255FD',
                                    borderRadius: '4px'
                                  }}
                                  textbutton={'Đánh giá sản phẩm'}
                                  styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                                >
                                </ButtonComponents>
                                :
                                <ButtonComponents
                                  size={40}
                                  styleButton={{
                                    height: '36px',
                                    border: '1px solid #9255FD',
                                    borderRadius: '4px'
                                  }}
                                  textbutton={'Sản phẩm đã được đánh giá'}
                                  styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                                >
                                </ButtonComponents>
                              : <div></div>

                          }
                        </WrapperAddressProduct>
                      </Col>
                    </Row>
                  )
                })}
              </Card>

            </div>
          </WrapperStyleContent>
          {
            isOpenEvaluateComplete ?
              <ButtonComponents
                onClick={handleOnEvaluated}
                size={40}
                styleButton={{
                  height: '36px',
                  border: '1px solid #9255FD',
                  borderRadius: '4px'
                }}
                textbutton={'Hoàn tất đánh giá'}
                styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
              >
              </ButtonComponents>
              :
              <div></div>
          }
        </div>
      </div>

      <ModalComponents title="Quí khách vui lòng chọn mức đánh giá" open={isOpenEvaluate} onCancel={() => setIsOpenEvaluate(false)} footer={null}>
        <Radio.Group onChange={onChangeEvaluate} value={evaluate}>
          <Row>
            <Radio value={1} onClick={() => setEvaluate(1)}>
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
            </Radio>
          </Row>
          <Row>
            <Radio value={2} onClick={() => setEvaluate(2)}>
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
            </Radio>
          </Row>
          <Row>
            <Radio value={3} onClick={() => setEvaluate(3)}>
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
            </Radio>
          </Row>
          <Row>
            <Radio value={4} onClick={() => setEvaluate(4)}>
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
            </Radio>
          </Row>
          <Row>
            <Radio value={5} onClick={() => setEvaluate(5)}>
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
              <StarOutlined style={{ fontSize: '16px', color: 'yellow' }} />
            </Radio>
          </Row>
        </Radio.Group>
        <Row style={{ marginTop: '10px' }}>
          <Button type="primary" htmlType="submit" onClick={handleEvalute}>
            Đánh giá
          </Button>
        </Row>
      </ModalComponents>
    </Loading>
  )
}

export default DetailsOrderPage