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

    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
`