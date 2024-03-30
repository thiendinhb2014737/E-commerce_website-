import React, { useEffect, useState } from 'react'
import { WapperGoHome, WrapperContentContact, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUpLoadFile } from './style'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import { useDispatch, useSelector } from 'react-redux'
import * as ContactService from '../../services/ContactService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import * as mes from '../../components/Message/Message'


const ContactPage = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [content, setContent] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const { email, name, phone, content } = data
            ContactService.createContact({ email, name, phone, content })
        }
    )

    const { data, isPending, isSuccess, isError } = mutation

    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setName('')
            setPhone('')
            setContent('')
            mes.success("Liên hệ thành công!")
        } else if (isError) {
            mes.error()
        }
    }, [isSuccess])


    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }

    const handleOnChangePhone = (value) => {
        setPhone(value)
    }
    const handleOnChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleContact = () => {
        mutation.mutate({ email, name, phone, content })
    }

    return (
        <Loading isPending={isPending}>
            <div style={{ width: '1350px', margin: '0 auto', height: '100%', }}>
                <div style={{ display: 'flex', padding: '5px' }}>
                    <WapperGoHome to='/'>Trang chủ</WapperGoHome>
                    <p style={{ padding: '0 5px' }}>|</p>
                    <p>Liên hệ chúng tôi</p>
                </div>
                <WrapperHeader >THÔNG TIN LIÊN HỆ</WrapperHeader>

                <div style={{ display: 'flex' }}>
                    <WrapperContentProfile>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Họ và tên</WrapperLabel>
                            <InputFormComponents id="name" style={{ width: '400px' }} placeholder='Nhập tên...' value={name} onChange={handleOnChangeName} />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Địa chỉ email</WrapperLabel>
                            <InputFormComponents id="email" style={{ width: '400px' }} placeholder='Nhập địa chỉ email...' value={email} onChange={handleOnChangeEmail} />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                            <InputFormComponents id="phone" style={{ width: '400px' }} placeholder='Nhập số điện thoại...' value={phone} onChange={handleOnChangePhone} />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="phone">Nội dung</WrapperLabel>
                            <textarea name="" id="" cols="60" rows="8" value={content} placeholder='Nhập nội dung liên hệ...' onChange={handleOnChangeContent} />
                        </WrapperInput>

                        <ButtonComponents
                            onClick={handleContact}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px', background: '#fff' }}
                            textbutton={'Liên hệ chúng tôi'}
                            styletextbutton={{ color: '#000', fontSize: '15px', fontWeight: '700' }}
                        >Liên hệ</ButtonComponents>
                    </WrapperContentProfile>
                    <WrapperContentContact></WrapperContentContact>
                </div>

            </div>
        </Loading>
    )
}

export default ContactPage