import React from 'react';
import Banner from '../Component/Home/Banner/Banner';
import FeatureLayout from '../Component/Home/Feature/FeatureLayout';
import AboutLayout from '../Component/Home/About/AboutLayout';
import Textimonial from '../Component/Home/Testimonial/Textimonial';
import Blog from '../Component/Home/Blog/Blog';
import Footer from '../Shared Component/Footer';
import TeamLayout from '../Component/Home/Team member/TeamLayout';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureLayout></FeatureLayout>
            <AboutLayout></AboutLayout>
            <TeamLayout></TeamLayout>
            <Textimonial></Textimonial>
            <Blog></Blog>
            <Footer></Footer>
        </div>
    );
};

export default Home;