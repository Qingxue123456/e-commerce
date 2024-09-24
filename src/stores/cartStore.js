// 购物车模块
import { componentPlugin } from "@/components";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    // state
    const cartList = ref([])

    // action
    const addCart = (goods)=> {
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

    // 删除购物车内商品
    const delCart = (skuId)=> {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx,1)
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
        selectedPrice
    }
}, {
    persist: true
})