import React from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo } from './style';
import Loading from '../../components/LoadingComponents/Loading';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';


const OrderSucess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  //console.log('location', location)
  const { state } = location

  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      {/* <Loading isLoading={false}> */}
      <div style={{ height: '100%', width: '1350px', margin: '0 auto', padding: '8px' }}>
        <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Thông tin đơn hàng</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Lable>Mã đơn hàng</Lable>
                <WrapperValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{state?.stateMaDH}</span>
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state?.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order.image}>
                    <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{
                        width: 260,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'flex'
                      }}>{order?.name} (size {order?.size}, màu{<div style={{ width: '20px', height: '14px', background: `${order?.color}`, marginLeft: '5px', border: '1px solid #e5e5e5' }} />} )</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>
                        <span style={{ fontSize: '14px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                      </span>
                      <span>
                        <span style={{ fontSize: '14px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                      </span>
                      <span>
                        <span style={{ fontSize: '14px', color: '#242424' }}>Giảm giá: {order?.discount} %</span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperItemOrderInfo>
            <div>
              <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
            </div>
          </WrapperContainer>
        </div>
      </div>
      {/* </Loading> */}
    </div>
  )
}

export default OrderSucess