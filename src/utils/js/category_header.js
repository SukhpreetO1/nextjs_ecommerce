export const validate_category_header = (data) => {
    const errors = {};
    if (!data.category_header_name.trim()) {
        errors.category_header_name = 'Name is required';
    } else if (!/^[a-zA-Z]+$/.test(data.category_header_name)){
        errors.category_header_name = 'Name should contain only letters';
    }

    return errors;
}