import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #fff;
    font-size: 14px;
    background: #5774F8;
    width: fit-content;
    height: 30px;
    padding: 5px;
    border: 1px solid rgb(10, 104, 255);
    border-radius: 6px;
    
`
export const WrapperLabelHeader = styled.h1`
    color: #000;
    font-size: 14px;
    
`


export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`

export const WrapperNameChart = styled.div`

`