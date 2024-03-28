
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const TypeProduct = ({ name }) => {
    const navigate = useNavigate()
    const handleNavigateType = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }
    return (
        <WrapperContentPopup
            style={{ padding: '5px', cursor: 'pointer', background: '#f5f5fa', height: '30px', width: '190px', borderRadius: '4px', textAlign: 'center', }}
            onClick={() => handleNavigateType(name)}>{name.toUpperCase()}</WrapperContentPopup>
    )
}

export default TypeProduct
export const WrapperContentPopup = styled.p`
// box-shadow: 0 3px 3px #efefef;
    cursor: pointer;
    &:hover {
        color: #888;
    }
`