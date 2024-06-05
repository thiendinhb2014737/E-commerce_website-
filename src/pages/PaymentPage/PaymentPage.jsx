import { Button, Form, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';

import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import * as PaymentService from '../../services/PaymentService'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slice/UserSlide';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';
import ModalComponents from '../../components/ModalComponents/ModalComponents';
import InputComponents from '../../components/InputComponents/InputComponents';
import { removeAllOrderProduct } from '../../redux/slice/orderSlide';
import { PayPalButton } from 'react-paypal-button-v2';
import moment from 'moment';
import Loading from "../../components/LoadingComponents/Loading";
//import StepComponent from '../../components/StepConponent/StepComponent';

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [payment, setPayment] = useState('later_money')
    const [delivery, setDelivery] = useState('fast')
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [sdkReady, setSdkReady] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const date = moment().format("MMMM YYYY")
    const a = Math.floor(Math.random() * 10000)
    const maDH = `DINGVOG${a}`
    const [stateMaDH, setStateMaDH] = useState('')
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
    })

    const navigate = useNavigate()
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const handleDilivery = (e) => {
        setDelivery(e.target.value)
    }
    const handlePayment = (e) => {
        setPayment(e.target.value)
    }


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



    const handleAddOrder = () => {
        setStateMaDH(maDH)
        if (user?.access_token && order?.orderItemsSelected && user?.name && user?.address && user?.phone && priceMemo && user?.id) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderItems: order?.orderItemsSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    maDH: maDH,
                    createOrderdAt: String(date)
                }
            )
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
    const mutationAddOrder = useMutationHooks(
        (data) => {
            const {
                token,
                ...rests } = data
            const res = OrderService.createOrder(
                { ...rests },
                token)
            return res
        },
    )

    //const { isPending, data } = mutationUpdate
    const { data: dataAdd, isPending: isPendingAddOrder, isSuccess, isError } = mutationAddOrder
    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrayOrdered = []
            order?.orderItemsSelected?.forEach(element => {
                arrayOrdered.push(element.product)
            });
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
            message.success('Đặt hàng thành công!')
            navigate('/orderSuccess', {
                state: {
                    stateMaDH,
                    delivery,
                    payment,
                    orders: order?.orderItemsSelected,
                    totalPriceMemo: totalPriceMemo
                }
            })
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

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
                    dispatch(updateUser({ name, phone, address }))
                    setIsOpenModalUpdateInfo(false)
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


    const onSuccessPaypal = (details, data) => {
        setStateMaDH(maDH)
        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                isPaid: true,
                paidAt: details.update_time,
                email: user?.email,
                maDH: maDH,
                createOrderdAt: String(date),
            }
        )
    }
    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig()
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript()
        }
        else {
            setSdkReady(true)
        }
    }, [])

    return (
        < Loading isPending={isPendingAddOrder}>
            <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>

                <div style={{ height: '100%', width: '1350px', margin: '0 auto', padding: '8px' }}>
                    <div style={{ display: 'flex', padding: '5px' }}>
                        <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/') }}>Trang chủ</span></h4>
                        <h4 style={{ padding: '0 5px' }}>|</h4>
                        <h4><span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#5774F8' }} onClick={() => { navigate('/order') }}> Giỏ hàng</span> | Thanh toán</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                        <WrapperLeft>
                            <WrapperInfo style={{ marginBottom: '20px' }}>
                                <div >
                                    <Lable>Chọn phương thức giao hàng</Lable>
                                    <WrapperRadio onChange={handleDilivery} value={delivery}>
                                        <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Lable>Chọn phương thức thanh toán</Lable>
                                    <WrapperRadio onChange={handlePayment} value={payment}>
                                        <Radio value="later_money"> Thanh toán khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán bằng paypal</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                        </WrapperLeft>
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
                            {payment === 'paypal' && sdkReady ? (
                                <div style={{ width: '320px' }}>
                                    <PayPalButton
                                        amount={Math.round(totalPriceMemo / 30000)}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => {
                                            alert("Error!");
                                        }}
                                    />
                                </div>

                            ) : (
                                <ButtonComponents
                                    onClick={() => handleAddOrder()}
                                    size={40}
                                    styleButton={{
                                        background: 'rgb(255, 57, 69)',
                                        height: '48px',
                                        width: '320px',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                    textbutton={'Đặt hàng'}
                                    styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponents>
                            )}

                        </WrapperRight>
                    </div>
                </div>

                <ModalComponents title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} footer={null}>
                    {/* <Loading isPending={isPending}> */}
                    <div>Bạn cần cung cấp đầy đủ thông thin cần thiết</div>
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
                            <Button type="primary" htmlType="submit" onClick={handleUpdateInforUser}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* </Loading> */}
                </ModalComponents>
            </div>
        </Loading>
    )
}

export default PaymentPage