import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import ImageLogo from '../../assets/Images/Logo.png'
import { Image } from 'antd'
import {
  EyeFilled, EyeInvisibleFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import * as mes from '../../components/Message/Message'

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const mutation = useMutationHooks(
    (data) => UserService.signupUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      mes.success()
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
      confirmPassword
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
          <div style={{ position: 'relative' }}>
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
              textButton={'Đăng ký'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            >
            </ButtonComponents>
          </Loading>

          <p style={{ margin: '10px', fontSize: '13px' }}>Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={ImageLogo} preview={false} alt='img-logo' height={'203px'} width={'203px'} />
          <h4>Mua sắm tại Dingvog</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage