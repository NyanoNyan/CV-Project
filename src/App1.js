import React from "react";
import Education1 from "../src/componenets/Education1"
import Experience from "../src/componenets/Experience"
import uniqid from "uniqid";
import "../src/styles/App.css"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {

            hideEditKey: [],
            isEdit: false,

            isPreview: false,

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
        // Need to set up for different key in terms of education or work experience
        this.setState({
            [section]: this.state[section].map(
                obj => obj.id === e.target.id ? formData : obj
            ),
            hideEditKey: this.state.hideEditKey.concat([e.target.id]),
            isEdit: false
        })
        console.log(this.state)
    };

    onChange = (section, value, mainValues, id) => {
        // Change the state depending on the form input
        this.setState({
            [section]: this.state[section].map(
                obj => obj.id === id ? {...obj, [mainValues]: value} : obj
            )
        })
    }

    editSpecific = (e) => {
        // Removes key which does not need editing. So only key ids are left to show the form.
        let removeIdKey = this.state.hideEditKey.filter((obj) => obj != e.target.name);
        this.setState({
            hideEditKey: removeIdKey,
            isEdit: true
        })
    };

    deleteSection = (e) => {
        let filterData = this.state.education.filter((prevState) => prevState.id != e.target.name);
        this.setState({
            education: filterData,
        })
    };

    changePreview = (e) => {
        console.log(e.target.textContent);
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
            <div>
                <button
                onClick={this.changePreview}
                >{previewMessage}
                </button>

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

