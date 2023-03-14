import AsyncStorage from '@react-native-async-storage/async-storage';

async function setJwtToken(token: string): Promise<void> {
   return new Promise((resolve, reject) => {
        AsyncStorage.setItem('@authToken', token, (err) => {
            if(err) {
                reject(err)
            }

            resolve()
        })
   })
}

async function getJwtToken(): Promise<string> {
   return new Promise((resolve, reject) => {
        AsyncStorage.getItem('@authToken', (err, result) => {
            if(err) {
                reject(err)
            }
            resolve(result)
        })
   })
}

function deleteJwtToken(): Promise<void> {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem('@authToken', (err) => {
            if(err) {
                reject(err)
            }

            resolve()
        })
    })
}

export {
    setJwtToken,
    getJwtToken,
    deleteJwtToken
}