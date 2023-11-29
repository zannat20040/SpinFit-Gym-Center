import React from "react";
import Team from "./Team";
import { useQuery } from "@tanstack/react-query";

const TeamLayout = () => {
  // const trainers = [
  //   {
  //     name: "John Smith",
  //     specialization: "Personal Training",
  //     image:
  //       "https://www.thimble.com/wp-content/uploads/2022/05/Personal-Trainer-Salary-Guide.jpg",
  //     experience: "Certified personal trainer with 10 years of experience",
  //   },
  //   {
  //     name: "Emily Johnson",
  //     image:
  //       "https://catherinetingey.com/wp-content/uploads/2013/07/DSC00126-Version-2-620x350.jpg",
  //     specialization: "Yoga Instructor",
  //     experience:
  //       "Experienced yoga instructor specializing in Vinyasa and Hatha yoga",
  //   },
  //   {
  //     name: "Mike Davis",
  //     specialization: "Strength and Conditioning",
  //     image:
  //       "https://img.freepik.com/premium-photo/portrait-black-man-personal-trainer-gym-workout-athlete-ready-fitness-exercise-healthy-body-wellness-training-face-strength-muscle-development-physical-health-coach_590464-119547.jpg",
  //     experience:
  //       "Strength and conditioning coach with a focus on athletic performance",
  //   },
  //   {
  //     name: "Sophia Rodriguez",
  //     specialization: "Dance Fitness",
  //     image:
  //       "https://img.freepik.com/premium-photo/young-female-fitness-personal-trainer-with-notepad-standing-gym-with-thumb-up_146671-31568.jpg",
  //     experience:
  //       "Professional dancer turned fitness instructor, passionate about dance fitness routines",
  //     contact: "sophia.rodriguez@example.com",
  //   },
  // ];

  const { data: trainers } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/application?role=trainer`);
      return res.json();
    },
  });
  return (
    <>
     <div className="bg-[#dde244a6]">
      <div className="container m-auto px-4 py-10">
      <h1 className="mb-5 text-6xl font-bold font-oswald text-white py-5">
          Our Top <span className="text-6xl text-black">Expertise</span>
        </h1>
        <div className="grid  py-10 items-center">
          <div className="grid grid-cols-4 gap-4 ">
            {trainers?.map((member, index) => (
              <Team member={member} key={index}></Team>
            ))}
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default TeamLayout;
