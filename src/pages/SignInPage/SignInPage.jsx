import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import ImageLogo from '../../assets/Images/Logo.png'
import { Image } from 'antd'
import {
    EyeFilled, EyeInvisibleFilled
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode"
import { updateUser } from '../../redux/slice/UserSlide'

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()

    const mutation = useMutationHooks(
        (data) => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                //console.log('decoded', decoded)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }

        }
    }, [isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
    //console.log('mutation', mutation)
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnChangePassword = (value) => {
        setPassword(value)
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '443px', borderRadius: '4px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1 style={{ margin: '10px' }}>Xin chào!</h1>
                    <p style={{ margin: '10px', fontSize: '13px' }}>Đăng nhập và tạo tài khoản</p>
                    <InputFormComponents style={{ marginBottom: '15px' }} placeholder='abc@gmail.com' value={email} onChange={handleOnChangeEmail} />

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
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponents
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}

                            size={20}
                            styleButton={{ background: 'rgb(255, 57, 69)', height: '49px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >
                        </ButtonComponents>
                    </Loading>
                    <p style={{ margin: '10px' }}><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p style={{ margin: '10px', fontSize: '13px' }}>Chưa có tài khoản?<WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={ImageLogo} preview={false} alt='img-logo' height={'203px'} width={'203px'} />
                    <h4>Mua sắm tại Dingvog</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage