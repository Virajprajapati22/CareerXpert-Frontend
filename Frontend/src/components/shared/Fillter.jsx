// FilterBar.jsx
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaBriefcase, FaHome } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { MdOutlineLocationOn } from 'react-icons/md';

function Fillter() {
    // State to manage selected filters
    const [selectedFilter, setSelectedFilter] = useState('');

    // Handler for filter button click
    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div className="flex flex-col flex-wrap gap-5 justify-center bg-white p-6 rounded-lg shadow-md">

            <div className='flex items-center justify-center gap-6'>
                <button
                    className={`flex items-center px-4 py-2 rounded-full text-gray-800 font-medium transition-colors ${selectedFilter === 'Find Jobs' ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100'
                        }`}
                    onClick={() => handleFilterClick('Find Jobs')}
                >
                    <FiSearch className="mr-2" />
                    Find Jobs
                </button>

                {/* Full-Time Button */}
                <button
                    className={`flex items-center px-4 py-2 rounded-full text-gray-800 font-medium transition-colors ${selectedFilter === 'Full-Time' ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100'
                        }`}
                    onClick={() => handleFilterClick('Full-Time')}
                >
                    <BiTime className="mr-2" />
                    Full-Time
                </button>

                {/* Part-Time Button */}
                <button
                    className={`flex items-center px-4 py-2 rounded-full text-gray-800 font-medium transition-colors ${selectedFilter === 'Part-Time' ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100'
                        }`}
                    onClick={() => handleFilterClick('Part-Time')}
                >
                    <BiTime className="mr-2 text-pink-400" />
                    Part-Time
                </button>
            </div>


            <div className='flex items-center justify-center gap-4'>

                {/* Find Jobs Button */}

                <button
                    className={`flex items-center px-4 py-2 rounded-full text-gray-800 font-medium transition-colors ${selectedFilter === 'Work From Home' ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100'
                        }`}
                    onClick={() => handleFilterClick('Work From Home')}
                >
                    <FaHome className="mr-2 text-yellow-500" />
                    Work From Home
                </button>

                {/* On-Field Button */}
                <button
                    className={`flex items-center px-4 py-2 rounded-full text-gray-800 font-medium transition-colors ${selectedFilter === 'On-Field' ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100'
                        }`}
                    onClick={() => handleFilterClick('On-Field')}
                >
                    <MdOutlineLocationOn className="mr-2 text-purple-500" />
                    On-Field
                </button>

            </div>
            {/* Work From Home Button */}
        </div>
    );
}

export default Fillter;