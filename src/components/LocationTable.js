import React, { useState } from 'react'
import {useLocations} from '../hooks/index'
import MaterialTable from "material-table";
// import { AddBox, ArrowDownward } from "@material-ui/icons";


const LocationTable = props => {

    const [distance, setDistance] = useState('all');

    let { locations, loading, error } = useLocations(distance);

    console.log(locations)
    return (
        <MaterialTable
        title="All Locations"
        columns={[
            { title: 'Destination', field: 'destination' },
            { title: 'distance in km', field: 'distance_in_km' },
          { title: 'distance Description', field: 'distance_description' },
              ]}
        actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            }
          ]}
        data={locations}
        options={{
            filtering: true
          }}
        components={{
        Action: props => (
           <>
           <button className='bntn btn-primary radius-1 p-2 m-1 btn-sm' onClick={(event) => props.action.onClick(event, props.data)}>edit</button>
            <button className='bntn btn-danger radius-1 p-2 m-1 btn-sm' onClick={(event) => props.action.onClick(event, props.data)}>edit</button>
            </>
            ),

        }}

        
      />
    )
}

LocationTable.propTypes = {

}

export default LocationTable
