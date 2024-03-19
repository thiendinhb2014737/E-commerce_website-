
import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperLabelHeader } from './style'
import { convertPrice } from '../../utils'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import * as UserService from '../../services/UserService'
import DashedLineComponent from './DashedLine'
import { Select } from 'antd'
import * as ProductService from '../../services/ProductService'
import DashedLine2020 from './DashedLine2020'
import DashedLine2021 from './DashedLine2021'
import DashedLine2022 from './DashedLine2022'
import DashedLine2023 from './DashedLine2023'
import Loading from '../LoadingComponents/Loading'

const StatisticalAmin = () => {
  const user = useSelector((state) => state?.user)
  const [rowSelected, setRowSelected] = useState('')
  const [year, setYear] = useState('')

  const [UserYear, setUserYear] = useState('')
  const [OrderYear, setOrderYear] = useState('')
  const [AllOrderYear, setAllOrderYear] = useState('')

  const [isPendingUser, setIsPendingUser] = useState(false)
  const [isPendingSelled, setIsPendingSelled] = useState(false)
  const [isPendingStock, setIsPendingStock] = useState(false)
  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const [isPendingTotalPrice, setIsPendingTotalPrice] = useState(false)


  //// SỐ LƯỢNG NGƯỜI DÙNG CỦA THÁNG
  const countUser = async (y, r) => {
    setIsPendingUser(true)
    let month = ''
    if (y === '' && r === '') {
      month = '2024'
    } else if (y !== '' && (r !== '' || r === '')) {
      month = `${r} ${y}`
    }
    const res = await UserService.countUserMonth(user?.access_token, month)
    setIsPendingUser(false)
    setUserYear(res.data)
  }
  const getAllUserCount = async () => {
    setIsPendingUser(true)
    const Year = '2024'
    const res = await UserService.getAllUserCount(user?.access_token, Year)
    setIsPendingUser(false)
    return res

  }
  //// SỐ LƯỢNG NGƯỜI DÙNG CỦA NĂM
  const countUser2020 = async () => {
    const month = '2020'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUser2021 = async () => {
    const month = '2021'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUser2022 = async () => {
    const month = '2022'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUser2023 = async () => {
    const month = '2023'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }
  const countUser2024 = async () => {
    const month = '2024'
    const res = await UserService.countUserMonth(user?.access_token, month)
    return res
  }


  const getAllProduct = async () => {
    setIsPendingStock(true)
    const res = await ProductService.getAllProduct()
    setIsPendingStock(false)
    return res
  }

  const getAllOrder2024 = async () => {
    setIsPendingSelled(true)
    setIsPendingOrder(true)
    setIsPendingTotalPrice(true)
    const Year = '2024'
    const res = await OrderService.getAllOrderYear(user?.access_token, Year)
    setIsPendingSelled(false)
    setIsPendingOrder(false)
    setIsPendingTotalPrice(false)
    return res
  }
  const getAllOrder2020 = async () => {
    const Year = '2020'
    const res = await OrderService.getAllOrderYear(user?.access_token, Year)
    return res
  }
  const getAllOrder2021 = async () => {
    const Year = '2021'
    const res = await OrderService.getAllOrderYear(user?.access_token, Year)
    return res
  }
  const getAllOrder2022 = async () => {
    const Year = '2022'
    const res = await OrderService.getAllOrderYear(user?.access_token, Year)
    return res
  }
  const getAllOrder2023 = async () => {
    const Year = '2023'
    const res = await OrderService.getAllOrderYear(user?.access_token, Year)
    return res
  }
  //// SỐ LƯỢNG ĐƠN HÀNG CỦA THÁNG
  const countOrder = async (y, r) => {
    setIsPendingOrder(true)
    let month = ''
    if (y === '' && r === '') {
      month = '2024'
    } else if (y !== '' && r !== '') {
      month = `${r} ${y}`
    }
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    setIsPendingOrder(false)
    setOrderYear(res.data)
  }
  const countAllOrder = async () => {
    setIsPendingOrder(true)
    const Year = '2024'
    const res = await OrderService.countOrderMonth(user?.access_token, Year)
    setIsPendingOrder(false)
    return res
  }
  //// SỐ LƯỢNG ĐƠN HÀNG CỦA NĂM
  const countOrder2020 = async () => {
    const month = '2020'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrder2021 = async () => {
    const month = '2021'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrder2022 = async () => {
    const month = '2022'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrder2023 = async () => {
    const month = '2023'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  const countOrder2024 = async () => {
    const month = '2024'
    const res = await OrderService.countOrderMonth(user?.access_token, month)
    return res
  }
  // DOANH THU THEO THÁNG
  // Tiền tháng 1
  const getAllOrder = async (y, r) => {
    setIsPendingSelled(true)
    setIsPendingTotalPrice(true)
    let month = ''
    if (y === '' && r === '') {
      month = '2024'
    } else if (y !== '' && r !== '') {
      month = `${r} ${y}`
    }
    const res = await OrderService.getPrice(user?.access_token, month)
    setIsPendingSelled(false)
    setIsPendingTotalPrice(false)
    setAllOrderYear(res)
  }
  // DOANH THU THEO NĂM
  const getPrice2020 = async () => {
    const month = "2020 "
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPrice2020 = useQuery({ queryKey: ['price2020'], queryFn: getPrice2020 })
  const { data: price2020 } = queryGetPrice2020
  const getPrice2021 = async () => {
    const month = "2021 "
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPrice2021 = useQuery({ queryKey: ['price2021'], queryFn: getPrice2021 })
  const { data: price2021 } = queryGetPrice2021
  const getPrice2022 = async () => {
    const month = "2022 "
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPrice2022 = useQuery({ queryKey: ['price2022'], queryFn: getPrice2022 })
  const { data: price2022 } = queryGetPrice2022
  const getPrice2023 = async () => {
    const month = "2023 "
    const res = await OrderService.getPrice(user?.access_token, month)
    return res
  }
  const queryGetPrice2023 = useQuery({ queryKey: ['price2023'], queryFn: getPrice2023 })
  const { data: price2023 } = queryGetPrice2023


  //// SỐ LƯỢNG NGƯỜI DÙNG CỦA NĂM
  const queryCountUser2020 = useQuery({ queryKey: ['UserCount2020'], queryFn: countUser2020 })
  const { data: UserCount2020 } = queryCountUser2020
  const queryCountUser2021 = useQuery({ queryKey: ['UserCount2021'], queryFn: countUser2021 })
  const { data: UserCount2021 } = queryCountUser2021
  const queryCountUser2022 = useQuery({ queryKey: ['UserCount2022'], queryFn: countUser2022 })
  const { data: UserCount2022 } = queryCountUser2022
  const queryCountUser2023 = useQuery({ queryKey: ['UserCount2023'], queryFn: countUser2023 })
  const { data: UserCount2023 } = queryCountUser2023
  const queryCountUser2024 = useQuery({ queryKey: ['UserCount2024'], queryFn: countUser2024 })
  const { data: UserCount2024 } = queryCountUser2024
  //// TAT CA ĐƠN HÀNG CỦA NĂM
  const queryStatistical = useQuery({ queryKey: ['orders'], queryFn: getAllOrder2024 })
  const { data: orders } = queryStatistical
  const queryAllOrder2020 = useQuery({ queryKey: ['order2020'], queryFn: getAllOrder2020 })
  const { data: order2020 } = queryAllOrder2020
  const queryAllOrder2021 = useQuery({ queryKey: ['order2021'], queryFn: getAllOrder2021 })
  const { data: order2021 } = queryAllOrder2021
  const queryAllOrder2022 = useQuery({ queryKey: ['order2022'], queryFn: getAllOrder2022 })
  const { data: order2022 } = queryAllOrder2022
  const queryAllOrder2023 = useQuery({ queryKey: ['order2023'], queryFn: getAllOrder2023 })
  const { data: order2023 } = queryAllOrder2023

  //// SỐ LƯỢNG ĐƠN HÀNG CỦA NĂM
  const queryCountOrder2020 = useQuery({ queryKey: ['OrderCount2020'], queryFn: countOrder2020 })
  const { data: OrderCount2020 } = queryCountOrder2020
  const queryCountOrder2021 = useQuery({ queryKey: ['OrderCount2021'], queryFn: countOrder2021 })
  const { data: OrderCount2021 } = queryCountOrder2021
  const queryCountOrder2022 = useQuery({ queryKey: ['OrderCount2022'], queryFn: countOrder2022 })
  const { data: OrderCount2022 } = queryCountOrder2022
  const queryCountOrder2023 = useQuery({ queryKey: ['OrderCount2023'], queryFn: countOrder2023 })
  const { data: OrderCount2023 } = queryCountOrder2023
  const queryCountOrder2024 = useQuery({ queryKey: ['OrderCount2024'], queryFn: countOrder2024 })
  const { data: OrderCount2024 } = queryCountOrder2024

  const queryProductAll = useQuery({ queryKey: ['productAll'], queryFn: getAllProduct })
  const { data: productAll } = queryProductAll


  const queryUserCountAll = useQuery({ queryKey: ['userCountAll'], queryFn: getAllUserCount })
  const { data: userCountAll } = queryUserCountAll

  const queryOrderCountAll = useQuery({ queryKey: ['orderCountAll'], queryFn: countAllOrder })
  const { data: orderCountAll } = queryOrderCountAll




  // DÙNG REDUCE TÍNH TỔNG TIỀN THEO THÁNG
  const totalPrice = AllOrderYear?.data?.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  // DÙNG REDUCE TÍNH TỔNG TIỀN THEO NĂM
  const totalPrice2020 = price2020?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPrice2021 = price2021?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPrice2022 = price2022?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalPrice2023 = price2023?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalProductSelledYear = AllOrderYear?.data?.reduce(
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

  const totalProductInStock = productAll?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.countInStock;
      return (accumulator);
    },
    0);

  const totalPriceAllMonth = orders?.data.reduce(
    (accumulator, data) => {
      accumulator = accumulator + data?.totalPrice;
      return (accumulator);
    },
    0);
  const totalProductSelled2020 = order2020?.data?.reduce(
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
  const totalProductSelled2021 = order2021?.data?.reduce(
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
  const totalProductSelled2022 = order2022?.data?.reduce(
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
  const totalProductSelled2023 = order2023?.data?.reduce(
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

  //// TÍNH SẢN PHẨM ĐẪ BÁN TRONG NĂM
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

  const handleChange = (value) => {
    setRowSelected(value)
  };
  const handleChangeYear = (value) => {
    setYear(value)
  };
  useEffect(() => {
    if (year !== '' && (rowSelected !== '' || rowSelected === '')) {
      setUserYear('')
      setOrderYear('')
      setAllOrderYear('')
      countUser(year, rowSelected)
      countOrder(year, rowSelected)
      getAllOrder(year, rowSelected)
    }
  }, [year, rowSelected])

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
            value: '',
            label: 'Tất cả',
          },
        ]}
      >
      </Select>
      <Select
        defaultValue="Chọn năm"
        style={{ width: 120, marginLeft: 20, marginBottom: 20 }}
        onChange={handleChangeYear}
        options={[
          {
            value: '2020',
            label: '2020',
          },
          {
            value: '2021',
            label: '2021',
          },
          {
            value: '2022',
            label: '2022',
          },
          {
            value: '2023',
            label: '2023',
          },
          {
            value: '2024',
            label: '2024',
          },
        ]}
      >
      </Select>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>

        {/* TỔNG NGƯỜI DÙNG CỦA THÁNG */}
        <div>
          {rowSelected !== '' && year !== '' ? (
            <Loading isPending={isPendingUser}>
              <WrapperHeader >Tổng người dùng: {UserYear}</WrapperHeader>
            </Loading>
          ) :
            year === '2020' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2020?.data}</WrapperHeader>
              </Loading>
            ) : year === '2021' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2021?.data}</WrapperHeader>
              </Loading>
            ) : year === '2022' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2022?.data}</WrapperHeader>
              </Loading>
            ) : year === '2023' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2023?.data}</WrapperHeader>
              </Loading>
            ) : year === '2024' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2024?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2020' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2020?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2021' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2021?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2022' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2022?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2023' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2023?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2024' ? (
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {UserCount2024?.data}</WrapperHeader>
              </Loading>
            ) :
              <Loading isPending={isPendingUser}>
                <WrapperHeader >Tổng người dùng: {userCountAll?.data}</WrapperHeader>
              </Loading>
          }
        </div>

        {/* TỔNG SẢN PHẨM ĐÃ BÁN TRONG THÁNG */}
        <div>
          {rowSelected !== '' && year !== '' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelledYear}</WrapperHeader>
            </Loading>
          ) : year === '2020' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled2020}</WrapperHeader>
            </Loading>
          ) : year === '2021' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled2021}</WrapperHeader>
            </Loading>
          ) : year === '2022' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled2022}</WrapperHeader>
            </Loading>
          ) : year === '2023' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled2023}</WrapperHeader>
            </Loading>
          ) : year === '2024' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2020' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng người dùng: {totalProductSelled2020}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2021' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng người dùng: {totalProductSelled2021}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2022' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng người dùng: {totalProductSelled2022}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2023' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng người dùng: {totalProductSelled2023}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2024' ? (
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng người dùng: {totalProductSelled}</WrapperHeader>
            </Loading>
          ) :
            <Loading isPending={isPendingSelled}>
              <WrapperHeader >Tổng sản phẩm đã bán: {totalProductSelled}</WrapperHeader>
            </Loading>
          }
        </div>

        {/* TỔNG HÀNG TỒN KHO */}
        <Loading isPending={isPendingStock}>
          <WrapperHeader >Tổng sản phẩm tồn kho: {totalProductInStock}</WrapperHeader>
        </Loading>

        {/* TỔNG ĐƠN HÀNG TRONG THÁNG */}
        <div>
          {
            rowSelected !== '' && year !== '' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {OrderYear}</WrapperHeader>
              </Loading>
            ) : year === '2020' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {OrderCount2020?.data}</WrapperHeader>
              </Loading>
            ) : year === '2021' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {OrderCount2021?.data}</WrapperHeader>
              </Loading>
            ) : year === '2022' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {OrderCount2022?.data}</WrapperHeader>
              </Loading>
            ) : year === '2023' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {OrderCount2023?.data}</WrapperHeader>
              </Loading>
            ) : year === '2024' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {OrderCount2024?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2020' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng người dùng: {OrderCount2020?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2021' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng người dùng: {OrderCount2021?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2022' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng người dùng: {OrderCount2022?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2023' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng người dùng: {OrderCount2023?.data}</WrapperHeader>
              </Loading>
            ) : rowSelected === '' && year === '2024' ? (
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng người dùng: {orderCountAll?.data}</WrapperHeader>
              </Loading>
            ) :
              <Loading isPending={isPendingOrder}>
                <WrapperHeader >Tổng số đơn hàng: {orderCountAll?.data}</WrapperHeader>
              </Loading>
          }
        </div>


        {/* TỔNG DOANH THU CỦA THÁNG */}
        <div>
          {rowSelected !== '' && year !== '' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPrice)}</WrapperHeader>
            </Loading>
          ) : year === '2020' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPrice2020)}</WrapperHeader>
            </Loading>
          ) : year === '2021' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPrice2021)}</WrapperHeader>
            </Loading>
          ) : year === '2022' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPrice2022)}</WrapperHeader>
            </Loading>
          ) : year === '2023' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPrice2023)}</WrapperHeader>
            </Loading>
          ) : year === '2024' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceAllMonth)}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2020' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng người dùng: {convertPrice(totalPrice2020)}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2021' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng người dùng: {convertPrice(totalPrice2021)}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2022' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng người dùng: {convertPrice(totalPrice2022)}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2023' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng người dùng: {convertPrice(totalPrice2023)}</WrapperHeader>
            </Loading>
          ) : rowSelected === '' && year === '2024' ? (
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng người dùng: {convertPrice(totalPriceAllMonth)}</WrapperHeader>
            </Loading>
          ) :
            <Loading isPending={isPendingTotalPrice}>
              <WrapperHeader >Tổng doanh thu: {convertPrice(totalPriceAllMonth)}</WrapperHeader>
            </Loading>
          }
        </div>
      </div>

      {/* Tạo 1 selected chọn năm để truyền vào hàm getAllOrder(Trong hàm này phải tạo thêm lọc năm) */}
      {/* Lấy dữ liệu của năm truyền vào đây */}
      <div style={{ height: 500, width: 900, margin: '0 auto', paddingTop: '10px' }}>
        {
          year === '' ? (
            <DashedLineComponent data={orders?.data} />
          ) :
            year === '2020' ? (
              <DashedLine2020 />
            ) : year === '2021' ? (
              <DashedLine2021 />
            ) : year === '2022' ? (
              <DashedLine2022 />
            ) : year === '2023' ? (
              <DashedLine2023 />
            ) :
              <DashedLineComponent />
        }

      </div>
      <div style={{ marginTop: '20px' }}>
        {/* <TableComponent columns={columns} isPending={isLoadingOrders} data={dataTable} /> */}
      </div>
    </div>
  )
}

export default StatisticalAmin