import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus, WrapperHeaderContent, WrapperHeader } from './style';
import { useLocation, useNavigate } from 'react-router-dom';

import * as message from '../../components/Message/Message'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';

import { Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { removeloveProProduct } from '../../redux/slice/loveProductSlice';

const MyLovePro = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [listChecked, setListChecked] = useState([])
    const lovePro = useSelector((state) => state?.lovePro)

    const handleDeleteLovePro = (idProduct) => {
        dispatch(removeloveProProduct({ idProduct }))
    }
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    const newArrayListLovePro = lovePro?.loveProItems.slice().reverse();
    // console.log(lovePro?.loveProItems)
    return (
        <>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1350px', margin: '0 auto', padding: '5px' }}>
                    <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Yêu thích của tôi</h4>
                    <WrapperHeader>
                        <span style={{ display: 'inline-block', width: '390px' }}>
                            <span> Tất cả ({lovePro?.loveProItems?.length}) sản phẩm được yêu thích</span>
                        </span>
                    </WrapperHeader>
                    <WrapperListOrder>
                        {newArrayListLovePro?.map((item) => {
                            return (
                                <WrapperItemOrder key={item?._id}>
                                    <WrapperHeaderItem >
                                        <img src={item?.image}
                                            style={{
                                                width: '120px',
                                                height: '120px',
                                                objectFit: 'cover',
                                                border: '1px solid rgb(238, 238, 238)',
                                                padding: '2px'
                                            }}
                                        />
                                        <WrapperHeaderContent>
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ fontSize: '15px', color: '#242424', marginRight: 'auto', padding: '2px' }}>{item?.name}</div>
                                                <Rate allowHalf defaultValue={item?.rating} value={item?.rating} />
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto', padding: '2px' }}>Giá bán: {convertPrice(item?.price)}</div>
                                            <div style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto', padding: '2px' }}>Thể loại sản phẩm:{item?.gender}</div>
                                            <div style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto', padding: '2px' }}>Đã bán {item?.selled || 0}+</div>
                                            <div style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto', padding: '2px' }}>Số lượng còn lại ({item?.countInStock}) sản phẩm</div>
                                            <div style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto', padding: '2px' }}>Mô tả sản phẩm: {item?.description}</div>
                                        </WrapperHeaderContent>

                                    </WrapperHeaderItem>
                                    <WrapperFooterItem>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponents
                                                onClick={() => handleDeleteLovePro(item?.product)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Bỏ yêu thích'}
                                                styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponents>
                                            <ButtonComponents
                                                onClick={() => handleDetailsProduct(item?.product)}
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
                    {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
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
            </div> */}
                </div>
            </WrapperContainer>
        </>
    )
}

export default MyLovePro