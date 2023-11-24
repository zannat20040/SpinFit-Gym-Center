import React from 'react';
import Banner from '../Component/Home/Banner/Banner';
import FeatureLayout from '../Component/Home/Feature/FeatureLayout';
import AboutLayout from '../Component/Home/About/AboutLayout';
import Textimonial from '../Component/Home/Testimonial/Textimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureLayout></FeatureLayout>
            <AboutLayout></AboutLayout>
            <Textimonial></Textimonial>
        </div>
    );
};

export default Home;