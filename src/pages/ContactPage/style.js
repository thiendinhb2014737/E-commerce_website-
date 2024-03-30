import { Upload } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
    text-align: center;
    padding: 20px;
    
`
export const WapperGoHome = styled(Link)`
    font-weight: bold;
    text-align: left
    
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 650px;
    margin: 0 auto; // cho ra chính giữa
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    background: #6B86FF;
`
export const WrapperContentContact = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 450px;
    margin: 0 auto; // cho ra chính giữa
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    background: #6B86FF;
`
export const WrapperLabel = styled.label`
    color: #fff;
    font-size: 14px;
    line-height: 30px;
    font-weight: 600;
    width: 120px;
    text-align: left;

`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

`