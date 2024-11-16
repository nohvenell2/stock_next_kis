FAVORITE_KEY = 'stockFavorite'
if (!'stockFavorite' in localStorage){
    localStorage.setItem(FAVORITE_KEY,JSON.stringify([]))
}
function loadFavoriteFromLocalStorage(key = FAVORITE_KEY){
    try{
        const data_raw = localStorage.getItem(key)
        const data = JSON.parse(data_raw)
        return data
    } catch(e){
        console.error('로컬스토리지 로드 중 에러 발생:',error)
        return null
    }
}
function saveFavoiteToLocalStorate(value, key = FAVORITE_KEY){
    try{
        const data = loadFavoriteFromLocalStorage()
        data.push(value)
        localStorage.setItem(key,JSON.stringify(data))
        return data
    } catch(e){
        console.error('로컬스토리지 저장 중 에러 발생:',error)
        return null
    }
}
function removeFavoriteFromLocalStorage(value, key = FAVORITE_KEY){
    try{
        const data = loadFavoriteFromLocalStorage()
        const new_data = data.filter((v,i,a) => v != value)
        localStorage.setItem(key,JSON.stringify(new_data))
        return new_data
    } catch(e){
        console.error('로컬스토리지 삭제 중 에러 발생:',error)
        return null
    }
}
function clearLocalStorage(){
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('로컬스토리지 초기화 중 에러 발생:', error);
        return false;
    }
}