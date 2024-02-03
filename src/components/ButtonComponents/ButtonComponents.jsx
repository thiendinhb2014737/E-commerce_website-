import React from 'react'
import { Button } from 'antd';

const ButtonComponents = ({ size, styleButton, styletextbutton, textbutton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}
            {...rests}
        //icon={<SearchOutlined />}
        >
            <span style={styletextbutton}>{textbutton}</span>
        </Button>
    )
}


export default ButtonComponents