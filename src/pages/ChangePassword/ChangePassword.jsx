import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import ImageLogoTransparent from '../../assets/Images/Logo_trongsuot.png'
import { Image } from 'antd'
import {
    EyeFilled, EyeInvisibleFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import * as mes from '../../components/Message/Message'


const ChangePassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const { state } = useLocation()
    const email = state

    const mutation = useMutationHooks(
        (data) => UserService.changePassword(data)
    )
    const { data, isPending, isSuccess, isError } = mutation

    useEffect(() => {
        if (isSuccess) {
            mes.success('Thay đổi mật khẩu thành công!')
            handleNavigateSignIn()
        } else if (isError) {
            mes.error('Thay đổi mật khẩu thất bại!')
        }
    }, [isSuccess, isError])

    const handleOnChangePassword = (value) => {
        setPassword(value)
    }

    const handleOnChangeConfirmPassword = (value) => {
        setconfirmPassword(value)
    }

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }
    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
        })
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '950px', height: '480px', borderRadius: '4px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1 style={{ margin: '10px', marginBottom: '20px' }}>Thay đổi mật khẩu!</h1>
                    <p style={{ margin: '10px', marginBottom: '20px', fontSize: '13px' }}>Vui lòng nhập mật khẩu mới!</p>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',

                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputFormComponents placeholder='password' type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
                    </div>
                    <div style={{ position: 'relative', margin: '20px 0' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',

                            }}
                        >{
                                isShowConfirmPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputFormComponents placeholder='comfirm password' type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
                    </div>

                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponents
                            disabled={!password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={20}
                            styleButton={{ background: 'rgb(255, 57, 69)', height: '49px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }}
                            textbutton={'Thay đổi mật khẩu'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >
                        </ButtonComponents>
                    </Loading>

                    <p style={{ margin: '10px', fontSize: '13px' }}>Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={ImageLogoTransparent} preview={false} alt='img-logo' height={'250px'} width={'250px'} />
                    <p style={{ color: '#333' }}>Đăng ký tài khoản để nhận nhiều ưu đãi đến từ DingVog</p>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default ChangePassword