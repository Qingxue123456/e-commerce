import { getCategoryAPI } from "@/apis/layout";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore('category', () => {
    // 导航列表的数据管理
    // state
    const categoryList = ref([])

    // action
    const getCategory = async () => {
        try {
            const res = await getCategoryAPI()
            categoryList.value = res.data.result 
        } catch (error) {
            console.error('Fail to fetch category:', error)
        }

    }

    return {
        categoryList,
        getCategory
    }
})