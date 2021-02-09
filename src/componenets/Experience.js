import React from "react";

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
                <form id={eachExperience.id} onSubmit={handleSubmit}>
                    <label className="labels">Job Ttile: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.jobTitle}
                            type="text"
                            className="jobTitle-form"
                            placeholder="Software Engineer"
                            name="jobTitle"
                            required
                        ></input>

                    <label className="labels">Company Name: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.companyName}
                            type="text"
                            className="companyName-form"
                            placeholder="Google"
                            name="companyName"
                            required
                        ></input>
                    
                    <label className="labels">Start Year: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.startYear}
                            type="text"
                            type="text"
                            className="startDate-form"
                            name="startYear"
                            required
                        ></input>

                    <label className="labels">End Date: </label>
                        <input
                            onChange={handleChange}
                            value={eachExperience.endYear}
                            type="date"
                            className="endDate-form"
                            name="endDate"
                            placeholder="2020"
                            required
                        ></input>

                    <label className="labels">Role Description: </label>
                        <textarea
                            onChange={handleChange}
                            value={eachExperience.description}
                            className="description-form"
                            name="description"
                            rows="5"
                            cols="85"
                        ></textarea>
                    
                    <button className="submit-button">Submit</button>

                    <button 
                        className="delete-button"
                        onClick = {(e) => {deleteSection(e)}}
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
                <button name={eachExperience.id}>{eachExperience.uni}</button>
            </div>

        </div>
    );
    return (
        expForm
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
            <div>Testing</div>
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