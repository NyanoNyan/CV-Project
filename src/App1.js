import React, { useState, useEffect } from "react";
import PersonalInfo from "../src/componenets/PersonalInfo"
import Education1 from "../src/componenets/Education1"
import Experience from "../src/componenets/Experience"
import uniqid from "uniqid";
import "../src/styles/App.css"

import {Helmet} from "react-helmet";

const App = () => {
    const [hideEditKey, setHideEditKey] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        id: uniqid(),
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });
    const [education, setEducation] = useState([{
            id: uniqid(),
            uni: "",
            location: "",
            courseName: "",
            startYear: "",
            endYear: "",
        }]);
    const [experience, setExperience] = useState([{
            id: uniqid(),
            jobTitle: "",
            companyName: "",
            startYear: "",
            endYear: "",
            description: "",
        }]);

    // Sets up blank object data for next input values
    // Need to set it up for different sections such as switching between Education and Experience.
    const addSections = (e) => {
        let type = e.target.className;
        switch(type) {
            case "edu":
                const newEducation = {
                    id: uniqid(),
                    uni: "",
                    location: "",
                    courseName: "",
                    startYear: "",
                    endYear: "",
                };
                setEducation([...education, newEducation]);
    
                break;
            
            case "exp":
                const newExperience = {
                    id: uniqid(),
                    jobTitle: "",
                    companyName: "",
                    startYear: "",
                    endYear: "",
                    description: "",
                };
                setExperience([...experience, newExperience]);
    
                break;

            default:
                alert("Out of expressions")
        }
    };
    
    const onSubmit = (e, formData, section) => {
        e.preventDefault();
        let holdFuncs = [setEducation, setExperience];
        let holdVals = [education, experience];

        if (section === "personalInfo") {
            setPersonalInfo(formData);
        } else {

            if (section ==="education") {
                holdFuncs = holdFuncs[0];
                holdVals = holdVals[0];
            } else if (section === "experience") {
                holdFuncs = holdFuncs[1];
                holdVals = holdVals[1];
            }
            holdFuncs(
                holdVals.map(
                    obj => obj.id === e.target.id ? formData : obj
                )
            )
            setHideEditKey(hideEditKey.concat([e.target.id]));
            setIsEdit(false);
        }
    };

    // Change the state depending on the form input
    // One logic for personalInfo and the other for experience and education
    const onChange = (section, value, mainValues, id) => {
        let holdFuncs = [setEducation, setExperience];
        let holdVals = [education, experience];

        if (section === "personalInfo") {
            setPersonalInfo({...personalInfo, [mainValues]: value});
        } else {

            if (section ==="education") {
                holdFuncs = holdFuncs[0];
                holdVals = holdVals[0];
            } else if (section === "experience") {
                holdFuncs = holdFuncs[1];
                holdVals = holdVals[1];
            }
            holdFuncs(holdVals.map(
                obj => obj.id === id ? {...obj, [mainValues]: value} : obj));
            }

    }

    const editSpecific = (e) => {
        // Removes key which does not need editing. So only key ids are left to show the form.
        let removeIdKey = hideEditKey.filter((obj) => obj != e.target.name);
        setHideEditKey(removeIdKey);
        setIsEdit(true);
    };

    const deleteSection = (e, section) => {
        let tempHolder, tempFuncs;
        let sectionsVals = [personalInfo, education, experience];
        let sectionFuncs = [setPersonalInfo, setEducation, setExperience];
        if (section === "personalInfo") {
            tempHolder = sectionsVals[0];
            tempFuncs = sectionFuncs[0];
        } else if (section === "education") {
            tempHolder = sectionsVals[1];
            tempFuncs = sectionFuncs[1];
        } else if (section === "experience") {
            tempHolder = sectionsVals[2];
            tempFuncs = sectionFuncs[2];
        }

        let filterData = tempHolder.filter((prevState) => prevState.id != e.target.name);
        tempFuncs(filterData)
    };

    const changePreview = (e) => {
        if (e.target.textContent === "Preview CV") {
            setIsPreview(true)
        } else if (e.target.textContent === "Back to Builder") {
            setIsPreview(false)
        }
    };
        // Setting up message for Preview button
        let previewMessage;
        if (isPreview) {
            previewMessage = "Back to Builder"
        } else {
            previewMessage = "Preview CV"
        }

        return (
            <div className="main-holder">
                <Helmet>
                    <meta name="viewport" content="width=device-width,initial-scale=1"/>
                </Helmet>
                <h2>CV Builder</h2>
                <button
                onClick={changePreview}
                className="preview-btn"
                >{previewMessage}
                </button>

                <div className="line"></div>

                { isPreview ? null: <h3>Personal Information</h3>}
                <PersonalInfo 
                infoData = {personalInfo}
                onSubmit = {onSubmit}
                onChange = {onChange}
                deleteSection = {deleteSection}
                isPreview = {isPreview}
                />

                <div className="line"></div>

                <Education1 
                educationData = {education}
                onSubmit = {onSubmit}
                onChange = {onChange}
                hideEditKey = {hideEditKey}
                editSpecific = {editSpecific}
                isEdit = {isEdit}
                deleteSection = {deleteSection}
                isPreview = {isPreview}
                />
                {/* Hides Add button if isPreview is True */}
                { isPreview ? null: <button className="edu"
                onClick={addSections}>+ Education</button>}

                <Experience 
                experienceData = {experience}
                onSubmit = {onSubmit}
                onChange = {onChange}
                hideEditKey = {hideEditKey}
                editSpecific = {editSpecific}
                isEdit = {isEdit}
                deleteSection = {deleteSection}
                isPreview = {isPreview}
                />
                {/* Hides Add button if isPreview is True */}
                { isPreview ? null: <button className="exp"
                onClick={addSections}>+ Experience</button>}
            </div>
        )
    
};

export default App;

// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

// old code
//         
// This gets the index of the object if the ids of state data and form data match
// let getIndex = this.state.education.map((obj, index) => {
//     if (obj.id === e.target.id) {
//         return index;
//     }
// })
// console.log(getIndex[0]);

// Testing, issue with size box differing when changing between preview
