import React, { Component } from "react";
// import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import gridOptions from "./Pagination";
// import axios from 'axios';
// import { axiosWithAuth } from '../src/utilities/axiosWithAuth';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "SensorID",
          field: "sensor_pid",
          sortable: true,
          filter: true,
          width: 90
        },
        {
          headerName: "Status",
          field: "status",
          sortable: true,
          filter: true,
          width: 90
        },
        {
          headerName: "Country",
          field: "pumps.country_name",
          sortable: true,
          filter: true,
          width: 90
        },
        {
          headerName: "Province",
          field: "pumps.province",
          sortable: true,
          filter: true,
          width: 90
        },
        {
          headerName: "District",
          field: "pumps.district",
          sortable: true,
          width: 90
        },
        {
          headerName: "Commune",
          field: "pumps.commune",
          sortable: true,
          width: 90
        },
        {
          headerName: "Village",
          field: "pumps.village",
          sortable: true,
          width: 90
        },
        {
          headerName: "Last Upload",
          field: "last_upload",
          sortable: true,
          width: 90,
          type: "numericColumn"
        },
        {
          headerName: "Depth",
          field: "depth",
          sortable: true,
          width: 90,
          type: "numericColumn"
        },
        {
          headerName: "Constructed",
          field: "constructed",
          sortable: true,
          width: 90
        },
        {
          headerName: "Cellular",
          field: "cellular",
          sortable: true,
          width: 90
        },
        {
          headerName: "Liters/Day",
          field: "liters_day",
          sortable: true,
          width: 90,
          type: "numericColumn"
        },
        {
          headerName: "Liters/Week",
          field: "liters_week",
          sortable: true,
          width: 90,
          type: "numericColumn"
        }
      ]
    };
  }

  // componentDidMount() {
  //   fetch("http://dummy.restapiexample.com/api/v1/employees")
  //     .then(result => result.json())
  //     .then(rowData => this.setState({ rowData }));
  // }

  componentDidMount() {
    fetch("http://welldone-db.herokuapp.com/api/sensors/details",
    { 
      method: "GET",
      headers: {
      "Content-Type": "application/json",
     credentials:"same-origin"
  }
})
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }));
  }


  // STATUSCARD from Josh for colors.

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "500px",
          width: "1200px"
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          gridOptions={gridOptions}
        ></AgGridReact>
      </div>
    ); 
  }
}

export default Grid;