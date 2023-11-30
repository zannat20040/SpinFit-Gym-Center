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

  const allDays = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
    const level = `skill-level${index + 1}`;
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
    const specialization = form.specialization.value;
    const startingTime = form.startingTime.value;
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

    const selectedDaysWithTime = [];

    for (const day of selectedDays) {
      const slotHour = form[`totalSlot-${day.toLowerCase()}`]?.value;
      if (slotHour) {
        selectedDaysWithTime.push({
          day: day.toLowerCase(),
          slot: slotHour,
        });
        totalSum += parseInt(slotHour);
      }
    }

    // skill level handle according to the skills
  
    const updatedskills = [];

    const selectedSkill = skills.filter(
      (skill, index) => form[`skill${index + 1}`]?.checked
    );
    for (const skill of selectedSkill) {
      const skillIndex = skills.indexOf(skill);
      const skillIsChecked = form[`skill${skillIndex + 1}`]?.checked;

      if (skillIsChecked) {
        const skillLevel = form[`skill-level${skillIndex+1}`].value;
        updatedskills.push({
          skill: skill,
          value: skillLevel ,
        });
      }
    }

    // create profile object
    const trainerProfile = {
      fullName: name,
      email: email,
      age: age,
      specialization:specialization,
      startingTime:startingTime,
      yearsOfExperience: experience,
      profileImage: photo,
      role: userInfo?.role,
      socialIcons: [
        { platform: "Facebook", link: facebook },
        { platform: "Linkedin", link: linkedin },
        { platform: "Instagram", link: instagram },
      ],
      availableTimeSlot: selectedDaysWithTime,
      skills: updatedskills,
      weeklyAvailableTime: totalSum,
    };

    axios
      .post("http://localhost:5000/trainerApplication", trainerProfile)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          swal(
            "Congratulations!",
            "Your application has been submitted. Wait for next response!",
            "success"
          );
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
