import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUpLoadFile } from './style'
import { Button, Form, Space } from 'antd'
import {
    PlusCircleTwoTone, UploadOutlined, DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';
import TableComponent from '../TableComponents/TableComponent';
import InputComponents from '../InputComponents/InputComponents';
import DrawerComponents from '../DrawerComponents/DrawerComponents';
import Loading from '../LoadingComponents/Loading';
import ModalComponents from '../ModalComponents/ModalComponents';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import * as mes from '../../components/Message/Message'
import { getBase64 } from '../../utils';
import * as UserService from '../../services/UserService'


const AdminUser = () => {

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const user = useSelector((state) => state?.user)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: '',
    })
    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,
                { ...rests },
                token,)
            return res
        },
    )
    const mutationDelete = useMutationHooks(
        (data) => {
            const {
                id,
                token } = data
            const res = UserService.deleteUser(
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
            const res = UserService.deleteManyUser(
                ids,
                token)
            return res
        },
    )
    const getAllUser = async () => {
        const res = await UserService.getAllUser(user?.access_token)
        //console.log('res', res)
        return res
    }
    const getAllUserCount = async () => {
        const res = await UserService.getAllUserCount(user?.access_token)
        return res
    }


    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected, user?.access_token)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data.address,
                avatar: res?.data.avatar
            })
        }
        setIsPendingUpdate(false)
    }
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
    //console.log('rowSelected', rowSelected)
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsPendingUpdate(true)
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])


    const handleDetailsUser = () => {
        setIsOpenDrawer(true)
    }
    const handleDeleteManyUser = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
    //console.log('dataUpdated', dataUpdated)

    const queryUser = useQuery({
        queryKey: ['users'],
        queryFn: getAllUser
    })

    const { isLoading: isPendingUser, data: users } = queryUser

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsUser} />
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
            title: 'Quản trị',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'Quản trị viên',
                    value: 'Quản trị viên',
                },
                {
                    text: 'Khách hàng',
                    value: 'Khách hàng',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'Quản trị viên') {
                    return record.isAdmin === 'Quản trị viên'
                } else if (value === 'Khách hàng') {
                    return record.isAdmin === 'Khách hàng'
                }
            }
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.price - b.price,
            ...getColumnSearchProps('email')


        },
        {
            title: 'Địa chỉ giao hàng',
            dataIndex: 'address',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },

        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return {
            ...user,
            key: user._id,
            isAdmin: user.isAdmin ? 'Quản trị viên' : 'Khách hàng',
        }
    })


    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            mes.success('Xóa người dùng thành công!')
            handleCancelDelete()
        } else if (isErrorDeleted) {
            mes.error('Xóa người dùng thất bại!')
        }
    }, [isSuccessDeleted])

    useEffect(() => {

        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            mes.success('Xóa người dùng thành công!')
        } else if (isErrorDeletedMany) {
            mes.error('Xóa người dùng thất bại!')
        }
    }, [isSuccessDeletedMany])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }


    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            mes.success('Cập nhật thông tin người dùng thành công!')
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            mes.error('Cập nhật thông tin người dùng thất bại!')
        }
    }, [isSuccessUpdated])
    // stateUser trả về thông tin sản phẩm 

    //event.target đề cập đến phần tử HTML đã kích hoạt sự kiện. 
    // Ví dụ: nếu bạn có thành phần nút trong React, bạn có thể thêm trình nghe onClick vào đó để nghe các sự kiện nhấp chuột. 
    // Khi nút được nhấp vào, đối tượng sự kiện được chuyển đến hàm xử lý sẽ có thuộc tính event.target tham chiếu đến thành phần nút được nhấp vào

    const handleOnChangeDetails = (e) => {
        //console.log('check', e.target.name, e.target.value)
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value // đổi.name thành .value
        })
    }

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        })

    }

    const onupdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    return (
        <div>
            <WrapperHeader style={{ fontSize: '20px', textAlign: 'center' }}>QUẢN LÝ NGƯỜI DÙNG</WrapperHeader>

            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyUser} columns={columns} pagination={{ position: ['bottomCenter'] }} isPending={isPendingUser} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>

            <DrawerComponents title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="85%">
                <Loading isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 21 }}
                        onFinish={onupdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Ảnh đại diện"
                            name="avatar"
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <WrapperUpLoadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                                {stateUserDetails?.avatar && (
                                    <img src={stateUserDetails?.avatar} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt='avatar' />
                                )}
                            </WrapperUpLoadFile>
                        </Form.Item>
                        <Form.Item
                            label="Tên người dùng"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponents value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <InputComponents value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <InputComponents value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ giao hàng"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <InputComponents value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponents>

            <ModalComponents title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn có muốn xóa tài khoản này không?</div>
                </Loading>
            </ModalComponents>

        </div>
    )
}

export default AdminUser