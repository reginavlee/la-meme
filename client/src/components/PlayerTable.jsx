import React, { Component } from 'react';
import ReactTable from 'react-table';
import style from 'react-table/react-table.css';
import columns from '../../utils/user-list-columns';

class PlayerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    const dataHolder = [];
    for (const [username, data] of this.props.data) {
      dataHolder.push({ username, location: data.location, sid: data.sid });
    }
    const data = dataHolder;
    return (
      <ReactTable
        classsName="-striped"
        data={data}
        style={style}
        columns={columns}
        defaultPageSize={10}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: e => {
              if (column.header === "Socketid") {
                this.props.setupUserInvite(e.target.innerHTML);
                console.log(column);
              }
            }
          }
        }}
      />
    );
  }
}

export default PlayerTable;
