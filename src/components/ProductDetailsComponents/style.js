import styled from "styled-components";
import { Col, Image, InputNumber } from 'antd'

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px !important;
    width: 64px !important;
`
export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(39, 39, 42);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`
// text đã bán
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const WrapperPriceProduct = styled.div`
    color: rgb(250, 250, 250);
    border-radius: 4px;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    color: #333;
    padding: 10px;
    margin-top: 10px;
`
// chọn thẻ span có class là address
export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 4px;
    };
    span.change-address {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        color: rgb(11, 116, 229);
        margin-left: 4px;
    }
`
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border-radius: 4px;
    border: 1px solid #ccc;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.css-dev-only-do-not-override-dkbvqv {
        width: 60px;
        border-top: none;
        border-bottom: none;
        border-radius: 0px;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
    
`

