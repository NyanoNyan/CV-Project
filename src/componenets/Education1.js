import React from "react";
import "../styles/Education.css"

const EduForm = (props) => {
    const { onSubmit, onChange, hideEditKey, editSpecific, deleteSection} = props;
    const eachEducation = props.educationData;
    const objSection = "education";
    let mainDisplay;
    let btnDisplay;

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        const eduDataExtract = {
            id: e.target.id,
            uni: e.target[0].value,
            location: e.target[1].value,
            courseName: e.target[2].value,
            startYear: e.target[3].value,
            endYear: e.target[4].value,
        };

        onSubmit(e, eduDataExtract, objSection);
    }

    const handleChange = (e) => {
        onChange(objSection, e.target.value, e.target.name, e.target.parentElement.id);
    }

    // Logic for hiding and unhiding
    if (hideEditKey.includes(eachEducation.id) === true ) {
        mainDisplay = "none";
        btnDisplay = "block";
    } else {
        mainDisplay = "block";
        btnDisplay = "none";
    }

    // Edu form set up
    let eduForm = (
        <div className="container-edu"> 
            <div id="education-section" style={{ display: mainDisplay}}>
                <form id={eachEducation.id} onSubmit={handleSubmit}>
                    <label className="labels">University name: </label>
                        <input
                            onChange={handleChange}
                            value={eachEducation.uni}
                            type="text"
                            className="input-form"
                            placeholder="GG University"
                            name="uni"
                            required
                        ></input>

                    <label className="labels">University location: </label>
                        <input
                            onChange={handleChange}
                            value={eachEducation.location}
                            type="text"
                            className="input-form"
                            placeholder="London, UK"
                            name="location"
                            required
                        ></input>
                    
                    <label className="labels">Course Name: </label>
                        <input
                            onChange={handleChange}
                            value={eachEducation.courseName}
                            type="text"
                            className="input-form"
                            placeholder="BSc in Game Theory"
                            name="courseName"
                            required
                        ></input>

                    <label className="labels">Course start year: </label>
                        <input
                            onChange={handleChange}
                            value={eachEducation.startYear}
                            type="number"
                            className="input-form"
                            name="startYear"
                            placeholder="2020"
                            required
                        ></input>

                    <label className="labels">Course end year: </label>
                        <input
                            onChange={handleChange}
                            value={eachEducation.endYear}
                            type="number"
                            className="input-form"
                            name="endYear"
                            placeholder="2022"
                            required
                        ></input>
                    
                    <button className="submit-button">Submit</button>

                    <button 
                        className="delete-button"
                        onClick = {(e) => {deleteSection(e)}}
                        name={eachEducation.id}
                        >Delete
                    </button>
                </form>

            </div>

            <div 
                className="edit-edu" 
                style={{ display: btnDisplay}}
                onClick={(e) => {editSpecific(e)}}
                >
                <button name={eachEducation.id}>{eachEducation.uni}</button>
            </div>

        </div>
    );
    return (
        eduForm
    )
}

const PreviewEdu = (props) => {
    const educationData = props.educationData;

    return (
        <div className="main-store-edu">
            <div className="textbox-uni-and-location">
                <pre>{educationData.uni}</pre>
                <pre>{educationData.location}</pre>
            </div>

            <div className="textbox-course-dates">
                <pre>{educationData.courseName}</pre>
                <pre>{educationData.startYear}</pre>
                <pre>{educationData.endYear}</pre>
            </div>

        </div>
    )
}

class Education extends React.Component {
    render() {
        const { educationData, onSubmit, onChange, hideEditKey,
            editSpecific, isEdit, deleteSection, isPreview } = this.props;
        let formView;

        if (isPreview === false) {
            formView = educationData.map((eachEducation, index) => (
            <EduForm key={"edu"+index}
            educationData = { eachEducation }
            onSubmit = {onSubmit}
            onChange = {onChange}
            hideEditKey = {hideEditKey}
            editSpecific = {editSpecific}
            isEdit =  {isEdit}
            deleteSection = {deleteSection}
            /> 
            ));

        } else {
            formView = educationData.map((eachEducation, index) => (
                formView = (
                    <div key={"edu"+index}>
                        <PreviewEdu
                        educationData = { eachEducation }
                        />
                    </div>
                )
            ))
        }

        return (
            <div>
                <h3>Education</h3>
                {formView}
            </div>   
        )
    }
}



export default Education;

// On change how to set that up to update the upper state in App.js
// Need to look into onchange and rendering inside Education section.
// Test make a state in Education, send that prop to App1 to change main state there.

// Issue when you try to hide only that specific type of form, when adding for forms
// How to only specify that particular form ? Use of id?
// Add the delete button

// Set up Preview with education data
// Need to take out Add button in preview section


// Old Code

    // Logic for hiding and unhiding
    // if (hideEditKey === eachEducation.id && hideEditKey != "" && isEdit === false) {
    //     mainDisplay = "none";
    //     btnDisplay = "block";
    // } else if (isEdit === true && editSpecific === eachEducation.id && editSpecific != ""){
    //     mainDisplay = "block";
    //     btnDisplay = "none";
    // } else {
    //     mainDisplay = "block";
    //     btnDisplay = "none";
    // }