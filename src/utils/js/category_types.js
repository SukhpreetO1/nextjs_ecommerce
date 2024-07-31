export const validate_category_types = (data) => {
    const errors = {};
    if (!data.name.trim()) {
        errors.name = 'Name is required';
    } else if (!/^[a-zA-Z& ]+$/.test(data.name)){
        errors.name = 'Name should contain only letters';
    }

    if (data.category_heading_id === '') {
        errors.category_heading_id = 'Select one category header name';
    }

    return errors;
}