import styled from "styled-components";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import { Button } from "antd";

// gap: khoảng cách giữa các phần tử trong display
// flex-start: canh trái
export const WapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    height: 30px;
    font-size: 13px;
    padding-top: 8px
`
export const WrapperButtonMore = styled(ButtonComponents)`
    &:hover {
        color: #fff;
        background: rgba(0, 96, 255, 0.12) !important;
        span {
            color: blue;
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

// chỉnh sửa card trong trang HomePage
export const WrapperProducts = styled.div`
    display: flex;
    gap: 22.5px;
    margin-top: 20px;
    margin-left: 8px;
    flex-wrap: wrap;
`
export const WrapperLabelTime = styled.p`
height: 70px;
width: 70px;
border: 2px solid #fff;
text-align: center;
display: flex ; 
flex-direction: column;
justify-content: center; 
align-items: center;
color: #fff;
padding: 5px;
margin-bottom: 0

`
export const WrapperContentTime = styled.div`
height: 100px;
margin-top: 25px;
background: #5774F8;
display: flex ; 
gap: 20px;
justify-content: center; 
align-items: center
`
export const WrapperTime = styled.p`
height: 40px;
width: 40px;
background-color: #fff;
border: 2px solid #fff;
color: #000;
margin-top: 10px;

`
export const WrapperChatbot = styled.div`
position: fixed;
right: 65px;
bottom: 70px;
width: 420px;
border-radius: 15px;
background-color: #fff;
border: 2px solid #fff;
color: #000;
box-shadow: 0 0 128px 0 rgba(0,0,0,0.1), 0 32px 64px -48px rgba(0,0,0,0.5)
`
export const WrapperChatbotHeader = styled.h2`
background-color: #6B86FF;
border-radius: 15px;
padding: 16px 0;
text-align: center;
color: #fff;
`
export const WrapperChatbotContent = styled.div`
height: 310px;
overflow-y: auto;
padding: 16px 20px 70px;
`
export const WrapperChatbotMessageAdmin = styled.div`
display: flex;
gap: 8px;
`
export const WrapperChatbotMessageUser = styled.div`
display: flex;
gap: 8px;
justify-content: flex-end;
margin: 20px 0;
`
export const WrapperChatbotMessageContentUser = styled.p`
padding: 12px 16px;
max-width: 75%;
border-radius: 10px 10px 0 10px;
background: #6B86FF;
color: #fff;

`
export const WrapperChatbotMessageContentAdmin = styled.p`
padding: 12px 16px;
max-width: 75%;
border-radius: 10px 10px 10px 0px;
background: #f2f2f2;
color: #000;
`
export const WrapperChatbotContentButton = styled.div`
display: flex;
gap: 8px;
margin: 20px 5px;
`
export const WrapperChatbotButtun = styled(Button)`
position: fixed;
right: 65px;
bottom: 10px;
height: 50px;
width: 50px;
color: #fff;
background-color: #6B86FF;
border-radius: 50%;
border: none;
outline: none;
cursor: pointer;
`