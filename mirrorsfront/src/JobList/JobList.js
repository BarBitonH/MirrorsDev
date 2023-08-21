import React, {useState} from 'react';
import './JobList.css';

function JobList() {
    const [jobs, setJobs] = useState([
        {id: 1, title: 'Frontend Developer', location: 'New York', type: 'Full-Time'},
        {id: 2, title: 'Backend Developer', location: 'London', type: 'Remote'}
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newJob, setNewJob] = useState({
        title: '',
        location: '',
        type: '',
        description: '',
        relevantSkills: [''],  // Using an array for skills
        companyOffering: '',
        whatWeAreLookingFor: ''
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewJob(prevState => ({...prevState, [name]: value}));
    };

    const addNewJob = () => {
        // Simple logic to add new job to the list. Adjust as needed.
        setJobs(prevJobs => [...prevJobs, {...newJob, id: prevJobs.length + 1}]);
        setNewJob({
            title: '',
            location: '',
            type: '',
            description: '',
            relevantSkills: '',
            comapnyOffering: '',
            whatWeAreLookginFor: ''
        });  // Reset form
        setShowModal(false);  // Close modal
    };

    return (
        <div className="jobListContainer">

            <button className="addJobButton" onClick={() => setShowModal(true)}>Add Job</button>

            {jobs.length === 0 ? (
                <div className="emptyMessage">
                    No jobs available.
                </div>
            ) : (
                jobs.map(job => (
                    <div className="job" key={job.id}>
                        <h3>{job.title}</h3>
                        <p className="location">{job.location}</p>
                        <p className="jobType">{job.type}</p>
                    </div>
                ))
            )}

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
                        <div className="modealSection">
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
                                <option value="Remote">Remote</option>
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
