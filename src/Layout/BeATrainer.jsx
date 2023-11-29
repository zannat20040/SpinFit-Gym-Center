import React from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import usersData from "../Custom hooks/usersData";
import Button from "../Shared Component/Button";
import BeATrainerLayout from "../Component/Trainer/BeATrainerLayout";
import { imgUpload } from "../Utils/imageUpload";
import axios from "axios";
import swal from "sweetalert";

const BeATrainer = () => {
  const { data: userInfo } = usersData();

  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  // check box for day and slot

  const HandleCheckbox = (day, event) => {
    const totalSlot = `totalSlot-${day}`;
    const slotbox = document.getElementById(totalSlot);
    if (event.target.checked) {
      slotbox.disabled = false;
    } else {
      slotbox.disabled = true;
      slotbox.value = "";
    }
  };

  const HandleSkillCheckbox = (index, event) => {
    const level = `skill-level${index+1}`;
    const skillLevel = document.getElementById(level);

    if (event.target.checked) {
      skillLevel.disabled = false;
    } else {
      skillLevel.disabled = true;
    }
  };

  const HandleTrainerApplication = async (e) => {
    e.preventDefault();

    // get possible form data
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const experience = form.experience.value;
    const age = form.age.value;
    const linkedin = form.linkedin.value;
    const facebook = form.facebook.value;
    const instagram = form.instagram.value;
    const image = form.photo.files[0];
    const photo = await imgUpload(image);

    // get slot according to the checked boxes

    const selectedDays = allDays.filter(
      (day) => form[day.toLowerCase()]?.checked
    );

    let totalSum = 0;

    const selectedDaysWithTime = {};
    for (const day of selectedDays) {
      const slotHour = form[`totalSlot-${day.toLowerCase()}`]?.value;
      if (slotHour) {
        selectedDaysWithTime[day.toLowerCase()] = slotHour;
        totalSum += parseInt(slotHour);
      }
    }

    // skill level handle according to the skills

    const getLevel = document.querySelectorAll(`input[type="range"]`);
    // console.log(getLevel);
 
  

    let index = 0;
    // for (const level of skills) {
    //   const value = getLevel[index].value ;
    //   updatedskills.push({
    //     skill: level,
    //     value: value || 20,
    //   });
    //   index++;
    // }
    const updatedskills = []

    const selectedSkill = skills.filter(
      (skill,index) => form[`skill${index+1}`]?.checked
    );
    for (const skill of selectedSkill) {
      const skillIndex = skills.indexOf(skill);
  const skillIsChecked = form[`skill${skillIndex + 1}`]?.checked;
  
      if (skillIsChecked) {
        const skillLevel= form[`skill-level${skillIndex}`].value;
        updatedskills.push({
          skill: skill,
          value: skillLevel || 20,
        });
      }
    }

    // create profile object
    const trainerProfile = {
      fullName: name,
      email: email,
      age: age,
      yearsOfExperience: experience,
      profileImage: photo,
      role: userInfo?.role,
      socialIcons: {
        facebook: facebook,
        linkedin: linkedin,
        instagram: instagram,
      },
      availableTimeSlot: selectedDaysWithTime,
      skills: updatedskills,
      weeklyAvailableTime: totalSum,
    };

    axios
      .post("http://localhost:5000/trainerApplication", trainerProfile)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          swal("Congratulations!", "Your application has been submitted. Wait for next response!", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(trainerProfile);
  };
  return (
    <BeATrainerLayout
      HandleTrainerApplication={HandleTrainerApplication}
      HandleCheckbox={HandleCheckbox}
      HandleSkillCheckbox={HandleSkillCheckbox}
    ></BeATrainerLayout>
  );
};

export default BeATrainer;
