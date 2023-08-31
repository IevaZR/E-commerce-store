import React from 'react'
import "./Filter2.css"
import FilterItem2 from '../FilterItem2/FilterItem2'


const Filter2: React.FC = () => {
  const category = ["Sofas", "Chairs", "Tables", "Beds"]
  return (
    <div className="Filter2Wrapper">
      <div className="Filter2">
        <FilterItem2
          filterName="Sofas"
          filterCategory="Sofas"
        />
        <FilterItem2
          filterName="Chairs"
          filterCategory="Chairs"
        />
        <FilterItem2
          filterName="Tables"
          filterCategory="Tables"
        />
        <FilterItem2
          filterName="Beds"
          filterCategory="Beds"
        />
      </div>
    </div>
  )
}

export default Filter2