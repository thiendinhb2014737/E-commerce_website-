import styled from "styled-components";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";

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
    gap: 13px;
    margin-top: 20px;
    margin-left: 6px;
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