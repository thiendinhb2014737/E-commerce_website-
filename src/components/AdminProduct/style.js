import { Radio, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #111;
    font-size: 14px;
`
export const WrapperUpLoadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        height: 60px;
        width: 60px;
        border-radius: 50%;
    },
    & .ant-upload-list-item.ant-upload-list-item-error{
        display: none;
    }
`
export const WrapperRadio = styled(Radio.Group)`
  margin: 6px;
  font-weight: normal;
  display:flex;
  gap: 10px;

`