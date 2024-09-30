import React, { useState } from 'react'
import './Mytestdata.css'


const Mytestdata = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [segmentName, setSegmentName] = useState('');
    const [schema, setSchema] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState('');


    // Schema options
    const schemaOptions = ['first_name', 'last_name', 'gender', 'age', 'accountname', 'city', 'state', 'segment_name'];

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleAddSchema = () => {
        if (selectedSchema && !schema.includes(selectedSchema)) {
            setSchema([...schema, selectedSchema]);
            setSelectedSchema(''); // Reset dropdown
        }
    };

    // Api calling and sending the data to the backend
    const handleSaveSegment = () => {
        const payload = {
            segment_name: segmentName,
            schema: schema.map(item => ({ [item]: item.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) }))
        };

        console.log('Payload:', payload);

        //API endpoint
        fetch('https://webhook.site/api/save-segment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => console.log('Segment saved:', data))
            .catch(error => console.error('Error saving segment:', error));
    };

    return (

        <div className='segment-popup'>
            <div className='toolbar'>
                <h3> &lt; &nbsp;&nbsp;<span> View Audience </span></h3>
            </div>

            <div className='saveSegmentPopup'>
                <button className='save-segmentBtn' onClick={toggleModal}> Save Segment </button>
            </div>


            {/* Popup code starts here */}
            {isOpen && (
                <div className='popup-overlay'>
                    <div className='popup-content'>

                        <div className='popup-toolbar'>
                            <div className='popupheading'>
                                <h3>
                                    <button className='backbtn' onClick={toggleModal}> &lt; </button>
                                    &nbsp;&nbsp;<span> Saving Segment </span>
                                </h3>
                            </div>
                        </div>

                        <div className='popup-header-content'>
                            <div className="popup-body">

                                <h2> Enter the Name of the Segment </h2>
                                <input type="text"
                                    placeholder="Name of the segment"
                                    value={segmentName}
                                    onChange={(e) => setSegmentName(e.target.value)}
                                />

                                <p>To save your segment, you need to add the schemas to build the query.</p>

                                <div className="traits-container">
                                    <div className="user-traits-dot"></div>
                                    <span> - User Traits</span>
                                    <div className="group-traits-dot"></div>
                                    <span> - Group Traits</span>
                                </div>
                                <br />
                                <br />
                                <br />
                                <div className="blue-box">

                                    {schema.map((item, index) => (
                                        <div key={index} className="schema-item">
                                            <div className="user-traits-dot"></div>
                                            &nbsp;&nbsp;
                                            <select
                                                value={item}
                                                onChange={(e) => {
                                                    const newSchema = [...schema];
                                                    newSchema[index] = e.target.value;
                                                    setSchema(newSchema);
                                                }}
                                            >
                                                {schemaOptions.map(option => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className="remove-schema-btn" onClick={() => {
                                                const updatedSchema = schema.filter((_, i) => i !== index);
                                                setSchema(updatedSchema);
                                            }}>-</button>
                                        </div>
                                    ))}
                                </div>

                                <div className="dropdown-container">
                                    <select
                                        value={selectedSchema}
                                        onChange={(e) => setSelectedSchema(e.target.value)}
                                        className="full-width-dropdown"
                                    >
                                        <option value="">Add schema to segment</option>
                                        {schemaOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <br />
                                    <p className='add-schema-link'>+ <a href="#!" className='add-schema-link' onClick={handleAddSchema}>Add new schema</a></p>
                                </div>
                            </div>
                        </div>

                        {/* <div className='hiddenspace'></div> */}
                        {/* Footer  */}

                        {/* <div className='footer-data-content'> */}
                        <div className="modal-footer">
                            <button className="save-btn" onClick={handleSaveSegment}>
                                Save Segment
                            </button>
                            <button className="cancel-btn" onClick={toggleModal}>Cancel</button>
                        </div>
                        {/* </div> */}
                    </div>

                </div>
            )}
        </div>
    )
}

export default Mytestdata;