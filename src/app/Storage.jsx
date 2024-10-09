const Storage = {
    save : (key, array) => {
        localStorage.setItem(key, JSON.stringify(array));
    },

    load : (key) => {
        const storedArray = localStorage.getItem(key);
        return storedArray ? JSON.parse(storedArray) : [];
    }
}
export default Storage;