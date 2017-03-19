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
    const dataHolder = [];
    for (const [roomname, roomcount] of this.props.data) {
      dataHolder.push({ roomname, roomcount });
    }
    const data = dataHolder;
    return (
      <ReactTable
        classsName="-striped"
        style={style}
        columns={columns}
        defaultPageSize={10}
        data={data}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: e => {
              this.props.joinRoom(e.target.innerHTML);
            }
          };
        }}
      />
    );
  }
}

export default RoomsTable;
