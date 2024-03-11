import React, { useEffect, useState } from 'react'
import ImageLogoTransparent from '../../assets/Images/Logo_trongsuot.png'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/LoadingComponents/Loading'
import { useDispatch } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import { Image } from 'antd'
import * as message from '../../components/Message/Message'


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const mutation = useMutationHooks(
        (data) => UserService.getEmailUser(data)
    )
    const { data, isPending, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'ERR') {
                message.error('Địa chỉ email không hợp lệ!')
            } else {
                navigate('/change-password', { state: email })
            }
        }
    }, [isSuccess])

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email
        })
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '950px', height: '480px', borderRadius: '4px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1 style={{ margin: '10px', marginBottom: '20px' }}>Thay đổi mật khẩu</h1>
                    <p style={{ margin: '10px', marginBottom: '20px', fontSize: '14px' }}>Vui lòng nhập tài khoản email mà bạn đã đăng ký!</p>
                    <InputFormComponents style={{ marginBottom: '20px' }} placeholder='abc@gmail.com' value={email} onChange={handleOnChangeEmail} />

                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponents
                            disabled={!email.length}
                            onClick={handleSignIn}
                            size={20}
                            styleButton={{ background: 'rgb(255, 57, 69)', height: '49px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }}
                            textbutton={'Thay đổi mật khẩu'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >
                        </ButtonComponents>
                    </Loading>

                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={ImageLogoTransparent} preview={false} alt='img-logo' height={'250px'} width={'250px'} />
                    <p style={{ color: '#333' }}>Mua sắm tại Dingvog với nhiều ưu đãi vô cùng hấp dẫn</p>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default ForgotPassword