import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperRadio } from './style'
import { Button, Form, Radio, Select, Space } from 'antd'
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
  const [gender, setGender] = useState('')
  const inittial = () => ({
    name: '',
    image: '',
    type: '',
    price: 0,
    sizeS: 'S',
    countS: 0,
    sizeM: 'M',
    countM: 0,
    sizeL: 'L',
    countL: 0,
    sizeXL: 'XL',
    countXL: 0,

    colorBe: '#efefef',
    colorWhite: 'white',
    colorBlack: 'black',
    colorBlue: 'blue',

    countColorBeS: 0,
    countColorWhiteS: 0,
    countColorBlackS: 0,
    countColorBlueS: 0,

    countColorBeM: 0,
    countColorWhiteM: 0,
    countColorBlackM: 0,
    countColorBlueM: 0,

    countColorBeL: 0,
    countColorWhiteL: 0,
    countColorBlackL: 0,
    countColorBlueL: 0,

    countColorBeXL: 0,
    countColorWhiteXL: 0,
    countColorBlackXL: 0,
    countColorBlueXL: 0,

    gender: '',

    description: '',
    countInStock: 0,
    rating: 0,
    discount: 0,
    newType: ''
  })


  const [stateProduct, setStateProduct] = useState(inittial())
  const [stateProductDetails, setStateProductDetails] = useState(inittial())
  const [form] = Form.useForm();
  const mutation = useMutationHooks(
    (data) => {
      const { name,
        image,
        type,
        price,
        sizeS,
        countS,
        sizeM,
        countM,
        sizeL,
        countL,
        sizeXL,
        countXL,

        colorBe,
        colorWhite,
        colorBlack,
        colorBlue,

        countColorBeS,
        countColorWhiteS,
        countColorBlackS,
        countColorBlueS,

        countColorBeM,
        countColorWhiteM,
        countColorBlackM,
        countColorBlueM,

        countColorBeL,
        countColorWhiteL,
        countColorBlackL,
        countColorBlueL,

        countColorBeXL,
        countColorWhiteXL,
        countColorBlackXL,
        countColorBlueXL,

        gender,

        description,
        countInStock, // khác chỗ này, nhưng ko sai
        rating,
        discount } = data
      const res = ProductService.createProduct({
        name,
        image,
        type,
        price,
        sizeS,
        countS,
        sizeM,
        countM,
        sizeL,
        countL,
        sizeXL,
        countXL,

        colorBe,
        colorWhite,
        colorBlack,
        colorBlue,

        countColorBeS,
        countColorWhiteS,
        countColorBlackS,
        countColorBlueS,

        countColorBeM,
        countColorWhiteM,
        countColorBlackM,
        countColorBlueM,

        countColorBeL,
        countColorWhiteL,
        countColorBlackL,
        countColorBlueL,

        countColorBeXL,
        countColorWhiteXL,
        countColorBlackXL,
        countColorBlueXL,

        gender,

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
        sizeS: res?.data?.sizeS,
        countS: res?.data?.countS,
        sizeM: res?.data?.sizeM,
        countM: res?.data?.countM,
        sizeL: res?.data?.sizeL,
        countL: res?.data?.countL,
        sizeXL: res?.data?.sizeXL,
        countXL: res?.data?.countXL,

        colorBe: res?.data?.colorBe,
        colorWhite: res?.data?.colorWhite,
        colorBlack: res?.data?.colorBlack,
        colorBlue: res?.data?.colorBlue,

        countColorBeS: res?.data?.countColorBeS,
        countColorWhiteS: res?.data?.countColorWhiteS,
        countColorBlackS: res?.data?.countColorBlackS,
        countColorBlueS: res?.data?.countColorBlueS,

        countColorBeM: res?.data?.countColorBeM,
        countColorWhiteM: res?.data?.countColorWhiteM,
        countColorBlackM: res?.data?.countColorBlackM,
        countColorBlueM: res?.data?.countColorBlueM,

        countColorBeL: res?.data?.countColorBeL,
        countColorWhiteL: res?.data?.countColorWhiteL,
        countColorBlackL: res?.data?.countColorBlackL,
        countColorBlueL: res?.data?.countColorBlueL,

        countColorBeXL: res?.data?.countColorBeXL,
        countColorWhiteXL: res?.data?.countColorWhiteXL,
        countColorBlackXL: res?.data?.countColorBlueXL,
        countColorBlueXL: res?.data?.countColorBlueXL,

        gender: res?.data?.gender,

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
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails)
    } else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateProductDetails, isModalOpen])

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
      title: 'Danh mục',
      dataIndex: 'type',
      ...getColumnSearchProps('type')
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Giá bán',
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
      title: 'Mô tả',
      dataIndex: 'description',
      ...getColumnSearchProps('description')
    },
    {
      title: 'Số lượng kho',
      dataIndex: 'countInStock',
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: 'Chất lượng',
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
      title: 'Hành động',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {
      ...product,
      rating: product.rating.toFixed(1),
      key: product._id
    }
  })


  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      mes.success('Tạo sản phẩm thành công!')
      handleCancel()
    } else if (isError) {
      mes.error('Tạo sản phẩm thất bại!')
    }
  }, [isSuccess])

  useEffect(() => {

    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      mes.success('Xóa sản phẩm thành công!')
    } else if (isErrorDeletedMany) {
      mes.error('Xóa sản phẩm thất bại!')
    }
  }, [isSuccessDeletedMany])

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      mes.success('Xóa sản phẩm thành công!')
      handleCancelDelete()
    } else if (isErrorDeleted) {
      mes.error('Xóa sản phẩm thất bại!')
    }
  }, [isSuccessDeleted])

  const handleCancel = () => {
    setIsModalOpen(false);
    // khi tạo xong xóa đi thông tin của sp
    setStateProduct({
      name: '',
      image: '',
      type: '',
      price: 0,
      sizeS: 'S',
      countS: 0,
      sizeM: 'M',
      countM: 0,
      sizeL: 'L',
      countL: 0,
      sizeXL: 'XL',
      countXL: 0,

      colorBe: '#efefef',
      colorWhite: 'white',
      colorBlack: 'black',
      colorBlue: 'blue',

      countColorBeS: 0,
      countColorWhiteS: 0,
      countColorBlackS: 0,
      countColorBlueS: 0,

      countColorBeM: 0,
      countColorWhiteM: 0,
      countColorBlackM: 0,
      countColorBlueM: 0,

      countColorBeL: 0,
      countColorWhiteL: 0,
      countColorBlackL: 0,
      countColorBlueL: 0,

      countColorBeXL: 0,
      countColorWhiteXL: 0,
      countColorBlackXL: 0,
      countColorBlueXL: 0,

      gender: '',

      description: '',
      countInStock: 0,
      rating: 0,
      discount: 0,
    })
    form.resetFields()
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      image: '',
      type: '',
      price: 0,
      sizeS: 'S',
      countS: 0,
      sizeM: 'M',
      countM: 0,
      sizeL: 'L',
      countL: 0,
      sizeXL: 'XL',
      countXL: 0,

      colorBe: '#efefef',
      colorWhite: 'white',
      colorBlack: 'black',
      colorBlue: 'blue',

      countColorBeS: 0,
      countColorWhiteS: 0,
      countColorBlackS: 0,
      countColorBlueS: 0,

      countColorBeM: 0,
      countColorWhiteM: 0,
      countColorBlackM: 0,
      countColorBlueM: 0,

      countColorBeL: 0,
      countColorWhiteL: 0,
      countColorBlackL: 0,
      countColorBlueL: 0,

      countColorBeXL: 0,
      countColorWhiteXL: 0,
      countColorBlackXL: 0,
      countColorBlueXL: 0,

      gender: '',

      description: '',
      countInStock: 0,
      rating: 0,
      discount: 0,
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
  const handleGender = (e) => {
    setGender(e.target.value)
  }
  const handleGenderUpdate = (e) => {
    setGender(e.target.value)
    setStateProductDetails({
      ...stateProductDetails,
      gender: e.target.value
    })
  }

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      mes.success('Cập nhật thông tin sản phẩm thành công!')
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      mes.error('Cập nhật thông tin sản phẩm thất bại!')
    }
  }, [isSuccessUpdated])

  // stateProduct trả về thông tin sản phẩm 
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      image: stateProduct.image,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      price: stateProduct.price,
      sizeS: stateProduct.sizeS,
      countS: stateProduct.countS,
      sizeM: stateProduct.sizeM,
      countM: stateProduct.countM,
      sizeL: stateProduct.sizeL,
      countL: stateProduct.countL,
      sizeXL: stateProduct.sizeXL,
      countXL: stateProduct.countXL,

      colorBe: stateProduct.colorBe,
      colorWhite: stateProduct.colorWhite,
      colorBlack: stateProduct.colorBlack,
      colorBlue: stateProduct.colorBlue,

      countColorBeS: stateProduct.countColorBeS,
      countColorWhiteS: stateProduct.countColorWhiteS,
      countColorBlackS: stateProduct.countColorBlackS,
      countColorBlueS: stateProduct.countColorBlueS,

      countColorBeM: stateProduct.countColorBeM,
      countColorWhiteM: stateProduct.countColorWhiteM,
      countColorBlackM: stateProduct.countColorBlackM,
      countColorBlueM: stateProduct.countColorBlueM,

      countColorBeL: stateProduct.countColorBeL,
      countColorWhiteL: stateProduct.countColorWhiteL,
      countColorBlackL: stateProduct.countColorBlackL,
      countColorBlueL: stateProduct.countColorBlueL,

      countColorBeXL: stateProduct.countColorBeXL,
      countColorWhiteXL: stateProduct.countColorWhiteXL,
      countColorBlackXL: stateProduct.countColorBlueXL,
      countColorBlueXL: stateProduct.countColorBlueXL,

      gender: gender,

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
    console.log('check', e.target.name, e.target.value)
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
      <WrapperHeader style={{ fontSize: '20px', textAlign: 'center' }}>QUẢN LÝ SẢN PHẨM</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusCircleTwoTone style={{ fontSize: '40px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyProduct} columns={columns} pagination={{ position: ['bottomCenter'] }} isPending={isPendingProduct} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>

      <ModalComponents forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} width="60%">
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Danh mục"
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
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponents value={stateProduct.name} onChange={handleOnChange} name="name" />
            </Form.Item>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputComponents value={stateProduct.price} onChange={handleOnChange} name="price" />
            </Form.Item>


            <Form.Item
              label="Loại sản phẩm"
              name="gender"
              rules={[{ required: true, message: 'Please input your gender!' }]}
            >
              <WrapperRadio onChange={handleGender} value={gender}>
                <Radio value="nam" name="gender"> Nam</Radio>
                <Radio value="nữ" name="gender"> Nữ</Radio>
                <Radio value="unisex" name="gender"> Unisex</Radio>
              </WrapperRadio>
            </Form.Item>



            <Form.Item
              label="Số lượng trong kho"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <InputComponents value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
            </Form.Item>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                name="sizeS"
                style={{ width: '70px', textAlign: 'center' }}>
                <span name="sizeS">Size{stateProduct.sizeS}:</span>
              </Form.Item>
              <Form.Item
                name="countS"
                rules={[{ required: true, message: 'Please input your countS!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProduct.countS} onChange={handleOnChange} name="countS" />
              </Form.Item>
              <Form.Item
                name="sizeM"
                style={{ width: '70px', textAlign: 'center' }}>
                <span name="sizeM">Size{stateProduct.sizeM}:</span>
              </Form.Item>
              <Form.Item
                name="countM"
                rules={[{ required: true, message: 'Please input your countM!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProduct.countM} onChange={handleOnChange} name="countM" />
              </Form.Item>

              <Form.Item
                name="sizeL"
                style={{ width: '70px', textAlign: 'center' }}
              >
                <span name="sizeL">Size{stateProduct.sizeL}:</span>
              </Form.Item>
              <Form.Item
                name="countL"
                rules={[{ required: true, message: 'Please input your countM!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProduct.countL} onChange={handleOnChange} name="countL" />
              </Form.Item>

              <Form.Item
                name="sizeXL"
                style={{ width: '70px', textAlign: 'center' }}
              >
                <span name="sizeXL">Size{stateProduct.sizeXL}:</span>
              </Form.Item>
              <Form.Item
                name="countXL"
                rules={[{ required: true, message: 'Please input your countXL!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProduct.countXL} onChange={handleOnChange} name="countXL" />
              </Form.Item>

            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size S:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBeS} onChange={handleOnChange} name="countColorBeS" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProduct.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorWhiteS} onChange={handleOnChange} name="countColorWhiteS" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlackS} onChange={handleOnChange} name="countColorBlackS" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlueS} onChange={handleOnChange} name="countColorBlueS" />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size M:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBeM} onChange={handleOnChange} name="countColorBeM" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProduct.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorWhiteM} onChange={handleOnChange} name="countColorWhiteM" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlackM} onChange={handleOnChange} name="countColorBlackM" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlueM} onChange={handleOnChange} name="countColorBlueM" />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size L:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBeL} onChange={handleOnChange} name="countColorBeL" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProduct.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorWhiteL} onChange={handleOnChange} name="countColorWhiteL" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlackL} onChange={handleOnChange} name="countColorBlackL" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlueL} onChange={handleOnChange} name="countColorBlueL" />
              </Form.Item>
            </div>


            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size XL:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBeXL} onChange={handleOnChange} name="countColorBeXL" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProduct.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorWhiteXL} onChange={handleOnChange} name="countColorWhiteXL" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlackXL} onChange={handleOnChange} name="countColorBlackXL" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProduct.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProduct.countColorBlueXL} onChange={handleOnChange} name="countColorBlueXL" />
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <InputComponents value={stateProduct.description} onChange={handleOnChange} name="description" />
            </Form.Item>

            {/* <Form.Item
              label="Chất lượng"
              name="rating"
              rules={[{ required: true, message: 'Please input your rating!' }]}
            >
              <InputComponents value={stateProduct.rating} onChange={handleOnChange} name="rating" />
            </Form.Item> */}
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: 'Please input your discount!' }]}
            >
              <InputComponents value={stateProduct.discount} onChange={handleOnChange} name="discount" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <WrapperUpLoadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '60px',
                    width: '60px',
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
        </Loading>
      </ModalComponents>

      <DrawerComponents title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="85%">
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
              label="Danh mục"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponents value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
            </Form.Item>

            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponents value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="Giá bán"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputComponents value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
            </Form.Item>
            <Form.Item
              label="Loại sản phẩm"
              name="gender"
              rules={[{ required: true, message: 'Please input your gender!' }]}
            >
              <WrapperRadio onChange={handleGenderUpdate} value={gender}>
                <Radio value="nam" name="gender"> Nam</Radio>
                <Radio value="nữ" name="gender"> Nữ</Radio>
                <Radio value="unisex" name="gender"> Unisex</Radio>
              </WrapperRadio>
            </Form.Item>
            <Form.Item
              label="Số lượng kho"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <InputComponents value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
            </Form.Item>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                name="sizeS"
                style={{ width: '70px', textAlign: 'center' }}>
                <span name="sizeS">Size{stateProductDetails.sizeS}:</span>
              </Form.Item>
              <Form.Item
                name="countS"
                rules={[{ required: true, message: 'Please input your countS!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProductDetails.countS} onChange={handleOnChangeDetails} name="countS" />
              </Form.Item>
              <Form.Item
                name="sizeM"
                style={{ width: '70px', textAlign: 'center' }}>
                <span name="sizeM">Size{stateProductDetails.sizeM}:</span>
              </Form.Item>
              <Form.Item
                name="countM"
                rules={[{ required: true, message: 'Please input your countM!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProductDetails.countM} onChange={handleOnChangeDetails} name="countM" />
              </Form.Item>

              <Form.Item
                name="sizeL"
                style={{ width: '70px', textAlign: 'center' }}
              >
                <span name="sizeL">Size{stateProductDetails.sizeL}:</span>
              </Form.Item>
              <Form.Item
                name="countL"
                rules={[{ required: true, message: 'Please input your countM!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProductDetails.countL} onChange={handleOnChangeDetails} name="countL" />
              </Form.Item>

              <Form.Item
                name="sizeXL"
                style={{ width: '70px', textAlign: 'center' }}
              >
                <span name="sizeXL">Size{stateProductDetails.sizeXL}:</span>
              </Form.Item>
              <Form.Item
                name="countXL"
                rules={[{ required: true, message: 'Please input your countXL!' }]}
              >
                <InputComponents style={{ width: '90px' }} value={stateProductDetails.countXL} onChange={handleOnChangeDetails} name="countXL" />
              </Form.Item>

            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size S:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBeS} onChange={handleOnChangeDetails} name="countColorBeS" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorWhiteS} onChange={handleOnChangeDetails} name="countColorWhiteS" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlackS} onChange={handleOnChangeDetails} name="countColorBlackS" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueS"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlueS} onChange={handleOnChangeDetails} name="countColorBlueS" />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size M:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBeM} onChange={handleOnChangeDetails} name="countColorBeM" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorWhiteM} onChange={handleOnChangeDetails} name="countColorWhiteM" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlackM} onChange={handleOnChangeDetails} name="countColorBlackM" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueM"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlueM} onChange={handleOnChangeDetails} name="countColorBlueM" />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size L:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBeL} onChange={handleOnChangeDetails} name="countColorBeL" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorWhiteL} onChange={handleOnChangeDetails} name="countColorWhiteL" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlackL} onChange={handleOnChangeDetails} name="countColorBlackL" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlueL} onChange={handleOnChangeDetails} name="countColorBlueL" />
              </Form.Item>
            </div>


            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }} >
              <Form.Item
                style={{ width: '120px', textAlign: 'center' }}>
                <span>Màu sắc size XL:</span>
              </Form.Item>
              <Form.Item
                name="colorBe"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBe" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBe}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBeXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBeXL} onChange={handleOnChangeDetails} name="countColorBeXL" />
              </Form.Item>
              <Form.Item
                name="colorWhite"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorWhite" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorWhite}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorWhiteXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorWhiteXL} onChange={handleOnChangeDetails} name="countColorWhiteXL" />
              </Form.Item>
              <Form.Item
                name="colorBlack"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlack" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlack}`, border: '1px solid #e5e5e5' }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlackXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlackXL} onChange={handleOnChangeDetails} name="countColorBlackXL" />
              </Form.Item>
              <Form.Item
                name="colorBlue"
                style={{ width: '30px', textAlign: 'center' }}>
                <div name="colorBlue" style={{ width: '20px', height: '20px', background: `${stateProductDetails.colorBlue}` }}></div>
              </Form.Item>
              <Form.Item
                name="countColorBlueXL"
                style={{ marginRight: '10px' }}
              >
                <InputComponents style={{ width: '50px' }} value={stateProductDetails.countColorBlueXL} onChange={handleOnChangeDetails} name="countColorBlueXL" />
              </Form.Item>
            </div>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <InputComponents value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
            </Form.Item>

            {/* <Form.Item
              label="Chất lượng"
              name="rating"
              rules={[{ required: true, message: 'Please input your rating!' }]}
            >
              <InputComponents value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
            </Form.Item> */}
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: 'Please input your discount!' }]}
            >
              <InputComponents value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
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