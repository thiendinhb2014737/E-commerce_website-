
import React, { useState } from 'react'
import { WrapperHeader, WrapperLabelHeader } from './style'
import { convertPrice } from '../../utils'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import * as UserService from '../../services/UserService'
import DashedLineComponent from './DashedLine'
import { Select } from 'antd'
import * as ProductService from '../../services/ProductService'
const StatisticalAmin = () => {
  const user = useSelector((state) => state?.user)
  const [rowSelected, setRowSelected] = useState('')

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    //console.log('res', res)
    return res
  }
  //// SỐ LƯỢNG NGƯỜI DÙNG CỦA THÁNG
  const countUserFeb = async () => {
    const month = 'February'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserJan = async () => {
    const month = 'January'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserMar = async () => {
    const month = 'March'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserApr = async () => {
    const month = 'April'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserMay = async () => {
    const month = 'May'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserJun = async () => {
    const month = 'June'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserJul = async () => {
    const month = 'July'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserAug = async () => {
    const month = 'August'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserSep = async () => {
    const month = 'September'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserOct = async () => {
    const month = 'October'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserNov = async () => {
    const month = 'November'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUserDec = async () => {
    const month = 'December'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }



  const getAllUserCount = async () => {
    const res = await UserService.getAllUserCount(user?.access_token)
    return res

  }
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  //// SỐ LƯỢNG ĐƠN HÀNG CỦA THÁNG
  const countOrderFeb = async () => {
    const month = 'February'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderJan = async () => {
    const month = 'January'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderMar = async () => {
    const month = 'March'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderApr = async () => {
    const month = 'April'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderMay = async () => {
    const month = 'May'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderJun = async () => {
    const month = 'June'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderJul = async () => {
    const month = 'July'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderAug = async () => {
    const month = 'August'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderSep = async () => {
    const month = 'September'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderOct = async () => {
    const month = 'October'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderNov = async () => {
    const month = 'November'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrderDec = async () => {
    const month = 'December'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }

  const countAllOrder = async () => {
    const res = await OrderService.countAllOrder(user?.access_token)
    return res
  }


  const queryStatistical = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isPending: isLoadingOrders, data: orders } = queryStatistical

  const queryProductAll = useQuery({ queryKey: ['productAll'], queryFn: getAllProduct })
  const { data: productAll } = queryProductAll

  //// SỐ LƯỢNG NGƯỜI DÙNG CỦA THÁNG
  const queryCountUserFeb = useQuery({ queryKey: ['UserCountFeb'], queryFn: countUserFeb })
  const { data: UserCountFeb } = queryCountUserFeb
  const queryCountUserJan = useQuery({ queryKey: ['UserCountJan'], queryFn: countUserJan })
  const { data: UserCountJan } = queryCountUserJan
  const queryCountUserMar = useQuery({ queryKey: ['UserCountMar'], queryFn: countUserMar })
  const { data: UserCountMar } = queryCountUserMar
  const queryCountUserApr = useQuery({ queryKey: ['UserCountApr'], queryFn: countUserApr })
  const { data: UserCountApr } = queryCountUserApr
  const queryCountUserMay = useQuery({ queryKey: ['UserCountMay'], queryFn: countUserMay })
  const { data: UserCountMay } = queryCountUserMay
  const queryCountUserJun = useQuery({ queryKey: ['UserCountJun'], queryFn: countUserJun })
  const { data: UserCountJun } = queryCountUserJun
  const queryCountUserJul = useQuery({ queryKey: ['UserCountJul'], queryFn: countUserJul })
  const { data: UserCountJul } = queryCountUserJul
  const queryCountUserAug = useQuery({ queryKey: ['UserCountAug'], queryFn: countUserAug })
  const { data: UserCountAug } = queryCountUserAug
  const queryCountUserSep = useQuery({ queryKey: ['UserCountSep'], queryFn: countUserSep })
  const { data: UserCountSep } = queryCountUserSep
  const queryCountUserOct = useQuery({ queryKey: ['UserCountOct'], queryFn: countUserOct })
  const { data: UserCountOct } = queryCountUserOct
  const queryCountUserNov = useQuery({ queryKey: ['UserCountNov'], queryFn: countUserNov })
  const { data: UserCountNov } = queryCountUserNov
  const queryCountUserDec = useQuery({ queryKey: ['UserCountDec'], queryFn: countUserDec })
  const { data: UserCountDec } = queryCountUserDec
  const queryUserCountAll = useQuery({ queryKey: ['userCountAll'], queryFn: getAllUserCount })
  const { isLoading: isPendingUserCount, data: userCountAll } = queryUserCountAll

  //// SỐ LƯỢNG ĐƠN HÀNG CỦA THÁNG
  const queryCountOrderFeb = useQuery({ queryKey: ['OrderCountFeb'], queryFn: countOrderFeb })
  const { data: OrderCountFeb } = queryCountOrderFeb
  const queryCountOrderJan = useQuery({ queryKey: ['OrderCountJan'], queryFn: countOrderJan })
  const { data: OrderCountJan } = queryCountOrderJan
  const queryCountOrderMar = useQuery({ queryKey: ['OrderCountMar'], queryFn: countOrderMar })
  const { data: OrderCountMar } = queryCountOrderMar
  const queryCountOrderApr = useQuery({ queryKey: ['OrderCountApr'], queryFn: countOrderApr })
  const { data: OrderCountApr } = queryCountOrderApr
  const queryCountOrderMay = useQuery({ queryKey: ['OrderCountMay'], queryFn: countOrderMay })
  const { data: OrderCountMay } = queryCountOrderMay
  const queryCountOrderJun = useQuery({ queryKey: ['OrderCountJun'], queryFn: countOrderJun })
  const { data: OrderCountJun } = queryCountOrderJun
  const queryCountOrderJul = useQuery({ queryKey: ['OrderCountJul'], queryFn: countOrderJul })
  const { data: OrderCountJul } = queryCountOrderJul
  const queryCountOrderAug = useQuery({ queryKey: ['OrderCountAug'], queryFn: countOrderAug })
  const { data: OrderCountAug } = queryCountOrderAug
  const queryCountOrderSep = useQuery({ queryKey: ['OrderCountSep'], queryFn: countOrderSep })
  const { data: OrderCountSep } = queryCountOrderSep
  const queryCountOrderOct = useQuery({ queryKey: ['OrderCountOct'], queryFn: countOrderOct })
  const { data: OrderCountOct } = queryCountOrderOct
  const queryCountOrderNov = useQuery({ queryKey: ['OrderCountNov'], queryFn: countOrderNov })
  const { data: OrderCountNov } = queryCountOrderNov
  const queryCountOrderDec = useQuery({ queryKey: ['OrderCountDec'], queryFn: countOrderDec })
  const { data: OrderCountDec } = queryCountOrderDec


  const queryOrderCountAll = useQuery({ queryKey: ['orderCountAll'], queryFn: countAllOrder })
  const { isPending: isLoadingCount, data: orderCountAll } = queryOrderCountAll


  const totalPriceAllMonth = orders?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);

  // Tiền tháng 1
  const getPriceJan = async () => {
    const month = "January "
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceJan = useQuery({ queryKey: ['priceJan'], queryFn: getPriceJan })
  const { data: priceJan } = queryGetPriceJan

  // Tiền tháng 2
  const getPriceFeb = async () => {
    const month = "February"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceFeb = useQuery({ queryKey: ['priceFeb'], queryFn: getPriceFeb })
  const { data: priceFeb } = queryGetPriceFeb

  // Tiền tháng 3
  const getPriceMar = async () => {
    const month = "March"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceMar = useQuery({ queryKey: ['priceMar'], queryFn: getPriceMar })
  const { data: priceMar } = queryGetPriceMar

  // Tiền tháng 4
  const getPriceApr = async () => {
    const month = "April"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceApr = useQuery({ queryKey: ['priceApr'], queryFn: getPriceApr })
  const { data: priceApr } = queryGetPriceApr
  // Tiền tháng 5
  const getPriceMay = async () => {
    const month = "May"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceMay = useQuery({ queryKey: ['priceMay'], queryFn: getPriceMay })
  const { data: priceMay } = queryGetPriceMay

  // Tiền tháng 6
  const getPriceJun = async () => {
    const month = "June"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceJun = useQuery({ queryKey: ['priceJun'], queryFn: getPriceJun })
  const { data: priceJun } = queryGetPriceJun

  // Tiền tháng 7
  const getPriceJul = async () => {
    const month = "July"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceJul = useQuery({ queryKey: ['priceJul'], queryFn: getPriceJul })
  const { data: priceJul } = queryGetPriceJul

  // Tiền tháng 8
  const getPriceAug = async () => {
    const month = "August"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceAug = useQuery({ queryKey: ['priceAug'], queryFn: getPriceAug })
  const { data: priceAug } = queryGetPriceAug

  // Tiền tháng 9
  const getPriceSep = async () => {
    const month = "September "
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceSep = useQuery({ queryKey: ['priceSep'], queryFn: getPriceSep })
  const { data: priceSep } = queryGetPriceSep

  // Tiền tháng 10
  const getPriceOct = async () => {
    const month = "October"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceOct = useQuery({ queryKey: ['priceOct'], queryFn: getPriceOct })
  const { data: priceOct } = queryGetPriceOct

  // Tiền tháng 11
  const getPriceNov = async () => {
    const month = "November"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceNov = useQuery({ queryKey: ['priceNov'], queryFn: getPriceNov })
  const { data: priceNov } = queryGetPriceNov
  // Tiền tháng 12
  const getPriceDec = async () => {
    const month = "December"
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPriceDec = useQuery({ queryKey: ['priceDec'], queryFn: getPriceDec })
  const { data: priceDec } = queryGetPriceDec


  //console.log('total', priceJan?.data)

  // dùng reduce tính tổng tiền tháng
  const totalPriceJan = priceJan?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);

  const totalPriceFeb = priceFeb?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);

  const totalPriceMar = priceMar?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);

  const totalPriceApr = priceApr?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceMay = priceMay?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);

  const totalPriceJun = priceJun?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceJul = priceJul?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceAug = priceAug?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceSep = priceSep?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceOct = priceOct?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceNov = priceNov?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPriceDec = priceDec?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);

  const totalProductInStock = productAll?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.countInStock;
      return (accumulator);
    },
    0);

  //// TÍNH SẢN PHẨM ĐẪ BÁN
  const totalProductSelled = orders?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledFeb = priceFeb?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledJan = priceJan?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledMar = priceMar?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledApr = priceApr?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledMay = priceMay?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledJun = priceJun?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledJul = priceJul?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledAug = priceAug?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledSep = priceSep?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledOct = priceOct?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledNov = priceNov?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);
  const totalProductSelledDec = priceDec?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.orderItems?.reduce(
        (accumulator, orderItems) => {
          accumulator = accumulator + orderItems?.amount;
          return (accumulator);
        },
        0);
      return (accumulator);
    },
    0);

  const handleChange = (value) => {
    setRowSelected(value)
  };
  //console.log('orders?.data', orders?.data)
  return (
    <div>
      <WrapperLabelHeader style={{ fontSize: '20px', textAlign: 'center' }}>THỐNG KÊ</WrapperLabelHeader>
      <Select
        defaultValue="Chọn tháng"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          {
            value: 'January',
            label: 'Tháng 1',
          },
          {
            value: 'February',
            label: 'Tháng 2',
          },
          {
            value: 'March',
            label: 'Tháng 3',
          },
          {
            value: 'April',
            label: 'Tháng 4',
          },
          {
            value: 'May',
            label: 'Tháng 5',
          },
          {
            value: 'June',
            label: 'Tháng 6',
          }, {
            value: 'July',
            label: 'Tháng 7',
          },
          {
            value: 'August',
            label: 'Tháng 8',
          },
          {
            value: 'September',
            label: 'Tháng 9',
          },
          {
            value: 'October',
            label: 'Tháng 10',
          },
          {
            value: 'November',
            label: 'Tháng 11',
          },
          {
            value: 'December',
            label: 'Tháng 12',
          },
          {
            value: 'allMonth',
            label: 'Tất cả',
          },
        ]}
      >
      </Select>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>

        {/* TỔNG NGƯỜI DÙNG CỦA THÁNG */}
        {rowSelected === 'February' ? (
          <WrapperHeader >Tổng người dùng: {UserCountFeb?.data}</WrapperHeader>
        ) : rowSelected === 'January' ? (
          <WrapperHeader >Tổng người dùng: {UserCountJan?.data}</WrapperHeader>
        ) : rowSelected === 'March' ? (
          <WrapperHeader >Tổng người dùng: {UserCountMar?.data}</WrapperHeader>
        ) : rowSelected === 'April' ? (
          <WrapperHeader >Tổng người dùng: {UserCountApr?.data}</WrapperHeader>
        ) : rowSelected === 'May' ? (
          <WrapperHeader >Tổng người dùng: {UserCountMay?.data}</WrapperHeader>
        ) : rowSelected === 'June' ? (
          <WrapperHeader >Tổng người dùng: {UserCountJun?.data}</WrapperHeader>
        ) : rowSelected === 'July' ? (
          <WrapperHeader >Tổng người dùng: {UserCountJul?.data}</WrapperHeader>
        ) : rowSelected === 'August' ? (
          <WrapperHeader >Tổng người dùng: {UserCountAug?.data}</WrapperHeader>
        ) : rowSelected === 'September' ? (
          <WrapperHeader >Tổng người dùng: {UserCountSep?.data}</WrapperHeader>
        ) : rowSelected === 'October' ? (
          <WrapperHeader >Tổng người dùng: {UserCountOct?.data}</WrapperHeader>
        ) : rowSelected === 'November' ? (
          <WrapperHeader >Tổng người dùng: {UserCountNov?.data}</WrapperHeader>
        ) : rowSelected === 'December' ? (
          <WrapperHeader >Tổng người dùng: {UserCountDec?.data}</WrapperHeader>
        ) : rowSelected === 'allMonth' ? (
          <WrapperHeader >Tổng người dùng: {userCountAll?.data}</WrapperHeader>
        ) :
          <WrapperHeader >Tổng người dùng: {userCountAll?.data}</WrapperHeader>
        }

        {/* TỔNG SẢN PHẨM ĐÃ BÁN TRONG THÁNG */}
        {rowSelected === 'February' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledFeb}</WrapperHeader>
        ) : rowSelected === 'January' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledJan}</WrapperHeader>
        ) : rowSelected === 'March' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledMar}</WrapperHeader>
        ) : rowSelected === 'April' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledApr}</WrapperHeader>
        ) : rowSelected === 'May' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledMay}</WrapperHeader>
        ) : rowSelected === 'June' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledJun}</WrapperHeader>
        ) : rowSelected === 'July' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledJul}</WrapperHeader>
        ) : rowSelected === 'August' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledAug}</WrapperHeader>
        ) : rowSelected === 'September' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledSep}</WrapperHeader>
        ) : rowSelected === 'October' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledOct}</WrapperHeader>
        ) : rowSelected === 'November' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledNov}</WrapperHeader>
        ) : rowSelected === 'December' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledDec}</WrapperHeader>
        ) : rowSelected === 'allMonth' ? (
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled}</WrapperHeader>
        ) :
          <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled}</WrapperHeader>
        }

        {/* TỔNG HÀNG TỒN KHO */}
        <WrapperHeader >Tổng sản phẩm tồn kho: {totalProductInStock}</WrapperHeader>

        {/* TỔNG ĐƠN HÀNG TRONG THÁNG */}
        {rowSelected === 'February' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountFeb?.data}</WrapperHeader>
        ) : rowSelected === 'January' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountJan?.data}</WrapperHeader>
        ) : rowSelected === 'March' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountMar?.data}</WrapperHeader>
        ) : rowSelected === 'April' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountApr?.data}</WrapperHeader>
        ) : rowSelected === 'May' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountMay?.data}</WrapperHeader>
        ) : rowSelected === 'June' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountJun?.data}</WrapperHeader>
        ) : rowSelected === 'July' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountJul?.data}</WrapperHeader>
        ) : rowSelected === 'August' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountAug?.data}</WrapperHeader>
        ) : rowSelected === 'September' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountSep?.data}</WrapperHeader>
        ) : rowSelected === 'October' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountOct?.data}</WrapperHeader>
        ) : rowSelected === 'November' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountNov?.data}</WrapperHeader>
        ) : rowSelected === 'December' ? (
          <WrapperHeader >Tổng số đơn hàng: {OrderCountDec?.data}</WrapperHeader>
        ) : rowSelected === 'allMonth' ? (
          <WrapperHeader >Tổng số đơn hàng: {orderCountAll?.data}</WrapperHeader>
        ) :
          <WrapperHeader >Tổng số đơn hàng: {orderCountAll?.data}</WrapperHeader>
        }


        {/* TỔNG DOANH THU CỦA THÁNG */}
        {rowSelected === 'February' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceFeb)}</WrapperHeader>
        ) : rowSelected === 'January' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceJan)}</WrapperHeader>
        ) : rowSelected === 'March' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceMar)}</WrapperHeader>
        ) : rowSelected === 'April' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceApr)}</WrapperHeader>
        ) : rowSelected === 'May' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceMay)}</WrapperHeader>
        ) : rowSelected === 'June' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceJun)}</WrapperHeader>
        ) : rowSelected === 'July' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceJul)}</WrapperHeader>
        ) : rowSelected === 'August' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceAug)}</WrapperHeader>
        ) : rowSelected === 'September' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceSep)}</WrapperHeader>
        ) : rowSelected === 'October' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceOct)}</WrapperHeader>
        ) : rowSelected === 'November' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceNov)}</WrapperHeader>
        ) : rowSelected === 'December' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceDec)}</WrapperHeader>
        ) : rowSelected === 'allMonth' ? (
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceAllMonth)}</WrapperHeader>
        ) :
          <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceAllMonth)}</WrapperHeader>
        }
      </div>

      {/* Tạo 1 selected chọn năm để truyền vào hàm getAllOrder(Trong hàm này phải tạo thêm lọc năm) */}
      {/* Lấy dữ liệu của năm truyền vào đây */}
      <div style={{ height: 500, width: 900, margin: '0 auto', paddingTop: '10px' }}>
        <DashedLineComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '20px' }}>
        {/* <TableComponent columns={columns} isPending={isLoadingOrders} data={dataTable} /> */}
      </div>
    </div>
  )
}

export default StatisticalAmin