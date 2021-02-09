import React, { Component } from "react";

const EduForm = (props) => {
    
    console.log('Testing')
    console.log(props);
    const { id, uni, location} = props.educationData;
    const onSubmit = props.onSubmit;

    function handleSubmit(e) {
        e.preventDefault();
        console.log(id);
        onSubmit(e);
    }

    let test = props.educationData.map((education) => (
        <div id="education-section">
            <form  onSubmit={handleSubmit}>
                <label>Uni: </label>
                <input type="text"></input>

                <label>Location: </label>
                <input type="text"></input>
                <button id={education.id}>Submit</button>
            </form>
    </div>
    ))

    console.log(test)
    
    return (
       test
    )
}


class Education extends React.Component {

    render() {
        console.log(this.props);
        const { educationData, onSubmit } = this.props;
        return (
            <div>
                <EduForm 
                educationData={educationData}
                onSubmit = {onSubmit}
                />    
            </div>

            
        )
    }
}

export default Education;

// Key id stored in button of submit
// How to store key properly.