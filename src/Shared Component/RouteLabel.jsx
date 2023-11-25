import React from 'react';
import Button from './Button';

const RouteLabel = ({label}) => {
    return (
       <div>
        <div
        className="hero h-[250px] mb-28"
        style={{backgroundImage: 'url(https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}
      >
            <div className="hero-overlay bg-opacity-80 bg-black"></div>
            <div className="text-neutral-content container mx-auto px-4">
                <div className="">
                    <h1 className="mb-5 text-6xl font-bold font-oswald text-center py-8 px-5 bg-[#dde2449d] text-black uppercase">{label}</h1>
                </div>
            </div>
        </div><div>

            </div>
       </div>
    );
};

export default RouteLabel;