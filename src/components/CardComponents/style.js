import { Card } from "antd";
import styled from "styled-components";

export const WapperCardStyle = styled(Card)`
    width: 210px;
    & img {
        height: 210px;
        width: 210px;
    },
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'}
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`


export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: rgb(39, 39, 42);
`
// phần đánh giá trong card
export const WapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`
export const WapperPriceText = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: rgb(255, 66, 78);
    
`
export const WapperDiscountText = styled.span`
    font-weight: 500;
    font-size: 12px;
    color: rgb(255, 66, 78);
`
// text đã bán
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
