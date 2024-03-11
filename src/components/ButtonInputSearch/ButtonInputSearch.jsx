import React from "react";
import { } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';
import InputComponents from "../InputComponents/InputComponents";
import ButtonComponents from "../ButtonComponents/ButtonComponents";


const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton, bordered, backgroundInput = '#fff', backgroundButton = '#5774F8', colorButton = '#fff', styletextbutton } = props
    return (
        < div style={{ display: 'flex' }}>
            <InputComponents
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ background: backgroundInput }}
                {...props}
            />
            <ButtonComponents
                size={size}
                styleButton={{ background: backgroundButton, color: colorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined />}
                textbutton={textbutton}
                styletextbutton={styletextbutton}
            />

        </div >
    )
}
export default ButtonInputSearch