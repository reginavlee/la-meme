import React, { Component } from 'react';
import ReactTable from 'react-table';
import style from 'react-table/react-table.css';
import columns from '../../utils/room-list-columns';

class RoomsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <ReactTable
        classsName="-striped"
        style={style}
        columns={columns}
        defaultPageSize={10}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: e => {
            
            }
          };
        }}
      />
    );
  }
}

export default RoomsTable;
