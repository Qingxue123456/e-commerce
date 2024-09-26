// 购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI } from "@/apis/cart";
import { findNewCartListAPI } from "@/apis/cart";
import { delCartApi } from "@/apis/cart";


export const useCartStore = defineStore('cart', () => {
    // state
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // action
    // 获取最新购物车列表
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.data.result
    }

    // 添加商品
    const addCart = async (goods)=> {
        const { skuId, count } = goods
        // 登录后的加入购物车逻辑
        if (isLogin.value){
            await insertCartAPI({ skuId, count })
            // 调用接口，获取购物车列表
            updateNewList()
        } else {
        // 添加购物车操作
        // 已添加过   count + 1
        // 没有添加过   直接push
        const item = cartList.value.find((item) => goods.skuId === item.skuId )
        if (item) {
            // 已添加过
            item.count = item.count + goods.count
        } else {
            cartList.value.push(goods)
        }
        }
    }

    // 删除购物车内商品
    const delCart = async (skuId)=> {
        if (isLogin.value) {
            // 调用接口，实现接口购物车的删除功能
            await delCartApi([skuId])
            // 调用接口，获取购物车列表
            updateNewList()
        } else {
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx,1)
        }
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => skuId === item.skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        // 将cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }

    // 清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    // 计算属性
    // 总数量
    const allCount = computed(() => cartList.value.reduce((a,c) => a + c.count ,0))

    // 总价
    const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count * c.price, 0))

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    
    // 已选择数量， cartList中所有selected字段为true的count之和
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

    // 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
}, {
    persist: true
})