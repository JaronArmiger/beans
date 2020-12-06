export const validateAddress = (address) => {
  const errors = [];
  if (!address.firstName) {
    errors.push('First name is required')
  } else {
    if (address.firstName.length > 30) {
      errors.push('First name must be under 30 chars')
    }
  }
  if (!address.lastName) {
    errors.push('Last name is required')
  } else {
    if (address.lastName.length > 30) {
      errors.push('Last name must be under 30 chars')
    }
  }
  if (!address.streetAddress) {
    errors.push('Street Address is required')
  } else {
    if (address.streetAddress.length > 30) {
      errors.push('Street Address must be under 50 chars')
    }
  }
  if (address.apartment && address.apartment.length > 50) {
    errors.push('Apartment, suite, etc. must be under 50 chars')
  }
  if (!address.city) {
    errors.push('City is required')
  }
  if (!address.state) {
    errors.push('State is required')
  }
  if (!address.zip) {
    errors.push('Zip / Postal Code is required')
  } else {
    if (address.zip.length > 5) {
      errors.push('Zip Code must be 5 digits')
    }
  }
  if (!address.phoneNumber) {
    errors.push('Phone Number is required')
  }

  return errors;
};