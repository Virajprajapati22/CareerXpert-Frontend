// src/ResumeTable.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const ResumeTable = (props) => {
  var BASE_URL = "http://localhost:5001";
  const [resumes, setResumes] = useState([
    {
      username: "JohnDoe",
      resume: "https://placehold.co/100x100",
      status: "Pending",
    },
    {
      username: "JaneSmith",
      resume: "https://placehold.co/100x100",
      status: "Pending",
    },
    {
      username: "MikeJohnson",
      resume: "https://placehold.co/100x100",
      status: "Pending",
    },
  ]);

  const { search } = useLocation(); // Get the query string from the URL
  const queryParams = new URLSearchParams(search); // Parse the query string

  const company_id = queryParams.get("company_id");
  const job_id = queryParams.get("job_id");

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };
  const token = getToken();

  const fetchJobApplicant = async () => {
    let URL = `${BASE_URL}/api/v1/application/${job_id}/applications`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Applicants data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Applicants data:", error);
      return null;
    }
  };

  const handleAccept = async (index) => {
    let URL = `${BASE_URL}/api/v1/application/${index}`;
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update Applicants data"
        );
      }

      const data = await response.json();
      console.log(data, "ACCEPTED");
    } catch (error) {
      console.error("Error updating Applicants data:", error);
      return null;
    }
  };

  const handleReject = async (index) => {
    let URL = `${BASE_URL}/api/v1/application/${index}`;
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update Applicants data"
        );
      }

      const data = await response.json();
      console.log(data, "REJECTED");
    } catch (error) {
      console.error("Error updating Applicants data:", error);
      return null;
    }
  };

  useEffect(() => {
    const func = async () => {
      let applicants = await fetchJobApplicant();
      console.log(applicants, "APPLICANTs");
      const { applications } = applicants;
      if (applications.length > 0) {
        setResumes([...resumes, applications]);
      }
    };

    func();
  }, []);

  return (
    <>
      <Navbar user={props?.user} />
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-5 text-center">
            Applied User Details
          </h1>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-600">
              <tr>
                <th className="text-white text-center py-3 px-4 border-b">
                  Username
                </th>
                <th className="text-white text-center py-3 px-4 border-b">
                  Resume
                </th>
                <th className="text-white text-center py-3 px-4 border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {resumes.length > 0 ? (
                resumes?.map((resume, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 border-b text-center">
                      {resume?.username}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <img
                        src={resume.resume}
                        alt={`Resume of ${resume.username}`}
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-200"
                        onClick={() => handleAccept(index)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                        onClick={() => handleReject(index)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-10 px-4 text-center text-sm text-gray-500"
                  >
                    No Applicants
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ResumeTable;
