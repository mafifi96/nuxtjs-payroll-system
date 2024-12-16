import '~~/store/store'
const {
    api
} = useAppConfig()
const {token} = useStore()

export const useGet = async (url) => {
    return await $fetch(`${api}${url}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}