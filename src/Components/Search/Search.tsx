
import "./Search.css"
// import { FurnitureData } from '../../data/data'
// @ts-ignore
import SearchIcon from "./../../Assets/search-icon.png";
// import {useState} from 'react'
import {useState} from 'react';
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";

const Search = () => {
    const {updateActiveSearch, updateSearchQuery} = useActiveSearchContext()
    const [input, setInput] = useState("")

    const handleInputChange = (e) => {
        const newInput = e.target.value;
        setInput(newInput)
    }

    const showSearchResults = () => {
        updateActiveSearch(true);
        updateSearchQuery(input)
        setInput("")
    }
  return (
    <div className="SearchWarpper">
         <input type="text" className="SearchInput" value={input} onChange={handleInputChange}></input>
        <a href="#ProductView"><button className="SearchButton" onClick={showSearchResults}>
          <img
            src={SearchIcon}
            alt="search-icon"
            className="SearchIcon"
          />
        </button></a>
    </div>
  )
}

export default Search