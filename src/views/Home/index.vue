<script setup>
  import HomeCategory from './components/HomeCategory.vue'
  import HomeBanner from './components/HomeBanner.vue'
  import HomeNew from './components/HomeNew.vue'
  import HomeHot from './components/HomeHot.vue'
  import HomeProduct from './components/HomeProduct.vue'
  import HomePanel from './components/HomePanel.vue'

</script>

<template>
  <div class="container">
    <HomeCategory></HomeCategory>
    <HomeBanner></HomeBanner>
  </div>
  <HomeNew></HomeNew>
  <HomeHot></HomeHot>
  <homeProduct></homeProduct>
  <!-- 测试面板组件 -->

   <HomePanel title="人气推荐" sub-title="人气推荐 好多商品">
    <div>人气推荐的插槽</div>
   </HomePanel>
</template>