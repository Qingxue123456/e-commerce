// 封装所有和用户相关的接口函数
import httpInstance from "@/utils/http"

export function loginApi({ account, password }) {
    return httpInstance({
        url: '/login',
        method: 'POST',
        data:{
            account,
            password
        }
    })
}

// 用户中心的 “猜你喜欢” - 当前要拉过来4个数据
export const getLikeListAPI = ({ limit = 4 }) => {
    return httpInstance({
      url:'/goods/relevant',
      params: {
        limit 
      }
    })
  }