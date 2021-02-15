import React from "react";
import "../styles/PersonalInfo.css"

const PerInfoForm = (props) => {
    const { onSubmit, onChange} = props;
    const infoData = props.infoData;
    const objSection = "personalInfo";

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        const infoDataExtract = {
            id: e.target.id,
            firstName: e.target[0].value,
            lastName: e.target[1].value,
            email: e.target[2].value,
            phone: e.target[3].value,
        };

        onSubmit(e, infoDataExtract, objSection);
    }

    const handleChange = (e) => {
        onChange(objSection, e.target.value, e.target.name, e.target.parentElement.id);
    }

        // Edu form set up
        let perInfoForm = (
            <div className="container-info"> 
                <div className="info-section" style={{ display: "block"}}>
                    <form id={infoData.id} className="form-info" onSubmit={handleSubmit}>
                        <label className="labels-info">First Name: </label>
                            <input
                                onChange={handleChange}
                                value={infoData.firstName}
                                type="text"
                                className="input-form"
                                placeholder="Moredecai"
                                name="firstName"
                                required
                            ></input>
    
                        <label className="labels-info">Last Name: </label>
                            <input
                                onChange={handleChange}
                                value={infoData.lastName}
                                type="text"
                                className="input-form"
                                placeholder="Rigby"
                                name="lastName"
                                required
                            ></input>
                        
                        <label className="labels-info">Email: </label>
                            <input
                                onChange={handleChange}
                                value={infoData.email}
                                type="email"
                                className="input-form"
                                placeholder="regularshow@gmail.com"
                                name="email"
                                required
                            ></input>
    
                        <label className="labels-info">Phone: </label>
                            <input
                                onChange={handleChange}
                                value={infoData.phone}
                                type="number"
                                className="input-form"
                                name="phone"
                                placeholder="07889898989"
                                required
                            ></input>
                        
                        <button className="submit-button-info">Submit</button>
                    </form>
    
                </div>
            </div>
        );
        return (
            perInfoForm
        )
}

const PreviewInfo = (props) => {
    const infoData = props.infoData;

    return (
        <div className="main-store-info">
                    <h2> { infoData.firstName } { infoData.lastName }</h2>
                    <pre> Email:{ infoData.email }  Phone: { infoData.phone }  </pre>
        </div>
    )
}

class PersonalInfo extends React.Component {
    render() {
        const { infoData, onSubmit, onChange, isPreview } = this.props;
        let formView;

        if (isPreview === false) {
            formView = (
            <PerInfoForm
            infoData = { infoData }
            onSubmit = {onSubmit}
            onChange = {onChange}
            /> 
            );

        } else {
            formView = (
                formView = (
                    <div>
                        <PreviewInfo
                        infoData = { infoData }
                        />
                    </div>
                )
            );
        }

        return (
            <div className="div-box-main-info">
                {formView}
            </div>   
        )
    }
}


export default PersonalInfo;