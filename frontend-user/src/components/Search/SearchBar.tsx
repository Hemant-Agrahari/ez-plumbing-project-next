import Image from 'next/image'
import React from 'react'
import styles from '../Search/SearchBar.module.css';
const SearchBar = ({ onSearchChange }: any) => {
  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <input
            className={styles.textField3}
            placeholder="Search"
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
          />
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