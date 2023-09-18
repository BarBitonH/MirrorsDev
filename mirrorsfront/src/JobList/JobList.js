import React, { useEffect, useState } from 'react';
import './JobList.css';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newJob, setNewJob] = useState({
        title: '',
        location: '',
        type: '',
        description: '',
        relevantSkills: [''],
        companyOffering: '',
        whatWeAreLookingFor: ''
    });

    const fetchData = async () => {
        const headers = {
            'x_mir_token': localStorage.getItem('x_mir_token'),
            'Content-Type': 'application/json',
            db: 'Users',
            collection: 'user_action'
        };
        const dataToSend = {
            queryData: localStorage.getItem('internal_axon_id'),
            queryTitle: 'internal_axon_id'
        };
        try {
            const response = await axios.post('http://localhost:3000/dbRouter/db/FindAll', dataToSend, { headers: headers });
            console.log(response);
            console.log(response.data.data)
            const internalJobIds = response.data.data.map(item => item.internal_job_id);
            localStorage.setItem('internal_job_ids', JSON.stringify(internalJobIds));
            setJobs(response.data.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewJob(prevState => ({ ...prevState, [name]: value }));
    };

    const addNewJob = async () => {
        // Define headers
        const headers = {
            'x_mir_token': localStorage.getItem('x_mir_token'),
            'Content-Type': 'application/json',
            db: 'Users',
            collection: 'user_action'
        };

        // Define data
        const data = {
            internal_axon_id: localStorage.getItem('internal_axon_id'),
            internal_job_id: uuidv4(),
            title: newJob.title,
            location: newJob.location,
            type: newJob.type,
            description: newJob.description,
            relevantSkills: newJob.relevantSkills,
            companyOffering: newJob.companyOffering,
            whatWeAreLookingFor: newJob.whatWeAreLookingFor,
            will_interactions: [],
            blocked_interactions: [],
            matches: []
        };

        try {
            // Sending Axios POST request using await
            await axios.post('http://localhost:3000/dbRouter/db/insert', data, { headers: headers });
            setJobs(prevJobs => [...prevJobs, { ...newJob, id: prevJobs.length + 1 }]);
            setNewJob({
                title: '',
                location: '',
                type: '',
                description: '',
                relevantSkills: [''],
                companyOffering: '',
                whatWeAreLookingFor: ''
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error adding the job:", error);
        }
    };

    return (
        <div className="jobListContainer">
            <button className="addJobButton" onClick={() => setShowModal(true)}>Add Job</button>
            {jobs.map(job => (
                <div className="job" key={job._id}>
                    <h3>{job.title}</h3>
                    <p className="location">{job.location}</p>
                    <p className="jobType">{job.type}</p>
                    <div className="jobDescription">{job.description}</div>
                    <ul className="jobSkills">
                        {job.relevantSkills && Array.isArray(job.relevantSkills) && job.relevantSkills.map((skill, index) => <li key={index}>{skill}</li>)}
                    </ul>
                    <div className="jobOffers">
                        <strong>Company Offers:</strong> {job.companyOffering}
                    </div>
                    <div className="jobLookingFor">
                        <strong>We're Looking For:</strong> {job.whatWeAreLookingFor}
                    </div>
                </div>
            ))}

            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="modalClose" onClick={() => setShowModal(false)}>X</button>
                        <div className="modalTitle">
                            <input
                                type="text"
                                name="title"
                                placeholder="Job Title"
                                value={newJob.title}
                                onChange={handleInputChange}
                                className="jobNameInput"
                            />
                        </div>
                        <div className="modalSection">
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={newJob.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modalSection">
                            <textarea
                                name="description"
                                placeholder="Job Description"
                                value={newJob.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modalSection">
                            <select
                                name="type"
                                value={newJob.type}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Student">Remote</option>
                            </select>
                        </div>
                        <div className="modalSection">
                            <h4>Relevant Skills</h4>
                            {newJob.relevantSkills.map((skill, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Skill"
                                        value={skill}
                                        onChange={e => {
                                            let skillsCopy = [...newJob.relevantSkills];
                                            skillsCopy[index] = e.target.value;
                                            setNewJob(prev => ({...prev, relevantSkills: skillsCopy}));
                                        }}
                                    />
                                </div>
                            ))}
                            <button onClick={() => setNewJob(prev => ({
                                ...prev,
                                relevantSkills: [...prev.relevantSkills, '']
                            }))}>
                                Add another skill
                            </button>
                        </div>
                        <div className="modalSection">
                            <textarea
                                name="companyOffering"
                                placeholder="What the company offers"
                                value={newJob.companyOffering}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modalSection">
                            <textarea
                                name="whatWeAreLookingFor"
                                placeholder="What we are looking for"
                                value={newJob.whatWeAreLookingFor}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modalSection">
                            <button className="addJobButton" onClick={addNewJob}>Add Job</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobList;
