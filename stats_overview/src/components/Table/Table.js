import React, { Component } from 'react';
import ReactTable from 'react-table';

import '../../../node_modules/react-table/react-table.css';
import '../../common/react-table.css';

const Table = (props) => {
    return (

        <ReactTable
            noDataText={props.noDataText}
            data={props.data}
            columns={props.columns}
            defaultPageSize={props.defaultPageSize}
            pageSize={props.pageSize}
            style={props.style}
            showPagination={props.showPagination}
            className="-highlight"
        />

    );
}

Table.defaultProps = {

    noDataText: "Não existem registos",
    data: [],
    columns: [],
    defaultPageSize: 10,
    pageSize: 10,
    style: {},
    showPagination: true,

}

export default Table;