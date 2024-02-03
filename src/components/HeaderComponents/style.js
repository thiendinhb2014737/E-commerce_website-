import styled from "styled-components";
import { Row } from "antd";
import { Link } from "react-router-dom";

// phần row của Header
export const WapperHeader = styled(Row)`
    
    background-color: #ffd4d4; 
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    padding: 10px 0;
`

export const WapperTextHeader = styled(Link)`
    font-size: 18px;
    color: #444;
    font-weight: bold;
    text-align: left
`
export const WapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #444;
    gap: 10px;
    font-size: 16px;
`
// phần text của đăng nhập đăng ký Header
export const WapperTextHeaderSmall = styled.span`
    font-size: 14px;
    color: #444;
    white-space: nowrap;  
`
// phần đăng xuất khi nhấn vào tên người dùng
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        background: #ffd4d4;
        color: #444;
    }
`
