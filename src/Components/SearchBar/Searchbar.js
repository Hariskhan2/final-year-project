
import React from 'react'
import './Searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons'

const Searchbar = (props) => {
    const [searchVal, setSearchVal] = React.useState('');
    
    const handleInput = (e) => {
      setSearchVal(e.target.value);
    }
    
    const handleClearBtn = () => {
      setSearchVal('');
    }
    
    // const filteredProducts = props.products.filter((product) => {
    //   return product.includes(searchVal);
    // });
    
    return (
      <div className='container'>
        <div className='input-wrap'>
        <FontAwesomeIcon icon={faMagnifyingGlass} bounce style={{color: "#1ba94c",}} />
          <label 
            htmlFor="product-search" 
            id="input-label"
          >
            Product Search
          </label>
          <input 
            onChange={handleInput}
            value={searchVal}
            type="text" 
            name="product-search" 
            id="product-search" 
            placeholder="Search Products"
          />
          <FontAwesomeIcon icon={faXmark}  style={{color: "#1ba94c",}} onClick={handleClearBtn} />
        </div>
        {/* <div className="results-wrap">
          <ul>
            {filteredProducts.map((product) => {
              return <li key={product} className='list-item'><a href='#'>{product}</a></li>
            })}
          </ul>
        </div> */}
      </div>
    );
}

export default Searchbar


