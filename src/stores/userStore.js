// 管理用户数据
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
    // state
    const userInfo = ref({})
    const cartStore = useCartStore()

    // action
    const getUserInfo = async ({ account, password}) => {
        const res = await loginApi({ account, password})
        userInfo.value = res.data.result
        // 合并购物车
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))

        // 调用更新购物车接口
        cartStore.updateNewList()
    }
    // 退出时,清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 清除购物车
        cartStore.clearCart()
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