import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUpLoadFile } from './style'
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

    useEffect(() => {
        if (isSuccess) {
            mes.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            mes.error()
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
    const handleOnChangeAddress = (value) => {
        setAddress(value)
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
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isPending={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputFormComponents id="name" style={{ width: '300px' }} value={name} onChange={handleOnChangeName} />
                        <ButtonComponents
                            onClick={handleUpdate}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px' }}
                            textbutton={'Cập nhật'}
                            styletextbutton={{ color: '#555', fontSize: '15px', fontWeight: '700' }}
                        >Cập nhật</ButtonComponents>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputFormComponents id="email" style={{ width: '300px' }} value={email} onChange={handleOnChangeEmail} />
                        <ButtonComponents
                            onClick={handleUpdate}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px' }}
                            textbutton={'Cập nhật'}
                            styletextbutton={{ color: '#555', fontSize: '15px', fontWeight: '700' }}
                        >Cập nhật</ButtonComponents>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputFormComponents id="phone" style={{ width: '300px' }} value={phone} onChange={handleOnChangePhone} />
                        <ButtonComponents
                            onClick={handleUpdate}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px' }}
                            textbutton={'Cập nhật'}
                            styletextbutton={{ color: '#555', fontSize: '15px', fontWeight: '700' }}
                        >Cập nhật</ButtonComponents>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputFormComponents id="naaddressme" style={{ width: '300px' }} value={address} onChange={handleOnChangeAddress} />
                        <ButtonComponents
                            onClick={handleUpdate}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px' }}
                            textbutton={'Cập nhật'}
                            styletextbutton={{ color: '#555', fontSize: '15px', fontWeight: '700' }}
                        >Cập nhật</ButtonComponents>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUpLoadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUpLoadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt='avatar' />
                        )}
                        {/*<InputFormComponents id="avatar" style={{ width: '300px' }} value={avatar} onChange={handleOnChangeAvatar} />*/}
                        <ButtonComponents
                            onClick={handleUpdate}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px' }}
                            textbutton={'Cập nhật'}
                            styletextbutton={{ color: '#555', fontSize: '15px', fontWeight: '700' }}
                        >Cập nhật</ButtonComponents>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage