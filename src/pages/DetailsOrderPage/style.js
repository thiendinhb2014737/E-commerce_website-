import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 5px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 5px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
  height: 120px;
  width: 280px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-size: 13px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  font-size: 13px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`
export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 4px;
`
export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`
export const Lable = styled.span`
  font-size: 14px;
  color: #000;
`