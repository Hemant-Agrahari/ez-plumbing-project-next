import Link from 'next/link';
import React from 'react';

const Category = () => {
  return (
    <div className="text-group">
      <h3 className="text83">Category</h3>
      <div className="frame-child44" />
      <div className="categorys-col">
        <div className="frame-parent33">
          <Link href="/category/air-conditioning/" className="text-wrapper">
            <div className="text84">Air Conditioning</div>
          </Link>
          <Link href="/category/drain-service/" className="text-wrapper">
            <div className="text84">Drain Service</div>
          </Link>
          <Link href="/category/home-maintenance/" className="text-wrapper">
            <div className="text84">Home Maintenance</div>
          </Link>
          <Link href="/category/plumbing-services/" className="text-wrapper">
            <div className="text84">Plumbing Services</div>
          </Link>
          <Link href="/category/slab-leak/" className="text-wrapper">
            <div className="text84">Slab Leak</div>
          </Link>
          <Link href="/category/water-damage/" className="text-wrapper">
            <div className="text84">Water Damage</div>
          </Link>
          <Link href="/category/water-heater/" className="text-wrapper">
            <div className="text84">Water Heater</div>
          </Link>
          <Link href="/category/water-leak/" className="text-wrapper">
            <div className="text84">Water Leak</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
