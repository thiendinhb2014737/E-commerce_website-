import React from 'react'
import { Lable, WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfo, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent, WrapperValue } from './style'
import logo from '../../assets/Images/Logo.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponents/Loading'
import TableComponent from '../../components/TableComponents/TableComponent'
import { Card, Col, Image, Row } from 'antd'
import { WrapperAddressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperStyleNameProduct } from '../../components/ProductDetailsComponents/style'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = location
  const { id } = params
  //console.log('idaaaaa', id)

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
  console.log('data', data)
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [data])

  return (
    <Loading isPending={isLoading}>
      <div style={{ width: '100%', height: '100%', background: '#f5f5fa' }}>
        <div style={{ width: '1270px', margin: '0 auto', height: '1270px', padding: '5px' }}>
          <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Chi tiết đơn hàng</h4>
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
              <Card title="Thông tin sản phẩm" bordered={false} style={{ width: '1270px' }}>
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
                        <Image src={order?.image} alt='img product' preview={false} style={{ width: '150px' }} />
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
                        </WrapperAddressProduct>
                      </Col>
                    </Row>
                  )
                })}
              </Card>

            </div>
          </WrapperStyleContent>

        </div>
      </div>
    </Loading>
  )
}

export default DetailsOrderPage