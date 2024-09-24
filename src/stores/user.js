// 管理用户数据
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi } from "@/apis/user";


export const useUserStore = defineStore('user', () => {
    // state
    const userInfo = ref({})
    // action
    const getUserInfo = async ({ account, password}) => {
        const res = await loginApi({ account, password})
        console.log(res);
        
        userInfo.value = res.data.result
    }
    // 退出时,清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }

    // 以对象的格式把state和action return 出去
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true
})