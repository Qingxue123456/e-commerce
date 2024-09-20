// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install (app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el: 指令绑定的真实DOM元素 img
                // binding：指令 “=” 后绑定的表达式的值 图片url
                const { stop } = useIntersectionObserver(
                  el,
                  ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                      // 进入视图区域
                      el.src = binding.value
                      stop()
                    }
                },
              )
            }
        })
    }
}