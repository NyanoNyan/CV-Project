/* eslint-disable no-trailing-spaces */
import React from "react";
import Education from "../src/componenets/Education1"
import uniqid from "uniqid";

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            isEdit: false,
            education: [{
                id: uniqid(),
                uni: "",
                location: "",
                courseName: "",
                startYear: "",
                endYear: "",
            }],
        };
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = () => {
        return (
            <Education />
        )
    }

    addSection = (e) => {
        // this.setState((eachItem) => {
        //     const newEducation = {
        //         id: uniqid(),
        //         uni: "",
        //         location: "",
        //         courseName: "",
        //         startYear: "",
        //         endYear: "",
        //     };
        //     const education = [...this.state.education, newEducation];
        //     return {
        //         education
        //     };
        // })
        console.log("in add section")
        console.log(e.target.className);
        const newEducation = {
                id: uniqid(),
                uni: "",
                location: "",
                courseName: "",
                startYear: "",
                endYear: "",
        }

        this.setState( prevState => ({
            education: [...prevState.education, newEducation]
        }));

        console.log(this.state)
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);

    }

    render() {

        return (
            <div>
                <Education 
                educationData = {this.state.education}
                onSubmit = {this.onSubmit}
                />
                <button className="edu"
                onClick={this.addSection}>Add</button>
                {console.log("I'm here")}
            </div>
        );
    }
}

export default App;

// Set up click count to add more forms
// Set up addSection to set up data format to feed in form, so one can get the data and store it
// accordingly.

