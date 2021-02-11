import React from "react";
import PersonalInfo from "../src/componenets/PersonalInfo"
import Education1 from "../src/componenets/Education1"
import Experience from "../src/componenets/Experience"
import uniqid from "uniqid";
import "../src/styles/App.css"

import {Helmet} from "react-helmet";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {

            hideEditKey: [],
            isEdit: false,

            isPreview: false,

            personalInfo: {
                id: uniqid(),
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },

            education: [{
                id: uniqid(),
                uni: "",
                location: "",
                courseName: "",
                startYear: "",
                endYear: "",
            }],

            experience: [{
                id: uniqid(),
                jobTitle: "",
                companyName: "",
                startYear: "",
                endYear: "",
                description: "",
            }]

        }
        this.state = this.initialState;

        this.addSections = this.addSections.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.editSpecific = this.editSpecific.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    // Sets up blank object data for next input values
    // Need to set it up for different sections such as switching between Education and Experience.
    addSections = (e) => {
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
                this.setState( prevState => ({
                    education: [...prevState.education, newEducation]
                }));
    
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
                this.setState( prevState => ({
                    experience: [...prevState.experience, newExperience]
                }));
    
                break;

            default:
                alert("Out of expressions")
        }
    };
    
    onSubmit = (e, formData, section) => {
        
        e.preventDefault();
        if (section === "personalInfo") {
            this.setState({
                [section]: formData
            });
        } else {
            this.setState({
                [section]: this.state[section].map(
                    obj => obj.id === e.target.id ? formData : obj
                ),
                hideEditKey: this.state.hideEditKey.concat([e.target.id]),
                isEdit: false
            })
        }
    };

    // Change the state depending on the form input
    // One logic for personalInfo and the other for experience and education
    onChange = (section, value, mainValues, id) => {
        if (section === "personalInfo") {
            this.setState(prevState => ({
                [section] : {
                    ...prevState.personalInfo,
                    [mainValues]: value
                }
            }));
        } else {
            this.setState({
                [section]: this.state[section].map(
                    obj => obj.id === id ? {...obj, [mainValues]: value} : obj
                )
            });
        }

    }

    editSpecific = (e) => {
        // Removes key which does not need editing. So only key ids are left to show the form.
        let removeIdKey = this.state.hideEditKey.filter((obj) => obj != e.target.name);
        this.setState({
            hideEditKey: removeIdKey,
            isEdit: true
        })
    };

    deleteSection = (e, section) => {
        let filterData = this.state[section].filter((prevState) => prevState.id != e.target.name);
        this.setState({
            [section]: filterData,
        })
    };

    changePreview = (e) => {
        if (e.target.textContent === "Preview CV") {
            this.setState({
                isPreview: true
            })
        } else if (e.target.textContent === "Back to Builder") {
            this.setState({
                isPreview: false
            })
        }
    };

    render() {
        // Setting up message for Preview button
        let previewMessage;
        if (this.state.isPreview) {
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
                onClick={this.changePreview}
                className="preview-btn"
                >{previewMessage}
                </button>

                <div className="line"></div>

                { this.state.isPreview ? null: <h3>Personal Information</h3>}
                <PersonalInfo 
                infoData = {this.state.personalInfo}
                onSubmit = {this.onSubmit}
                onChange = {this.onChange}
                deleteSection = {this.deleteSection}
                isPreview = {this.state.isPreview}
                />

                <div className="line"></div>

                <Education1 
                educationData = {this.state.education}
                onSubmit = {this.onSubmit}
                onChange = {this.onChange}
                hideEditKey = {this.state.hideEditKey}
                editSpecific = {this.editSpecific}
                isEdit = {this.state.isEdit}
                deleteSection = {this.deleteSection}
                isPreview = {this.state.isPreview}
                />
                {/* Hides Add button if isPreview is True */}
                { this.state.isPreview ? null: <button className="edu"
                onClick={this.addSections}>+ Education</button>}

                <div className="line"></div>

                <Experience 
                experienceData = {this.state.experience}
                onSubmit = {this.onSubmit}
                onChange = {this.onChange}
                hideEditKey = {this.state.hideEditKey}
                editSpecific = {this.editSpecific}
                isEdit = {this.state.isEdit}
                deleteSection = {this.deleteSection}
                isPreview = {this.state.isPreview}
                />
                {/* Hides Add button if isPreview is True */}
                { this.state.isPreview ? null: <button className="exp"
                onClick={this.addSections}>+ Experience</button>}
            </div>
        )
    }
}

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
