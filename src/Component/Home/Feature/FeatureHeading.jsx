import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../Shared Component/Navbar/Button';

const FeatureHeading = () => {
    return (
        <div className="text-neutral-content flex justify-end">
            <div className="max-w-md text-end ">
              <h1 className="mb-5 text-6xl font-bold  text-[#dde244] font-oswald">
                Unlock Your Fitness Potential
              </h1>
              <p className="mb-5 font-roboto">
                Embark on a transformative fitness journey with our premier gym
                features. From cutting-edge facilities to personalized training,
                we provide everything you need to reach your fitness goals and
                discover a healthier, stronger you. Explore the exceptional
                features that set us apart and take your fitness experience to
                the next level.
              </p>
              <Link>
                <Button label={"More features"}></Button>
              </Link>
            </div>
          </div>
    );
};

export default FeatureHeading;