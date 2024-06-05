import React, { useEffect, useState } from 'react'
import Loading from '../../components/LoadingComponents/Loading';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';
import ButtonInputSearch from '../../components/ButtonInputSearch/ButtonInputSearch';
import { WrapperButtonMore } from '../Homepage/style';
import { useDebounce } from '../../hooks/useDebounce';

const MyOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [limit, setLimit] = useState(4)
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 100)
  const evaluatedListOrder = useSelector((state) => state?.orderEvaluate)

  const fetchMyOrder = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await OrderService.getOrderByUserId(state?.id, state?.token, limit, search)
    //console.log('res', res)
    return res.data
  }

  const id = state?.id
  const token = state?.token

  const queryOrder = useQuery({
    queryKey: ['orders', limit, searchDebounce],
    queryFn: fetchMyOrder,
    enabled: !!id && !!token
  })

  const { isPending, data } = queryOrder
  // console.log('data', data)


  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems, userId } = data
      const res = OrderService.cancelOrder(id, token, orderItems, userId)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    console.log('orderorder', order)
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isPending: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success('Hủy đơn hàng thành công!')
    } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    } else if (isErrorCancle) {
      message.error('Hủy đơn hàng thất bại!')
    }
  }, [isErrorCancle, isSuccessCancel])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={order?.image}
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px'
          }}
        />
        <div style={{
          width: 260,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: '10px'
        }}>{order?.name}</div>
        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
      </WrapperHeaderItem>
    })
  }

  return (

    <Loading isPending={isPending}>
      <WrapperContainer>
        <div style={{ height: '100%', width: '1350px', margin: '0 auto', padding: '5px' }}>
          <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Đơn hàng của tôi</h4>
          <WrapperListOrder>
            {data?.map((order) => {
              let orderEvaluatedRedux = evaluatedListOrder?.ListOrderEvaluated?.find((item) => item.ListOrderEvaluated === order?._id)
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Mã đơn hàng: </span>
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.maDH}`}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái đơn hàng</span>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Trạng thái: </span>
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.statusOder}`}</span>
                    </div>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                      <span
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {
                        !orderEvaluatedRedux ?
                          <ButtonComponents
                            onClick={() => handleCanceOrder(order)}
                            size={40}
                            styleButton={{
                              height: '36px',
                              border: '1px solid #9255FD',
                              borderRadius: '4px'
                            }}
                            textbutton={'Hủy đơn hàng'}
                            styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                          >
                          </ButtonComponents> : <div></div>
                      }
                      <ButtonComponents
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid #9255FD',
                          borderRadius: '4px'
                        }}
                        textbutton={'Xem chi tiết'}
                        styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                      >
                      </ButtonComponents>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textbutton={' Xem thêm'} type='outline'
              styleButton={{
                border: '1px solid rgb(10, 104, 255)',
                color: 'rgb(10, 104, 255)',
                width: '240px',
                height: '38px',
                borderRadius: '4px'
              }}
              // disabled={products?.total === products?.data?.length || products.totalPage === 1}
              styletextbutton={{ fontWeight: 500 }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage