import React from "react"
import { Col } from 'antd'
import { WapperHeader, WapperTextHeader, WapperHeaderAccount } from "./style"
import {
    FacebookFilled, InstagramFilled, TwitterCircleFilled, MailFilled, PhoneFilled, HomeFilled
} from '@ant-design/icons';

import logo from "../../assets/Images/Logo.png"

const FooterComponents = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    return (
        <div style={{ width: '100%', background: '#5774F8', display: 'flex', justifyContent: 'center', height: '160px' }}>
            <WapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={6}>
                    <WapperTextHeader to='/'>
                        <img src={logo} alt="Logo" style={{
                            height: '110px',
                            width: '110px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginRight: '10px'
                        }} />
                        DINGVOG
                    </WapperTextHeader>
                </Col>

                <Col span={6} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    < WapperHeaderAccount>
                        <div style={{ cursor: "pointer" }}>
                            <p>Liên hệ chúng tôi:</p>
                            <p> <FacebookFilled /> Facebook (Shop thời trang Dingvog) </p>
                            <p> <InstagramFilled /> Instagram (Dingvog)</p>
                        </div>

                    </WapperHeaderAccount>

                </Col>
                <Col span={12} style={{ display: 'flex', gap: '30px', alignItems: 'center', paddingTop: '30px' }}>
                    < WapperHeaderAccount>
                        <div style={{ cursor: "pointer" }}>
                            <p > <PhoneFilled /> 0348405444 hoặc 0869222221</p>
                            <p ><MailFilled /> dingvog123@gmail.com hoặc dinh234@gmail.com</p>
                            <p ><HomeFilled /> Dãy 32A, hẻm 49, đường Trần Hoàng Na, phường Hưng Lợi, quận Ninh Kiều, thành phố Cần Thơ</p>

                        </div>

                    </WapperHeaderAccount>

                </Col>
            </WapperHeader>
        </div>
    )
}
export default FooterComponents