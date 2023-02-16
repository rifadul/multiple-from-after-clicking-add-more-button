import React, { useState } from 'react';

function AddressForm4() {
    const [addresses, setAddresses] = useState([{ name: '', address: '', phoneNumber: '' }]);
    const [formErrors, setFormErrors] = useState({});

    function handleChange(e, index, field) {
        const newAddresses = [...addresses];
        newAddresses[index][field] = e.target.value;
        setAddresses(newAddresses);

        // Remove error message when user types something in the field
        const newErrors = { ...formErrors };
        delete newErrors[`${index}-${field}`];
        setFormErrors(newErrors);
    }

    function addAddress() {
        setAddresses([...addresses, { name: '', address: '', phoneNumber: '' }]);
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
        setFormErrors(newErrors);

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
                    />
                    <br />
                    {formErrors[`${index}-name`] && <div className="error">{formErrors[`${index}-name`]}</div>}

                    <br /><br />
                    <label htmlFor={`address-${index}`}>Address</label>
                    <input
                        type="text"
                        id={`address-${index}`}
                        value={address.address}
                        onChange={(e) => handleChange(e, index, 'address')}
                    />
                    <br />
                    {formErrors[`${index}-address`] && <div className="error">{formErrors[`${index}-address`]}</div>}

                    <br /><br />
                    <label htmlFor={`phone-${index}`}>Phone number</label>
                    <input
                        type="text"
                        id={`phone-${index}`}
                        value={address.phoneNumber}
                        onChange={(e) => handleChange(e, index, 'phoneNumber')}
                    />
                    <br />
                    {formErrors[`${index}-phoneNumber`] && (
                        <div className="error">{formErrors[`${index}-phoneNumber`]}</div>
                    )}
                </div>
            ))}

            <br /><br />
            <button type="button" onClick={addAddress}>
                Add New Address
            </button>
            <button type="submit">Submit</button>
            {Object.keys(formErrors).length > 0 && (
                <div className="error">Please fill out all required fields.</div>
            )}
        </form>
    );
}

export default AddressForm4;
