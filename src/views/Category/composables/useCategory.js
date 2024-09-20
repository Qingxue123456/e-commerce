// 封装分类数据业务相关代码
import { onMounted, ref } from "vue"
import { getCategoryAPI } from "@/apis/layout"
import { onBeforeRouteUpdate } from "vue-router"
import { useRoute } from "vue-router"

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()

    const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.data.result.find(category => category.id === route.params.id)
    }

    onMounted(() => getCategory())
    onBeforeRouteUpdate((to) => getCategory(to.params.id))
    
    return {
        categoryData
    }
}