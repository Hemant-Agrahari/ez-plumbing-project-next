import React from 'react';
import Link from 'next/link';

const Button = ({ text, link ="", handle, className }: any) => {
    const buttonOrLink = <Link className={`${className}`} href={`${link}`} onClick={handle}>
        {text}
    </Link>
    return buttonOrLink;
};

export default Button;
