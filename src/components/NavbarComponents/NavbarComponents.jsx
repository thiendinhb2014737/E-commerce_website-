import React from 'react'
import { WapperLabelText, WapperTextValue, WrapperContent, WrapperTextPrice } from './style'
import { Checkbox, Rate } from 'antd'

const NavbarComponents = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WapperTextValue>{option}</WapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })}

                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{`từ ${option} sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {

                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>

                    )
                })

            default:
                return {}
        }
    }
    return (
        <div>
            <WapperLabelText>Label</WapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Áo thun', 'Áo len', 'Áo khoác'])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('checkbox',
                    [
                        { value: 'a', label: 'A' },
                        { value: 'a', label: 'B' }
                    ]
                )}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [5, 4, 3])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['dưới 90.000', 'trên 90.000'])}
            </WrapperContent>
        </div>
    )
}

export default NavbarComponents