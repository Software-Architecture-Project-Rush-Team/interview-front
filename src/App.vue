<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
const isAuthenticated = ref(false)
const router = useRouter()

</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <Toaster />
    <!-- <header>
      <h1>面试子系统</h1>
    </header> -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* header {
  background-color: #42b983;
  color: white;
  padding: 1em;
  text-align: center;
} */
main {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh; /* 确保 main 占满整个视口高度 */
}
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.items-center {
  align-items: center;
}
.min-h-screen {
  min-height: 100vh;
}
</style>
