import {
    useStore
} from '~/store/store'

const {
    api
} = useAppConfig()
const token = useStore().token

export const useGetAsync =  (key,url) => {
    return  useAsyncData(key , 
     () =>  $fetch(`${api}${url}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            
        }))
}
