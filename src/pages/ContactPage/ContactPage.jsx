import React, { useEffect, useState } from 'react'
import { WapperGoHome, WrapperContentContact, WrapperContentContactRight, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUpLoadFile } from './style'
import InputFormComponents from '../../components/InputFormComponents/InputFormComponents'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import { useDispatch, useSelector } from 'react-redux'
import * as ContactService from '../../services/ContactService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import * as mes from '../../components/Message/Message'
import {
    FacebookFilled, InstagramFilled, TwitterCircleFilled, MailFilled, PhoneFilled, HomeFilled
} from '@ant-design/icons';

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
            <div style={{ width: '1350px', margin: '0 auto', height: '100%', marginBottom: '30px' }}>
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
                            <WrapperLabel htmlFor="phone">Nội dung liên hệ</WrapperLabel>
                            <textarea name="" id="" cols="60" rows="8" value={content} style={{ border: 'none', borderRadius: '5px', paddingLeft: '8px' }} placeholder='Nhập nội dung liên hệ...' onChange={handleOnChangeContent} />
                        </WrapperInput>

                        <ButtonComponents
                            onClick={handleContact}
                            size={20}
                            styleButton={{ height: '30px', width: 'fit-content', borderRadius: '4px', padding: '2px 6px 6px', background: '#5774F8', margin: '0 auto' }}
                            textbutton={'Liên hệ chúng tôi'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >Liên hệ</ButtonComponents>
                    </WrapperContentProfile>
                    <WrapperContentContactRight>
                        <div style={{ cursor: "pointer" }}>
                            <p>Liên hệ chúng tôi:</p>
                            <p style={{ padding: '3px' }}> <FacebookFilled /> Facebook </p>
                            <p style={{ padding: '3px' }}> <InstagramFilled /> Instagram</p>
                        </div>
                        <hr color='#999' style={{ width: '240px' }} />
                        <div style={{ cursor: "pointer" }}>
                            <p style={{ padding: '3px' }}> <PhoneFilled /> 0348405444 or 0869222221</p>
                            <p style={{ padding: '3px' }}><MailFilled /> dingvog123@gmail.com</p>
                            <p style={{ padding: '3px' }}><HomeFilled /> Dãy 32A, hẻm 49, đường Trần Hoàng Na, phường Hưng Lợi, quận Ninh Kiều, thành phố Cần Thơ</p>

                        </div>
                    </WrapperContentContactRight>
                </div>

            </div>
        </Loading>
    )
}

export default ContactPage