import React from "react";
import "../styles/Experience.css"

const ExpForm = (props) => {
    const { onSubmit, onChange, hideEditKey, editSpecific, deleteSection} = props;
    const eachExperience = props.experienceData;
    const objSection = "experience";
    let mainDisplay;
    let btnDisplay;

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        const eduDataExtract = {
            id: e.target.id,
            jobTitle: e.target[0].value,
            companyName: e.target[1].value,
            startYear: e.target[2].value,
            endYear: e.target[3].value,
            description: e.target[4].value,
        };

        onSubmit(e, eduDataExtract, objSection);
    }

    const handleChange = (e) => {
        onChange(objSection, e.target.value, e.target.name, e.target.parentElement.id);
    }

    // Logic for hiding and unhiding
    if (hideEditKey.includes(eachExperience.id) === true ) {
        mainDisplay = "none";
        btnDisplay = "block";
    } else {
        mainDisplay = "block";
        btnDisplay = "none";
    }

    // Exp form set up
    let expForm = (
        <div className="container-exp"> 
            <div id="experience-section" style={{ display: mainDisplay}}>
                <form id={eachExperience.id} className="form-edu" onSubmit={handleSubmit}>
                    <label className="labels-exp">Job Ttile: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.jobTitle}
                            type="text"
                            className="input-form"
                            placeholder="Software Engineer"
                            name="jobTitle"
                            required
                        ></input>

                    <label className="labels-exp">Company Name: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.companyName}
                            type="text"
                            className="input-form"
                            placeholder="Google"
                            name="companyName"
                            required
                        ></input>
                    
                    <label className="labels-exp">Start Year: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.startYear}
                            type="number"
                            className="input-form"
                            name="startYear"
                            placeholder="2018"
                            required
                        ></input>

                    <label className="labels-exp">End Date: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.endYear}
                            type="number"
                            className="input-form"
                            name="endYear"
                            placeholder="2020"
                            required
                        ></input>

                    <label className="labels-exp">Role Description: </label>
                        <textarea
                            onChange={handleChange}
                            value={eachExperience.description}
                            className="input-form"
                            name="description"
                            rows="10"
                            cols="70"
                        ></textarea>
                    
                    <button className="submit-button">Submit</button>

                    <button 
                        className="delete-button"
                        onClick = {(e) => {deleteSection(e, objSection)}}
                        name={eachExperience.id}
                        >Delete
                    </button>
                </form>

            </div>

            <div 
                className="edit-edu" 
                style={{ display: btnDisplay}}
                onClick={(e) => {editSpecific(e)}}
                >
                <button name={eachExperience.id}>{eachExperience.jobTitle}</button>
            </div>

        </div>
    );
    return (
        expForm
    )
}

const PreviewExp = (props) => {
    const experienceData = props.experienceData;

    return (
        <div className="main-store-exp">
            <pre className="heading-company-name">{ experienceData.companyName }</pre>
            <div className="textbox-title-date">
                <pre>{experienceData.jobTitle}</pre>
                <pre>{experienceData.endYear}</pre>
                <pre>{experienceData.startYear}</pre>
            </div>
            <pre className="work-description">{experienceData.description}</pre>

        </div>
    )
}

 class Experience extends React.Component {
     render() {
        const { experienceData, onSubmit, onChange, hideEditKey,
            editSpecific, isEdit, deleteSection, isPreview } = this.props;
        let formView;

        if (isPreview === false) {
            formView = experienceData.map((eachExperience, index) => (
            <ExpForm key={"exp"+index}
            experienceData = { eachExperience }
            onSubmit = {onSubmit}
            onChange = {onChange}
            hideEditKey = {hideEditKey}
            editSpecific = {editSpecific}
            isEdit =  {isEdit}
            deleteSection = {deleteSection}
            /> 
            ));

        } else {
            formView = experienceData.map((eachExperience, index) => (
                formView = (
                    <div key={"exp"+index}>
                        <PreviewExp
                        experienceData = { eachExperience }
                        />
                    </div>
                )
            ))
        }
        
         return(
             <div>
                <h3>Experience</h3>
                {formView}
             </div>
         )
     }
 }

 export default Experience

 // Test Exerpeince. Input
 // Then make Preview for Expereince