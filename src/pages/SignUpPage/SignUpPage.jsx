import React, { useEffect, useState } from 'react'
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
import moment from 'moment'

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const date = moment().format("MMMM YYYY")

  const mutation = useMutationHooks(
    (data) => UserService.signupUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      mes.success('Bạn đã đăng ký thành công!')
      handleNavigateSignIn()
    } else if (isError) {
      mes.error()
    }
  }, [isSuccess, isError])

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

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
      createUserdAt: String(date)
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '950px', height: '480px', borderRadius: '4px', backgroundColor: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1 style={{ margin: '10px', marginBottom: '20px' }}>Đăng ký tài khoản!</h1>
          <p style={{ margin: '10px', marginBottom: '20px', fontSize: '13px' }}>Đăng ký và tạo tài khoản</p>
          <InputFormComponents style={{ marginBottom: '20px' }} placeholder='abc@gmail.com' value={email} onChange={handleOnChangeEmail} />
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
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={20}
              styleButton={{ background: 'rgb(255, 57, 69)', height: '49px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }}
              textbutton={'Đăng ký'}
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

export default SignUpPage