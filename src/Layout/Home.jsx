import React from 'react';
import Banner from '../Component/Home/Banner/Banner';
import FeatureLayout from '../Component/Home/Feature/FeatureLayout';
import AboutLayout from '../Component/Home/About/AboutLayout';
import Textimonial from '../Component/Home/Testimonial/Textimonial';
import Blog from '../Component/Home/Blog/Blog';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureLayout></FeatureLayout>
            <AboutLayout></AboutLayout>
            <Textimonial></Textimonial>
            <Blog></Blog>
        </div>
    );
};

export default Home;