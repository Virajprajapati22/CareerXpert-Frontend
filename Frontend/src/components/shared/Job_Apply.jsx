// JobApplicationsList.jsx
import React, { useEffect, useState } from "react";
import JobApplicationCard from "./JobApplicationCard";
import google from "./google.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const jobApplications = [
  {
    logo: { google }, // replace with actual logo URLs
    companyName: "Google",
    role: "Frontend Developer",
    appliedDate: "2024-10-01",
    status: "Pending",
    resumelinks: "/",
  },
  {
    logo: { google },
    companyName: "Microsoft",
    role: "Backend Developer",
    appliedDate: "2024-10-05",
    status: "Accepted",
    resumelinks: "/",
  },
  {
    logo: { google },
    companyName: "Amazon",
    role: "Data Scientist",
    appliedDate: "2024-10-10",
    status: "Rejected",
    resumelinks: "/",
  },
  // Add more jobs as needed
];

const Job_Apply = (props) => {
  var BASE_URL = import.meta.env.VITE_BACKEND_HOST;
  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  const token = getToken();
  const [myJobs, setMyJobs] = useState([]);

  const fetchMyApplications = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/application/myapplications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Applications");
      }

      const data = await response.json();
      return data?.applications;
    } catch (error) {
      console.error("Error fetching your applications:", error);
      return null;
    }
  };

  useEffect(() => {
    const func = async () => {
      const myapplications = await fetchMyApplications();
      setMyJobs(myapplications);
    };

    func();
  }, []);
  console.log(myJobs, "[MY JOBS]");

  return (
    <div>
      <Navbar user={props?.user} />

      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          My Job Applications
        </h1>
        {myJobs.map((job, index) => {
          const appliedDate = new Date(job?.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );
          return (
            <Link
              to={`/applyjobdcard?job_id=${job?.job?._id}&role=${props?.user?.role}`}
            >
              <JobApplicationCard
                key={index}
                logo={job?.job?.company?.logo}
                companyName={job?.job?.company?.name}
                role={job?.job?.title}
                appliedDate={appliedDate}
                status={job?.status}
                resumelinks={job?.resume}
              />
            </Link>
          );
        })}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Job_Apply;
