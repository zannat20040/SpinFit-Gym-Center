import React from "react";
import RouteLabel from "../../Shared Component/RouteLabel";
import Button from "../../Shared Component/Button";
import usersData from "../../Custom hooks/usersData";

const BeATrainerLayout = ({
  HandleTrainerApplication,
  HandleCheckbox,
  HandleSkillCheckbox,
}) => {
  const { data: userInfo } = usersData();
  
  const allDays = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const skills = [
    "Supplementation",
    "Dietary Guidelines",
    "Fitness Assessments Knowledge",
    "Exercises Knowledge",
    "Strength Training",
    "Cardiovascular Training",
    "Fitness Knowledge",
    "Nutritional Knowledge",
    "Motivational Skills",
    "Communication Skills",
  ];

  const socialLink = ["facebook", "instagram", "linkedin"];
  return (
    <>
      <RouteLabel label={"Read full Blog"}></RouteLabel>
      <div className="container  mx-auto h-screen  ">
        <form
          className="card-body p-2 grid grid-cols-2 gap-5 pb-20"
          onSubmit={HandleTrainerApplication}
        >
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 font-roboto ">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white tracking-wider">
                    Your name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={userInfo?.name}
                  className="input input-bordered rounded-none capitalize"
                  disabled
                  name="name"
                />
              </div>
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white tracking-wider">
                    Your Email
                  </span>
                </label>
                <input
                  type="email"
                  defaultValue={userInfo?.email}
                  disabled
                  className="input input-bordered rounded-none"
                  name="email"
                />
              </div>
            </div>
            {/* experience */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white tracking-wider font-roboto">
                  Your experience year
                </span>
              </label>
              <input
                type="number"
                placeholder="type here.."
                className="input input-bordered rounded-none"
                required
                name="experience"
              />
            </div>
            {/* specialization */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white tracking-wider font-roboto">
                  Your Specialization
                </span>
              </label>
              <input
                type="text"
                placeholder="type here.."
                className="input input-bordered rounded-none"
                required
                name="specialization"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 font-roboto">
              {/* age */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white tracking-wider font-roboto">
                    Your Age
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="type here.."
                  className="input input-bordered rounded-none"
                  required
                  name="age"
                />
              </div>
              {/* available slot */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white tracking-wider font-roboto">
                    Your Slot starting time
                  </span>
                </label>
                <input
                  type="time"
                  id="appt"
                  name="startingTime"
                  required
                  className=" input input-bordered rounded-none"
                />
              </div>
            </div>
            {/* image */}
            <div className="form-control">
              <label className="label ">
                <span className="label-text rounded-none text-white tracking-wider font-roboto">
                  Profile Image
                </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full rounded-none "
                placeholder="photo url"
                required
                name="photo"
                accept="image/*"
              />
            </div>
             {/* about yourself */}
             <div className="form-control">
              <label className="label">
                <span className="label-text text-white tracking-wider font-roboto">
                  Write about you
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered rounded-none"
                placeholder="Bio"
                required
                name="bio"
              ></textarea>
            </div>
            {/* social link */}
            <div>
              <label className="label">
                <span className="label-text text-white tracking-wider font-roboto">
                  Give your social meadia link
                </span>
              </label>
              {socialLink.map((link) => (
                <div className="form-control mb-2">
                  <input
                    type="url"
                    placeholder={link}
                    className="input input-bordered rounded-none"
                    required
                    name={link}
                  />
                </div>
              ))}
            </div>
            {/* weekly time slot  */}
            <div>
              <label className="label  mt-5 ">
                <span className="label-text text-white font-roboto">
                  Choose your available time according to the day
                </span>
              </label>
              <div className=" grid-cols-3 grid gap-3 justify-between text-gray-400 font-roboto ">
                {allDays.map((day) => (
                  <div className="form-control flex flex-row gap-4">
                    <label className="label cursor-pointer  ">
                      <input
                        type="checkbox"
                        name={day.toLowerCase()}
                        value={day.toLowerCase}
                        className="checkbox border border-white rounded-none checkbox-sm mr-1"
                        onClick={(event) => HandleCheckbox(day, event)}
                      />
                      <span className="label-text font-roboto text-white">
                        {day}
                      </span>
                    </label>
                    <input
                      type="number"
                      required
                      name={`totalSlot-${day.toLowerCase()}`}
                      disabled
                      id={`totalSlot-${day}`}
                      className="timepicker w-full input input-sm rounded-none border border-gray-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            {/* skills */}
            <div>
              <label className="label  mt-5 ">
                <span className="label-text text-white font-roboto">
                  Give your skills level
                </span>
              </label>
              {skills.map((skill, index) => (
                <div className="" key={skill}>
                  <label className="label cursor-pointer w-full form-control flex gap-6 flex-row ">
                    <div className="form-control w-full ">
                      <label className="label gap-5 justify-start mb-3">
                        <input
                          type="checkbox"
                          name={`skill${index + 1}`}
                          value=""
                          id={`skill${index + 1}`}
                          className="checkbox border border-white rounded-none checkbox-sm mr-1"
                          onClick={(event) => HandleSkillCheckbox(index, event)}
                        />
                        <span className="label-text text-white font-roboto">
                          {skill}
                        </span>
                      </label>
                      <input
                        type="range"
                        id={`skill-level${index + 1}`}
                        name={`skill-level${index + 1}`}
                        min="25"
                        max="100"
                        disabled
                        className="range h-2"
                      />
                    </div>
                  </label>
                </div>
              ))}
            </div>
            {/* button */}
            <div className="form-control mt-6 text-center">
              <Button label={"Apply"}></Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BeATrainerLayout;
