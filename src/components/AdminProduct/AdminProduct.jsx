import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Select, Space } from 'antd'
import {
  PlusCircleTwoTone, DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';
import TableComponent from '../TableComponents/TableComponent';
import InputComponents from "../InputComponents/InputComponents";
import { WrapperUpLoadFile } from "./style"
import { UploadOutlined } from '@ant-design/icons'
import { getBase64, renderOptions } from '../../utils';
import { createProduct } from '../../services/ProductService';
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponents/Loading'
import * as mes from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponents from '../DrawerComponents/DrawerComponents';
import { useSelector } from 'react-redux';
import ModalComponents from '../ModalComponents/ModalComponents';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isPendingUpdate, setIsPendingUpdate] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [typeSelect, setTypeSelect] = useState('');
  const searchInput = useRef(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    image: '',
    type: '',
    price: '',
    size: '',
    description: '',
    countInStock: '',
    rating: '',
    discount: '',
    newType: ''
  })
  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    image: '',
    type: '',
    price: '',
    size: '',
    description: '',
    countInStock: '',
    rating: '',
    discount: ''
  })
  const [form] = Form.useForm();
  const mutation = useMutationHooks(
    (data) => {
      const { name,
        image,
        type,
        price,
        size,
        description,
        countInStock, // khác chỗ này, nhưng ko sai
        rating,
        discount } = data
      const res = ProductService.createProduct({
        name,
        image,
        type,
        price,
        size,
        description,
        countInStock,
        rating,
        discount
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const {
        id,
        token,
        ...rests } = data
      const res = ProductService.updateProduct(
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
        token } = data
      const res = ProductService.deleteProduct(
        id,
        token)
      return res
    },
  )
  const mutationDeleteMany = useMutationHooks(
    (data) => {
      const {
        token,
        ...ids } = data
      const res = ProductService.deleteManyProduct(
        ids,
        token)
      return res
    },
  )

  //console.log('mutationDeleteMany', mutationDeleteMany)
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        price: res?.data?.price,
        size: res?.data?.size,
        description: res?.data?.description,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        discount: res?.data?.discount
      })
    }
    setIsPendingUpdate(false)
  }
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res
  }
  useEffect(() => {
    form.setFieldsValue(stateProductDetails)
  }, [form, stateProductDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])


  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const { data, isPending, isSuccess, isError } = mutation
  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
  const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
  //console.log('dataUpdated', dataUpdated)

  const queryProduct = useQuery({
    queryKey: ['products'],
    queryFn: getAllProduct
  })

  const typeProduct = useQuery({
    queryKey: ['type-product'],
    queryFn: fetchAllTypeProduct
  })
  //console.log('typeProduct', typeProduct)

  const { isLoading: isPendingProduct, data: products } = queryProduct
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
  }


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
        <InputComponents
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ''}`}
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
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 199.000',
          value: '>=',
        },
        {
          text: '<= 199.000',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 199000
        } else if (value === '<=') {
          return record.price <= 199000
        }
      }
    },
    // {
    //     title: 'Image',
    //     dataIndex: 'image',
    // },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Count inStock',
      dataIndex: 'countInStock',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3',
          value: '>=',
        },
        {
          text: '<= 3',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.rating >= 3
        } else if (value === '<=') {
          return record.rating <= 3
        }
      }
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {
      ...product,
      key: product._id
    }
  })


  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      mes.success()
      handleCancel()
    } else if (isError) {
      mes.error()
    }
  }, [isSuccess])

  useEffect(() => {

    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      mes.success()
    } else if (isErrorDeletedMany) {
      mes.error()
    }
  }, [isSuccessDeletedMany])

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      mes.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      mes.error()
    }
  }, [isSuccessDeleted])

  const handleCancel = () => {
    setIsModalOpen(false);
    // khi tạo xong xóa đi thông tin của sp
    setStateProduct({
      name: '',
      image: '',
      type: '',
      price: '',
      size: '',
      description: '',
      countInStock: '',
      discount: '',
    })
    form.resetFields()
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      image: '',
      type: '',
      price: '',
      description: '',
      countInStock: '',
    })
    form.resetFields()
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }


  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      mes.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      mes.error()
    }
  }, [isSuccessUpdated])

  // stateProduct trả về thông tin sản phẩm 
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      image: stateProduct.image,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      price: stateProduct.price,
      size: stateProduct.size,
      description: stateProduct.description,
      countInStock: stateProduct.countInStock,
      rating: stateProduct.rating,
      discount: stateProduct.discount
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  //event.target đề cập đến phần tử HTML đã kích hoạt sự kiện. 
  // Ví dụ: nếu bạn có thành phần nút trong React, bạn có thể thêm trình nghe onClick vào đó để nghe các sự kiện nhấp chuột. 
  // Khi nút được nhấp vào, đối tượng sự kiện được chuyển đến hàm xử lý sẽ có thuộc tính event.target tham chiếu đến thành phần nút được nhấp vào
  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value // đổi.name thành .value
    })
    //console.log('e.target.name', e.target.name, e.target.value)
  }
  const handleOnChangeDetails = (e) => {
    //console.log('check', e.target.name, e.target.value)
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value // đổi.name thành .value
    })
  }
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })

  }
  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })

  }

  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value
    })
  }



  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusCircleTwoTone style={{ fontSize: '40px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyProduct} columns={columns} isLoading={isPendingProduct} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>

      <ModalComponents forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            {/* <InputComponents value={stateProduct.type} onChange={handleOnChange} name="type" /> */}
            <Select
              name="type"
              // defaultValue="lucy"
              // style={{ width: 120 }}
              value={stateProduct.type}
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>
          {stateProduct?.type === 'add_type' && (
            <Form.Item
              label=" "
              name="newType"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponents placeholder={'Nhập vào danh mục mới'} value={stateProduct.newType} onChange={handleOnChange} name="newType" />
            </Form.Item>
          )}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponents value={stateProduct.name} onChange={handleOnChange} name="name" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
          >
            <InputComponents value={stateProduct.price} onChange={handleOnChange} name="price" />
          </Form.Item>
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please input your size!' }]}
          >
            <InputComponents value={stateProduct.size} onChange={handleOnChange} name="size" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <InputComponents value={stateProduct.description} onChange={handleOnChange} name="description" />
          </Form.Item>
          <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your count inStock!' }]}
          >
            <InputComponents value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
          >
            <InputComponents value={stateProduct.rating} onChange={handleOnChange} name="rating" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input your discount!' }]}
          >
            <InputComponents value={stateProduct.discount} onChange={handleOnChange} name="discount" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your image!' }]}
          >
            <WrapperUpLoadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
              {stateProduct?.image && (
                <img src={stateProduct?.image} style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }} alt='avatar' />
              )}
            </WrapperUpLoadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </ModalComponents>

      <DrawerComponents title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponents value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponents value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputComponents value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
            </Form.Item>
            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: 'Please input your size!' }]}
            >
              <InputComponents value={stateProduct.size} onChange={handleOnChangeDetails} name="size" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <InputComponents value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
            </Form.Item>
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <InputComponents value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your rating!' }]}
            >
              <InputComponents value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input your discount!' }]}
            >
              <InputComponents value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount" />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <WrapperUpLoadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateProductDetails?.image && (
                  <img src={stateProductDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt='avatar' />
                )}
              </WrapperUpLoadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponents>

      <ModalComponents title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponents>
    </div>
  )
}

export default AdminProduct