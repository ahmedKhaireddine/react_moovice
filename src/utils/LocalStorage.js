
class LocalStorage {

    save(key, value){
        let storageStr =localStorage.getItem(key);
        let myList = [];
        if(storageStr !== null){
            myList = JSON.parse(storageStr);
        } 
        if(myList.includes(value) === false){
            myList.push(value);
        }
        return localStorage.setItem(key,JSON.stringify(myList)); 
    }

    get(key){
        const idMovies = JSON.parse(localStorage.getItem(key));
        return idMovies;
    }
    
    remove(key, value){
        let storageStr =localStorage.getItem(key);
        let myList = [];
        if(storageStr !== null){
            myList = JSON.parse(storageStr);
        } 
        if(myList.includes(value) === true){
            myList.splice(myList.indexOf(value), 1);
        }
        return localStorage.setItem(key,JSON.stringify(myList)); 
    }
    
}
export default new LocalStorage();