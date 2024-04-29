import { Button, Checkbox, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { WrapperInputNumber } from '../../components/ProductDetailsComponents/style';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponents/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slice/UserSlide';
import { useNavigate } from 'react-router-dom';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slice/orderSlide';
import { convertPrice } from '../../utils';
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';
import ModalComponents from '../../components/ModalComponents/ModalComponents';
import InputComponents from '../../components/InputComponents/InputComponents';
import { WrapperUpLoadFile } from '../../components/AdminProduct/style';
import StepComponents from '../../components/Step/StepComponents';



const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
    })

    const navigate = useNavigate()
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }

    };

    const handleChangeCount = (type, idProduct, limited) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }))
            }

        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }))
            }
        }

    }

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }

    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address
            })
        }
    }, [isOpenModalUpdateInfo])


    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }

    }
    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + (cur.price * cur.amount)
        }, 0)
        return result
    }, [order])

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (priceMemo * (totalDiscount * cur.amount) / 100)
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 200000 && priceMemo < 500000) {
            return 25000
        } else if (priceMemo >= 500000 || order?.orderItemsSelected?.length === 0) {
            return 0
        } else {
            return 35000
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    // bỏ city vd 57, 20:18
    const handleAddCard = () => {
        //console.log('user', user)
        if (!order?.orderItemsSelected?.length) {
            message.error('Không có sản phẩm nào được chọn!')
        } else if (!user?.name || !user?.phone || !user?.address) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment')
        }
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,
                { ...rests },
                token,)
            return res
        },
    )

    const { isPending, data } = mutationUpdate

    //console.log('data', data)
    const handleCancleUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }
    const handleUpdateInforUser = () => {
        const { name, phone, address } = stateUserDetails
        if (name && phone && address) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    setIsOpenModalUpdateInfo(false)
                    data.refetch()
                    dispatch(updateUser({ name, phone, address }))

                }
            })
        }
    }

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    //console.log('stateUserDetails', stateUserDetails)

    // console.log(listChecked)
    const itemsDelivery = [
        {
            title: '35.000 VNĐ',
            description: ' <200.000 VNĐ',
        },
        {
            title: '25.000 VNĐ',
            description: '200.000 - 500.000 VNĐ',
        },
        {
            title: 'Miễn phí vận chuyển',
            description: '> 500.000 VNĐ',
        },
    ]
    const newArrayListCart = order?.orderItems.slice().reverse();
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100%', paddingBottom: '200px' }}>
            <Loading isPending={isPending}>
                <div style={{ width: '1350px', margin: '0 auto', padding: '8px' }}>
                    <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span> | Giỏ hàng</h4>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/*  */}
                        {order?.userIds === user?.id ? (
                            <WrapperLeft>
                                <WrapperStyleHeaderDilivery>
                                    <span>Phí vận chuyển</span>
                                    <StepComponents items={itemsDelivery} current={diliveryPriceMemo === 35000 ? 1 : diliveryPriceMemo === 25000 ? 2 : order?.orderItemsSelected?.length === 0 ? 0 : 3} />
                                </WrapperStyleHeaderDilivery>
                                <WrapperStyleHeader>
                                    <span style={{ display: 'inline-block', width: '390px' }}>
                                        <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length} ></Checkbox>
                                        <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                                    </span>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Đơn giá</span>
                                        <span>Số lượng</span>
                                        <span>Thành tiền</span>
                                        <button style={{ cursor: 'pointer', fontSize: '10px' }} onClick={handleRemoveAllOrder}>Xóa tất cả</button>
                                        {/* <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} /> */}
                                    </div>
                                </WrapperStyleHeader>
                                <WrapperListOrder>
                                    {newArrayListCart.map((order) => {
                                        return (
                                            <WrapperItemOrder key={order?.product}>
                                                <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    {/* <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox> */}
                                                    <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                                                    <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} onClick={() => handleDetailsProduct(order?.product)} />
                                                    <div style={{
                                                        width: 'px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        display: 'flex'
                                                    }}>{order?.name} (size {order?.size}, màu{<div style={{ width: '20px', height: '14px', background: `${order?.color}`, marginLeft: '5px', border: '1px solid #999' }} />} )</div>
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <span>
                                                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                                                    </span>
                                                    <WrapperCountOrder>
                                                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                                                            <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                        </button>
                                                        <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                                                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInStock)}>
                                                            <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                        </button>
                                                    </WrapperCountOrder>
                                                    <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                                                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                                </div>
                                            </WrapperItemOrder>
                                        )
                                    })}
                                </WrapperListOrder>
                            </WrapperLeft>
                        ) : <WrapperLeft>
                            <WrapperStyleHeaderDilivery>
                                <span>Phí vận chuyển</span>
                                <StepComponents items={itemsDelivery} current={diliveryPriceMemo === 35000 ? 1 : diliveryPriceMemo === 25000 ? 2 : order?.orderItemsSelected?.length === 0 ? 0 : 3} />
                            </WrapperStyleHeaderDilivery>
                            <WrapperStyleHeader>
                                <span style={{ display: 'inline-block', width: '390px' }}>
                                    <Checkbox ></Checkbox>
                                    <span> Tất cả (0 sản phẩm)</span>
                                </span>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Đơn giá</span>
                                    <span>Số lượng</span>
                                    <span>Thành tiền</span>
                                    <button style={{ cursor: 'pointer', fontSize: '10px' }} onClick={handleRemoveAllOrder}>Xóa tất cả</button>
                                    {/* <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} /> */}
                                </div>
                            </WrapperStyleHeader>
                            <WrapperListOrder>

                            </WrapperListOrder>
                        </WrapperLeft>
                        }

                        <WrapperRight>
                            <div style={{ width: '100%' }}>

                                <WrapperInfo>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Tổng tiền hàng:</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Tổng giảm giá:</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Tổng tiền phí vận chuyển:</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                    </div>
                                </WrapperInfo>
                                <WrapperTotal>
                                    <span>Tổng thanh toán:</span>
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                    </span>
                                </WrapperTotal>
                                <WrapperInfo>
                                    <div>
                                        <span>Địa chỉ giao hàng: </span>
                                        <span style={{ fontWeight: 'bold' }}>{`${user?.address}`} </span>
                                        <span style={{ color: '#9255FD', cursor: 'pointer' }} onClick={handleChangeAddress}>Chỉnh sửa</span>
                                    </div>
                                </WrapperInfo>
                            </div>
                            <ButtonComponents
                                onClick={() => handleAddCard()}
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '320px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                textbutton={'Mua ngay'}
                                styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponents>
                        </WrapperRight>
                    </div>
                </div>
                <ModalComponents title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} footer={null}>
                    <div style={{ margin: '10px' }}>Bạn cần cung cấp đầy đủ thông thin cần thiết</div>
                    <Form
                        name="basic"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}
                        //onFinish={onupdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên người dùng"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponents value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <InputComponents value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ giao hàng"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <InputComponents value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={handleUpdateInforUser} >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>

                </ModalComponents>
            </Loading>
        </div>
    )
}

export default OrderPage