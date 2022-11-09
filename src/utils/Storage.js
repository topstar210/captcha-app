const Storage = {
    get: (item) => {
        return localStorage.getItem(item)
    },
    set: (item, val)=>{
        return localStorage.setItem(item, val);
    }
}

export default Storage;