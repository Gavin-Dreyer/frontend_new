import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { css } from 'emotion'
import { Button } from 'antd'
import 'antd/dist/antd.css'

import gridOptions from './Pagination'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columnDefs: [
        {
          headerName: 'Project',
          field: 'org_name',
          sortable: true,
          filter: true,
          width: 125,
        },
        {
          headerName: 'Sensor ID',
          field: 'physical_id',
          sortable: true,
          filter: true,
          width: 95,
        },
        {
          headerName: 'Status',
          field: 'status',
          sortable: true,
          filter: true,
          width: 90,
        },
        {
          headerName: 'Province',
          field: 'province_name',
          sortable: true,
          filter: true,
          width: 90,
        },
        {
          headerName: 'District',
          field: 'district_name',
          sortable: true,
          filter: true,
          width: 90,
        },
        {
          headerName: 'Commune',
          field: 'commune_name',
          sortable: true,
          filter: true,
          width: 100,
        },
        // {
        //   headerName: "Depth",
        //   field: "depth",
        //   sortable: true,
        //   filter: true,
        // width: 90,
        //   type: "numericColumn"
        // },
        // {
        //   headerName: "Constructed",
        //   field: "constructed",
        //   sortable: true,
        //   width: 90
        // },
        // {
        //   headerName: "Cellular",
        //   field: "cellular",
        //   sortable: true,
        //   filter: true,
        //   width: 90
        // }
        // {
        //   headerName: "Liters/Day",
        //   field: "liters_day",
        //   sortable: true,
        //   filter: true,
        //   width: 90,
        //   type: "numericColumn"
        // },
        // {
        //   headerName: "Liters/Week",
        //   field: "liters_week",
        //   sortable: true,
        //   filter: true,
        //   width: 90,
        //   type: "numericColumn"
        // }
      ],
      sensors: [],
      search: '',
    }
  }

  // componentDidMount = () => {
  //   const token = localStorage.getItem('token')
  //   console.log(token)
  //   fetch(`${process.env.REACT_APP_HEROKU_API}/api/sensors/recent`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `${token}`,
  //     },
  //   })
  //     .then(result => result.json())
  //     // .then(rowData => this.setState({ rowData }))
  //     .then(rowData => console.log(rowData, 'ROWDATA'))
  //   //   .catch(err => console.log(err))
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ ...this.state, sensors: this.props.sensors })

      if (this.state.sensors.length > 0) {
        this.addStringToStatus()
      }
    }

    if (prevState !== this.state && this.state !== this.props) {
      this.addStringToStatus()
    }

    console.log(prevState, this.state)
  }

  addStringToStatus() {
    this.setState({
      sensors: this.state.sensors.map(item => {
        if (item.status === null) {
          return (item = { ...item, status: 'N/A' })
        } else {
          return item
        }
      }),
    })
  }

  taskFilter = filteredItem => {
    // console.log(filteredItem, 'filtered item here')
    this.setState({
      sensors: this.state.sensors.filter(item => {
        if (
          item.province_name.toLowerCase().includes(filteredItem) ||
          item.org_name.toLowerCase().includes(filteredItem) ||
          item.district_name.toLowerCase().includes(filteredItem) ||
          item.commune_name.toLowerCase().includes(filteredItem) ||
          item.physical_id.toString().includes(filteredItem) ||
          item.status
            .toString()
            .toLowerCase()
            .includes(filteredItem)
        ) {
          console.log(item)
          // return (item = { ...item, status: 'N/A' })
          return item
        }
      }),
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    this.taskFilter(this.state.search)
  }

  submitSearch = e => {
    e.preventDefault()
    this.setState({ search: '' })
  }

  reset = e => {
    e.preventDefault()
    this.setState({ sensors: this.props.sensors })
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  exportToCsv = function() {
    var params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: 'OverviewGrid.csv',
    }
    gridOptions.api.exportDataAsCsv(params)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <input
            type='text'
            name='search'
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
        <button onClick={e => this.reset(e)}>Reset</button>
        <Button
          type='default'
          icon='download'
          size='small'
          onClick={this.exportToCsv.bind(this)}
        >
          CSV
        </Button>
        {/* <label style={{ margin: "10px" }}>
          <button
            className={css({
              borderRadius: "5px",
              fontSize: "1.25rem",
              border: "none",
              backgroundColor: "#f3f7fc",
              color: "#7f7f7f",
              cursor: "pointer",
              marginTop: "10px",
              ":hover": { color: "black" }
            })}
            onClick={this.exportToCsv.bind(this)}
          >
            Export to CSV
          </button>
        </label> */}

        <div
          className='ag-theme-balham'
          style={{
            height: '500px',
            width: '100%',
            // marginTop: 15
            // marginLeft: 100
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.sensors}
            gridOptions={gridOptions}
            modules={this.state.modules}
            defaultColDef={this.state.defaultColDef}
            rowSelection={this.state.rowSelection}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    )
  }
}

export default Grid
