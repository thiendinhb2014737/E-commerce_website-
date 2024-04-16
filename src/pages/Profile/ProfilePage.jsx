import React, { useEffect, useState } from 'react'
import { WapperGoHome, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUpLoadFile } from './style'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import * as mes from '../../components/Message/Message'
import { updateUser } from '../../redux/slice/UserSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'
const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const dispatch = useDispatch()
    const { data, isPending, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])
    function refreshPage() {
        window.location.reload(true);
    }

    useEffect(() => {
        if (isSuccess) {
            mes.success('Cập nhật thông tin thành công!')
            handleGetDetailsUser(user?.id, user?.access_token)
            //refreshPage()
        } else if (isError) {
            mes.error('Cập nhật thông tin thất bại!')
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }

    const handleOnChangePhone = (value) => {
        setPhone(value)
    }
    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
    }

    return (
        <Loading isPending={isPending}>
            <div style={{ width: '1350px', margin: '0 auto', height: '100%', marginBottom: '30px' }}>
                <div style={{ display: 'flex', padding: '5px' }}>
                    <WapperGoHome to='/'>Trang chủ</WapperGoHome>
                    <p style={{ padding: '0 5px' }}>|</p>
                    <p>Tài khoản người dùng</p>
                </div>
                <WrapperHeader >THÔNG TIN NGƯỜI DÙNG</WrapperHeader>

                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt='avatar' />
                        )}
                        <WrapperUpLoadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUpLoadFile>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Họ và tên</WrapperLabel>
                        <InputFormComponents id="name" style={{ width: '400px' }} value={name} onChange={handleOnChangeName} />
                        {/* <ButtonComponents
                            onClick={handleUpdate}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px' }}
                            textbutton={'Cập nhật'}
                            styletextbutton={{ color: '#555', fontSize: '15px', fontWeight: '700' }}
                        >Cập nhật</ButtonComponents> */}
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Địa chỉ email</WrapperLabel>
                        <InputFormComponents id="email" style={{ width: '400px' }} value={email} onChange={handleOnChangeEmail} />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                        <InputFormComponents id="phone" style={{ width: '400px' }} value={phone} onChange={handleOnChangePhone} />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Địa chỉ giao hàng</WrapperLabel>
                        <textarea name="" id="address" cols="60" rows="8" value={address} style={{ border: 'none', borderRadius: '5px', paddingLeft: '8px' }} placeholder='Nhập nội dung liên hệ...' onChange={handleOnChangeAddress} />
                        {/* <InputFormComponents id="address" style={{ width: '520px' }} value={address} onChange={handleOnChangeAddress} /> */}
                    </WrapperInput>

                    <ButtonComponents
                        onClick={handleUpdate}
                        size={20}
                        styleButton={{ height: '30px', width: '100px', borderRadius: '4px', padding: '2px 6px 6px', background: '#5774F8', margin: '0 auto' }}
                        textbutton={'Cập nhật'}
                        styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    >Cập nhật</ButtonComponents>
                </WrapperContentProfile>

            </div>
        </Loading>
    )
}

export default ProfilePage