import React, { useState } from 'react';

function AddressForm2() {
    const [addresses, setAddresses] = useState([{ name: '', address: '', phoneNumber: '' }]);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    function handleChange(e, index, field) {
        const newAddresses = [...addresses];
        newAddresses[index][field] = e.target.value;
        setAddresses(newAddresses);
        setErrors((prevErrors) => ({ ...prevErrors, [index]: '' }));
        setTouchedFields((prevFields) => ({ ...prevFields, [`${index}-${field}`]: true }));
    }

    function addAddress() {
        setAddresses([...addresses, { name: '', address: '', phoneNumber: '' }]);
    }

    function handleBlur(index, field) {
        setTouchedFields((prevFields) => ({ ...prevFields, [`${index}-${field}`]: true }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        addresses.forEach((address, index) => {
            if (!address.name) {
                newErrors[`${index}-name`] = 'Name is required';
            }
            if (!address.address) {
                newErrors[`${index}-address`] = 'Address is required';
            }
            if (!address.phoneNumber) {
                newErrors[`${index}-phoneNumber`] = 'Phone number is required';
            }
        });
        setErrors(newErrors);

        // Check for errors
        const hasErrors = Object.keys(newErrors).length > 0;
        if (hasErrors) {
            return;
        }

        console.log(addresses);
    }

    return (
        <form onSubmit={handleSubmit}>
            {addresses.map((address, index) => (
                <div key={index}>
                    <br /><br />
                    <label htmlFor={`name-${index}`}>Name</label>
                    <input
                        type="text"
                        id={`name-${index}`}
                        value={address.name}
                        onChange={(e) => handleChange(e, index, 'name')}
                        onBlur={() => handleBlur(index, 'name')}
                    />
                    <br />
                    {touchedFields[`${index}-name`] && !address.name && <div className="error">Name is required</div>}

                    <br /><br />
                    <label htmlFor={`address-${index}`}>Address</label>
                    <input
                        type="text"
                        id={`address-${index}`}
                        value={address.address}
                        onChange={(e) => handleChange(e, index, 'address')}
                        onBlur={() => handleBlur(index, 'address')}
                    />
                    <br />
                    {touchedFields[`${index}-address`] && !address.address && <div className="error">Address is required</div>}

                    <br /><br />
                    <label htmlFor={`phone-${index}`}>Phone number</label>
                    <input
                        type="text"
                        id={`phone-${index}`}
                        value={address.phoneNumber}
                        onChange={(e) => handleChange(e, index, 'phoneNumber')}
                        onBlur={() => handleBlur(index, 'phoneNumber')}
                    />
                    <br />
                    {touchedFields[`${index}-phoneNumber`] && !address.phoneNumber && (
                        <div className="error">Phone number is required</div>
                    )}
                </div>
            ))}
            <br /><br />
            <button type="button" onClick={addAddress}>
                Add New Address
            </button>
            <button type="submit">Submit</button>
            <br /><br />
            {Object.keys(errors).map((key) => (
                <div className="error" key={key}>
                    {errors[key]}
                </div>
            ))}
        </form>
    );
}

export default AddressForm2
