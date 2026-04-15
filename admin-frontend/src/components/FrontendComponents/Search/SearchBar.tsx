import Image from 'next/image'
import React from 'react'
import styles from '../Search/SearchBar.module.css';


const SearchBar = () => {
  return (
    <>
<div className={styles.searchBar}>
      <div className={styles.searchInput}>
        {/* <div className="text35">Search</div> */}
        <input className={styles.textField3} placeholder="Search" type="text" />
      </div>
      <div className={styles.groupDiv}>
        <div className={styles.rectangleDiv} />
        <Image
          className={styles.searchMdIcon}
          alt=""
          src="/templates/searchmd.svg"
          width={32}
          height={32}
        />
      </div>
    </div>

    </>
  )
}

export default SearchBar