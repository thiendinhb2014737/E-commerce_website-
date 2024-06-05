import { Button, Card, Col, Form, Image, Radio, Row, Select, Space } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponents/TableComponent'
import InputComponent from '../InputComponents/InputComponents'
import { convertPrice, getBase64 } from '../../utils'
import * as OrderService from '../../services/OrderService'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import Loading from '../LoadingComponents/Loading'
import DrawerComponents from '../DrawerComponents/DrawerComponents'
import InputComponents from '../InputComponents/InputComponents'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as mes from '../../components/Message/Message'
import PieChartComponent from './PieChart'
import ModalComponents from '../ModalComponents/ModalComponents'
import PieChartShippedComponent from './PieChartShipped'
import { useLocation, useParams } from 'react-router-dom'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperStyleContent } from '../../pages/DetailsOrderPage/style'
import { WrapperAddressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperStyleNameProduct } from '../ProductDetailsComponents/style'
import ButtonComponents from '../ButtonComponents/ButtonComponents'

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user)
  const [rowSelected, setRowSelected] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isPendingUpdate, setIsPendingUpdate] = useState(false)
  const [form] = Form.useForm();
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const searchInput = useRef(null);
  const mutationUpdate = useMutationHooks(
    (data) => {
      const {
        id,
        token,
        ...rests } = data
      const res = OrderService.updateOrder(
        id,
        token,
        { ...rests })
      return res
    },
  )
  const mutationDelete = useMutationHooks(
    (data) => {
      const {
        id,
        orderItems,
        token } = data
      const res = OrderService.deleteOrder(
        id,
        orderItems,
        token)
      return res
    },
  )
  const inittial = () => ({
    // fullName: '',
    // phone: '',
    // address: '',
    // isPaid: '',
    statusOder: '',
    // shippingPrice: '',
    // paymentMethod: '',
    // totalPrice: '',
    // itemsPrice: '',


  })
  const inittialOrderItems = () => ({
    fullName: '',
    phone: '',
    address: '',
    isPaid: '',
    shippingPrice: '',
    paymentMethod: '',
    totalPrice: '',
    itemsPrice: '',


  })
  const [stateOrdertDetails, setStateOrderDetails] = useState(inittial())
  const [stateOrderItems, setStateOrderItems] = useState(inittialOrderItems())

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    //console.log('res', res)
    return res
  }

  // const getFilterOrderTrue = async () => {
  //   const filter = 'Đã xác nhận'
  //   const res = await OrderService.getFilterOrder(user?.access_token, filter)
  //   return res
  // }
  // const getFilterOrderFalse = async () => {
  //   const filter = 'Chưa xác nhận'
  //   const res = await OrderService.getFilterOrder(user?.access_token, filter)
  //   return res
  // }


  const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailsOrder(rowSelected, user?.access_token)
    if (res?.data) {
      setStateOrderDetails({
        // fullName: res?.data?.shippingAddress?.fullName,
        // phone: res?.data?.shippingAddress?.phone,
        // address: res?.data?.shippingAddress?.address,
        // isPaid: res?.data?.isPaid,
        statusOder: res?.data?.statusOder,
        // shippingPrice: res?.data?.shippingPrice,
        // paymentMethod: res?.data?.paymentMethod,
        // totalPrice: res?.data?.totalPrice,
        // itemsPrice: res?.data?.itemsPrice,
      })
    }
    setIsPendingUpdate(false)
  }
  const fetchGetDetailsOrderItems = async (rowSelected) => {
    const res = await OrderService.getDetailsOrder(rowSelected, user?.access_token)
    if (res?.data) {
      setStateOrderItems({
        fullName: res?.data?.shippingAddress?.fullName,
        phone: res?.data?.shippingAddress?.phone,
        address: res?.data?.shippingAddress?.address,
        isPaid: res?.data?.isPaid,
        shippingPrice: res?.data?.shippingPrice,
        paymentMethod: res?.data?.paymentMethod,
        totalPrice: res?.data?.totalPrice,
        itemsPrice: res?.data?.itemsPrice,
      })
    }
    //setIsPendingUpdate(false)
  }

  const queryClient = useQueryClient();
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    //setRowSelected('')
    setStateOrderDetails({
      // fullName: '',
      // phone: '',
      // address: '',
      // isPaid: '',
      statusOder: '',
      // shippingPrice: '',
      // paymentMethod: '',
      // totalPrice: '',
      // itemsPrice: '',
    })
    // queryClient.resetQueries(['orders-details'])

    form.resetFields()
  };

  useEffect(() => {
    form.setFieldsValue(stateOrdertDetails)
  }, [form, stateOrdertDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true)
      fetchGetDetailsOrder(rowSelected)
      fetchGetDetailsOrderItems(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])



  const handleDetailsOrder = () => {
    setIsOpenDrawer(true)
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };



  const handleOnChangeDetails = (e) => {
    //console.log('check', e.target.name, e.target.value)
    setStateOrderDetails({
      ...setStateOrderDetails,
      [e.target.name]: e.target.value // đổi.name thành .value
    })
  }
  const handleChange = (value) => {
    //console.log('value', value)
    setStateOrderDetails({
      ...setStateOrderDetails,
      statusOder: value
    })
  };


  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isPending: isLoadingOrders, data: orders } = queryOrder

  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token, orderItems: orderItems }, {
      onSettled: () => {
        queryOrder.refetch()
      }
    })
  }

  // const queryOrderFilterTrue = useQuery({ queryKey: ['ordersFilterTrue'], queryFn: getFilterOrderTrue })
  // const { isPending: isLoadingFilterTrue, data: ordersFilterTrue } = queryOrderFilterTrue

  // const queryOrderFilterFalse = useQuery({ queryKey: ['ordersFilterFalse'], queryFn: getFilterOrderFalse })
  // const { isPending: isLoadingFilterFasle, data: ordersFilterFalse } = queryOrderFilterFalse
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    //setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}

          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsOrder} />
      </div>
    )
  }
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'maDH',
      ...getColumnSearchProps('maDH')
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'address',
      ...getColumnSearchProps('address')
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'isPaid',

    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'statusOder',

    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',

    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán', isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice), maDH: order?.maDH }
  })
  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
  console.log(rowSelected)
  console.log(orderItems)
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      mes.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      mes.error()
    }
  }, [isSuccessUpdated])
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      mes.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      mes.error()
    }
  }, [isSuccessDeleted])
  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateOrdertDetails }
      , {
        onSettled: () => {
          queryOrder.refetch()
        }
      }
    )
  }


  return (
    <div>
      <WrapperHeader style={{ fontSize: '20px', textAlign: 'center' }}>QUẢN LÝ ĐƠN HÀNG</WrapperHeader>
      <Loading isPending={isPendingUpdated || isPendingDeleted}>

        {/* <WrapperHeader>Đã xác nhận: {ordersFilterTrue?.data}</WrapperHeader>
        <WrapperHeader>Chưa xác nhận: {ordersFilterFalse?.data}</WrapperHeader> */}

        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center' }}>
          <div style={{ height: '200px', width: '200px', textAlign: 'center' }}>
            <PieChartComponent data={orders?.data} />
            Phương thức thanh toán
          </div>
          <div style={{ height: '200px', width: '200px', textAlign: 'center' }}>
            <PieChartShippedComponent data={orders?.data} />
            Trạng thái đơn hàng
          </div>
        </div>
      </Loading>
      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} pagination={{ position: ['bottomCenter'] }} isPending={isLoadingOrders} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
              setOrderItems(record?.orderItems)
            }
          };
        }} />
      </div>

      <DrawerComponents title='Chi tiết đơn hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="85%">
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <Card title="Địa chỉ người nhận" bordered={false} >
                <WrapperContentInfo>
                  <div className='name-info'>{stateOrderItems?.fullName}</div>
                  <div className='address-info'><span>Địa chỉ giao hàng: </span> {`${stateOrderItems?.address}`}</div>
                  <div className='phone-info'><span>Số điện thoại: </span> {stateOrderItems?.phone}</div>
                </WrapperContentInfo>
              </Card>
            </WrapperInfoUser>

            <WrapperInfoUser>
              <Card title="Hình thức giao hàng" bordered={false} >
                <WrapperContentInfo>
                  <div className='delivery-info' style={{ width: 250 }}><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
                  <div className='delivery-fee' style={{ width: 250 }}><span>Phí vận chuyển: </span> {stateOrderItems?.shippingPrice}</div>
                </WrapperContentInfo>
              </Card>
            </WrapperInfoUser>

            <WrapperInfoUser>
              <Card title="Hình thức thanh toán" bordered={false} >
                <WrapperContentInfo>
                  <div className='payment-info'>{orderContant.payment[stateOrderItems?.paymentMethod]}</div>
                  <div className='status-payment'>{stateOrderItems?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                </WrapperContentInfo>
              </Card>
            </WrapperInfoUser>
            <Card title="Thông tin sản phẩm" bordered={false} style={{ width: 250 }}>
              <WrapperAllPrice>
                <WrapperItemLabel>Tổng tiền hàng</WrapperItemLabel>
                <WrapperItem>{convertPrice(stateOrderItems?.itemsPrice)}</WrapperItem>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                <WrapperItem>{convertPrice(stateOrderItems?.shippingPrice)}</WrapperItem>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <WrapperItemLabel>Tổng thanh toán</WrapperItemLabel>
                <WrapperItem><WrapperItem>{convertPrice(stateOrderItems?.totalPrice)}</WrapperItem></WrapperItem>
              </WrapperAllPrice>
            </Card>
          </WrapperHeaderUser>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label=" Trạng thái"
              name="statusOder"
              rules={[{ required: true, message: 'Please input your statusOder!' }]}
            >
              {/* <InputComponents name="statusOder" value={stateOrdertDetails.statusOder} onChange={handleOnChangeDetails} /> */}
              <Select
                //defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  {
                    value: 'Chưa xác nhận',
                    label: 'Chưa xác nhận',
                  },
                  {
                    value: 'Đã xác nhận',
                    label: 'Đã xác nhận',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponents>
      <ModalComponents title="Xóa đơn hàng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có muốn hủy đơn hàng này không?</div>
        </Loading>
      </ModalComponents>
    </div>
  )
}

export default OrderAdmin