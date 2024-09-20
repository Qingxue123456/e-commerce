import httpInstance from "@/utils/http";

// 一级分类
export function getCategoryAPI(id) {
    return httpInstance({
        url: '/category',
        params: {
            id
        }
    })
}

// 二级分类
export function getCategoryFilterAPI(id) {
    return httpInstance({
        url: '/category/sub/filter',
        params:{
            id
        }
    })
}

// 获取二级分类中不同选择的数据（最新商品、做高人气、讨论最多）
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 */
export function getSubCategoryAPI(data) {
    return httpInstance({
        url: '/category/goods/temporary',
        method: 'POST',
        data
    })
}