export function createFormData(data: {[key: string]: any}) {
    let form_data = new FormData();
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object') {
            const files = data[key];
            for (let i = 0; i < files.length; i++) {
                form_data.append('uploaded_images', files[i])
            }
        } else {
            form_data.append(key, data[key])
        }
    })
    return form_data
};
