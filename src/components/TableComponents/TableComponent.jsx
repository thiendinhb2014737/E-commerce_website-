import { Table } from 'antd';
import React, { useMemo, useRef, useState } from 'react'
import Loading from '../LoadingComponents/Loading';
import {
    DeleteOutlined
} from '@ant-design/icons';

import { Excel } from "antd-table-saveas-excel";
const TableComponent = (props) => {

    const { selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteMany } = props

    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
            //console.log(`selectedRowKeys: ${selectedRowKeys}`,);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }
    const handleExportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
    return (
        <Loading isPending={isPending}>

            {rowSelectedKeys.length > 0 && (
                <div><DeleteOutlined style={{ fontSize: '20px', marginLeft: '6px' }} onClick={handleDeleteAll} /></div>
            )}
            <button style={{ marginLeft: '1130px' }} onClick={handleExportExcel}>Export Excel</button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent