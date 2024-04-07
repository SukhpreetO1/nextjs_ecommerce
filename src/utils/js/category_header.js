export const validate_category_header = (data) => {
    const errors = {};
    if (!data.name.trim()) {
        errors.name = 'Name is required';
    } else if (!/^[a-zA-Z]+$/.test(data.name)){
        errors.name = 'Name should contain only letters';
    }

    return errors;
}