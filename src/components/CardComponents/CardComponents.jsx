import React from 'react'
import { StyleNameProduct, WapperCardStyle, WapperDiscountText, WapperPriceText, WapperReportText, WrapperStyleTextSell } from './style';
import {
  StarOutlined
} from '@ant-design/icons';
import chinhhang from "../../assets/Images/chinhhang.png"
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';


const CardComponents = (props) => {
  const { countInStock, description, image, name, price, rating, type, selled, discount, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <WapperCardStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{ width: 210 }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <img src={chinhhang}
        style={{ width: "68px", height: "14px", position: "absolute", top: -1, left: -1, borderTopLeftRadius: "3px" }}
        alt='chinhhang'
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating.toFixed(1)} </span>
          <StarOutlined style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }} />
        </span>
        <WrapperStyleTextSell>| Đã bán {selled || 0}+</WrapperStyleTextSell>
      </WapperReportText>
      <WapperPriceText>
        <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
        <WapperDiscountText>
          - {discount || 5} %
        </WapperDiscountText>
      </WapperPriceText>
    </WapperCardStyle>
  )
}

export default CardComponents