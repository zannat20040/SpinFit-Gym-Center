import React from 'react';
import AboutSlider from './AboutSlider';
import About from './About';

const AboutLayout = () => {
    return (
        <div className='container mx-auto px-4 pb-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
            <About></About>
            <AboutSlider></AboutSlider>

            </div>
        </div>
    );
};

export default AboutLayout;