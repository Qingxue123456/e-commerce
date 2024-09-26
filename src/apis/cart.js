// 购物车相关接口
import httpInstance from "@/utils/http";

// 加入购物车
export function insertCartAPI({skuId, count}) {
    return httpInstance({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

// 获取最新的购物车列表
export function findNewCartListAPI() {
    return httpInstance({
        url: '/member/cart'
    })
}

// 删除购物车, ids是由skuId组成的数组
export function delCartApi(ids) {
    return httpInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

// 合并购物车
export function mergeCartAPI(data) {
    return httpInstance({
        url: '/member/cart/merge',
        method: 'POST',
        data: {
            data
        }
    })
}