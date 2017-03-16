import React, { Component } from 'react';
import ReactTable from 'react-table';
import style from 'react-table/react-table.css';
import columns from '../../utils/react-table';

class PlayerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    const dataHolder = [];
    for (const [sid, un] of this.props.data) {
      if (un.ol === '1') {
        const name = un.un;
        dataHolder.push({ sid, name });
      }
    }
    const data = dataHolder;
    return (
      <ReactTable
        classsName="-striped"
        data={data}
        style={style}
        columns={columns}
        defaultPageSize={10}
        onChange={(state, instance) => {
          console.log(state, instance);
        }}
      />
    );
  }
}

export default PlayerTable;