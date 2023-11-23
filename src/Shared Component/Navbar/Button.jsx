import React from 'react';

const Button = ({label}) => {
    return (
        <div>
            <button className="btn btn-outline bg-[#dde244] rounded-none">{label}</button>
        </div>
    );
};

export default Button;