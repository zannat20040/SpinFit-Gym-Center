import React from 'react';

const Header = ({label}) => {
    return (
        <div className='mt-10'>
            <h1>SpinFit</h1>
            <p>{label}</p>
        </div>
    );
};

export default Header;