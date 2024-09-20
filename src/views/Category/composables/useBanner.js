// 封装banner轮播图相关的业务代码

import { ref } from "vue"
import { getBannerAPI } from "@/apis/home"
import { onMounted } from "vue"

export function useBanner() {
    const bannerList = ref([])

    const getBanner = async () => {
        try {
            const res = await getBannerAPI({
            distributionSite: '2'
            })
            bannerList.value = res.data.result
        } catch (error) {
            console.error('Fail to fetch category:', error)
        }

    }

    onMounted(() => getBanner())

    return {
        bannerList
    }
}