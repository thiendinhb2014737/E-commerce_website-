import React from 'react'
import { Button } from 'antd';

const ButtonComponents = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
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
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}


export default ButtonComponents