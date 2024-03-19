import React, { useState, useEffect } from "react";
import {Button} from '@mui/material';
import DataTable from 'react-data-table-component'
import StatusIndicator from "../components/StatusIndicator";


const Server = () => {
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const data = [
      {
        "ServerID": 1,
        "ServerName": "Server1",
        "IPAddress": "192.168.1.100",
        "Location": "Datacenter A",
        "OS": "Linux",
        "CPU": "Intel Xeon",
        "MemoryGB": 16.5,
        "StorageGB": 500,
        "Status": "Active",
        "LastUpdated": "2024-03-10T12:00:00Z",
        "id": "ca36"
      },
      {
        "ServerID": 2,
        "ServerName": "Server2",
        "IPAddress": "192.168.1.101",
        "Location": "Datacenter B",
        "OS": "Windows Server",
        "CPU": "AMD Ryzen",
        "MemoryGB": 32,
        "StorageGB": 1000,
        "Status": "Inactive",
        "LastUpdated": "2024-03-10T12:15:00Z",
        "id": "565b"
      },
      {
        "ServerID": 3,
        "ServerName": "Server3",
        "IPAddress": "192.168.1.102",
        "Location": "Datacenter A",
        "OS": "Ubuntu Server",
        "CPU": "ARM Cortex",
        "MemoryGB": 8.75,
        "StorageGB": 250,
        "Status": "Offline",
        "LastUpdated": "2024-03-10T12:30:00Z",
        "id": "a3c4"
      }
    ];

    setServerData({ ServerDetails: data });
  }, []);

  const data = [
    {
      "ServerID": 1,
      "ServerName": "Server1",
      "IPAddress": "192.168.1.100",
      "Location": "Datacenter A",
      "OS": "Linux",
      "CPU": "Intel Xeon",
      "MemoryGB": 16.5,
      "StorageGB": 500,
      "Status": "Active",
      "LastUpdated": "2024-03-10T12:00:00Z",
      "id": "ca36"
    },
    {
      "ServerID": 2,
      "ServerName": "Server2",
      "IPAddress": "192.168.1.101",
      "Location": "Datacenter B",
      "OS": "Windows Server",
      "CPU": "AMD Ryzen",
      "MemoryGB": 32,
      "StorageGB": 1000,
      "Status": "Inactive",
      "LastUpdated": "2024-03-10T12:15:00Z",
      "id": "565b"
    },
    {
      "ServerID": 3,
      "ServerName": "Server3",
      "IPAddress": "192.168.1.102",
      "Location": "Datacenter A",
      "OS": "Ubuntu Server",
      "CPU": "ARM Cortex",
      "MemoryGB": 8.75,
      "StorageGB": 250,
      "Status": "Offline",
      "LastUpdated": "2024-03-10T12:30:00Z",
      "id": "a3c4"
    }
  ];
  const columns = [
    {
        name:'ID',
        selector: row => row.ServerID
    },
    {
        name:"Server Name",
        selector: row=> row.ServerName,
        sortable : true
    },
    {
        name:"IP",
        selector: row => row.IPAddress
    },
    {
        name:"Location",
        selector: row => row.Location
    },
    {
        name:"OS",
        selector: row=> row.OS
    },
    {
        name:"Memory (GB)",
        selector: row => row.MemoryGB
    },
    {
        name:"Storage (GB)",
        selector: row => row.StorageGB
    },
    {
        name: "CPU",
        selector: row => row.CPU

    },
    {
        name: 'Status',
        cell: row => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StatusIndicator status={row.Status} />
          </div>
        ),
    
    }
  ];

  const [records, setRecords] = useState(data);

  function handleFilter(event){
       const newRecord = data.filter(row =>{
        return "";
       })

        setRecords(newRecord)
  }

  return (
    <div className="main-container">
        <div className="main-title">
            <h3>Servers</h3>
        </div>
        <div>
            <Button variant="outlined">New</Button>
        </div>
        <div className='text-end'>
            <input type='text' onChange={handleFilter}></input>
        </div>
        <DataTable
         columns={columns}
         data={records}
         selectableRows
         pagination
        >
        </DataTable>
    </div>
  );
};

export default Server;