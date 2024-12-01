import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CompanyD_1 from "./CompanyD_1";
import Company_2 from "./Company_2";
import ReviewSection from "./ReviewSection";
import HDFC from "./HDFC.png";
import Navbar from "./Navbar";
function CompanyD(props) {
  var BASE_URL = import.meta.env.VITE_BACKEND_HOST;
  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const [showMoreCulture, setShowMoreCulture] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [jobCards, setJobCards] = useState([]);

  const { search } = useLocation(); // Get the query string from the URL
  const queryParams = new URLSearchParams(search); // Parse the query string
  const company_id = queryParams.get("company_id");
  const job_id = queryParams.get("job_id");
  const role = queryParams.get("role");

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/company/${company_id}`, {
        method: "GET",
        headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Company details");
      }

      const data = await response.json();
      return data?.company;
    } catch (error) {
      console.error("Error fetching Company Data:", error);
      return null;
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/job/${company_id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Job details");
      }

      const data = await response.json();
      return data?.jobs;
    } catch (error) {
      console.error("Error fetching Job Data:", error);
      return null;
    }
  };

  useEffect(() => {
    const func = async () => {
      const company = await fetchCompanyDetails();
      const jobs = await fetchJobDetails();

      setCurrentCompany(company);
      setJobCards(jobs);
    };

    func();
  }, []);

  return (
    <>
      <Navbar user={props?.user} />
      <div className="bg-gray-100 min-h-screen p-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start">
            <img
              src={currentCompany?.logo}
              alt="HDFC Bank Logo"
              className="object-cover w-20 h-20 mr-8"
            />
            <div>
              <h1 className="text-4xl font-semibold">{currentCompany?.name}</h1>
              <p className="text-gray-600 mb-2">{"IT & Services"}</p>
              <Link
                to={currentCompany?.website}
                className="text-blue-600 hover:underline mb-4 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentCompany?.website}
              </Link>
              <div className="grid grid-cols-3 gap-4">
                <InfoItem label="Revenue" value="US$ 26 Billion" />
                <InfoItem label="Number of Employees" value="1,77,000" />
                <InfoItem label="Branches" value="8,344" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <Company_2
          title={`About ${currentCompany?.name}`}
          content={currentCompany?.about}
          showMore={false}
          // setShowMore={setShowMoreAbout}
        />
        {/* <Company_2
          title="Culture & Values"
          content="HDFC Bank fosters a culture of excellence, innovation, and customer-centric services. ..."
          showMore={showMoreCulture}
          setShowMore={setShowMoreCulture}
        /> */}

        {/* Opportunities Section with Job Cards */}
        <Company_2 title="Opportunities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {jobCards?.map((job) => {
              const deadline = new Date(job?.deadline);
              if (isNaN(deadline.getTime())) {
                console.error("Invalid deadline date:", job?.deadline);
                return null;
              }

              const now = new Date();
              const timeDifference = deadline - now;
              const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

              return (
                <Link
                  key={job?._id}
                  to={`/applyjobdcard?job_id=${job?._id}&role=${role}`}
                >
                  <CompanyD_1
                    title={job?.title}
                    company={job?.company?.name || "Unknown Company"}
                    daysLeft={days > 0 ? days : "Deadline Passed"}
                  />
                </Link>
              );
            })}
          </div>
        </Company_2>

        {role != "Recruiter" && <ReviewSection />}
      </div>
    </>
  );
}

// InfoItem Component for displaying company info in a grid
const InfoItem = ({ label, value }) => (
  <div>
    <h2 className="text-lg font-semibold">{label}</h2>
    <p className="text-gray-700">{value}</p>
  </div>
);

export default CompanyD;
