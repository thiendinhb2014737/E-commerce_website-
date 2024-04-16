import { Upload } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
    text-align: center;
    padding-bottom: 20px;
    
`
export const WapperGoHome = styled(Link)`
    font-weight: bold;
    text-align: left
    
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 750px;
    margin: 0 auto; // cho ra chính giữa
    padding: 30px;
    border-radius: 10px;
    background: #D4E1FF;
    gap: 30px;
`
export const WrapperLabel = styled.label`
    color: #000;
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
export const WrapperUpLoadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        height: 80px;
        width: 80px;
        border-radius: 50%;
    },
    & .ant-upload-list-item.ant-upload-list-item-error{
        display: none;
    }
`