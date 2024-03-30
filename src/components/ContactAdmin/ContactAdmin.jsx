import React, { useEffect, useRef, useState } from 'react'
import { WrapperContentTime, WrapperHeader, WrapperRadio, WrapperTime } from './style'
import { Button, DatePicker, Form, Space } from 'antd'
import {
    PlusCircleTwoTone, DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';
import InputFormComponents from '../InputFormComponents/InputFormComponents';
import ButtonComponents from '../ButtonComponents/ButtonComponents';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ContactService from '../../services/ContactService'
import * as mes from '../../components/Message/Message'
import TableComponent from '../TableComponents/TableComponent';
import InputComponents from '../InputComponents/InputComponents';
import { useQuery } from '@tanstack/react-query';
import ModalComponents from '../ModalComponents/ModalComponents';
import Loading from '../LoadingComponents/Loading';
const ContactAdmin = () => {
    const [rowSelected, setRowSelected] = useState('')
    const searchInput = useRef(null);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id } = data
            const res = ContactService.deleteContact(id)
            return res
        },
    )
    const handleDeleteContact = () => {
        mutationDelete.mutate({ id: rowSelected }, {
            onSettled: () => {
                queryContact.refetch()
            }
        })
    }
    const getAllContact = async () => {
        const res = await ContactService.getAllContact()
        return res
    }
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const queryContact = useQuery({
        queryKey: ['allContact'],
        queryFn: getAllContact
    })

    const { isLoading: isPendingContact, data: contact } = queryContact
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            </div>
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
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
    });

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Địa chỉ email',
            dataIndex: 'email',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.email - b.email,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.content.length - b.content.length,
            ...getColumnSearchProps('content')
        },

        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = contact?.data?.length && contact?.data?.map((contact) => {
        return {
            ...contact,
            key: contact._id,
        }
    })
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            mes.success('Xóa liên hệ thành công!')
            handleCancelDelete()
        } else if (isErrorDeleted) {
            mes.error('Xóa liên hệ thất bại!')
        }
    }, [isSuccessDeleted])
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    return (
        <div>
            <WrapperHeader style={{ fontSize: '20px', textAlign: 'center' }}>LIÊN HỆ CỦA KHÁCH HÀNG</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} data={dataTable} pagination={{ position: ['bottomCenter'] }} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <ModalComponents title="Xóa người sự kiện" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteContact}>
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn có muốn xóa liên hệ này không?</div>
                </Loading>
            </ModalComponents>
        </div>
    )
}

export default ContactAdmin