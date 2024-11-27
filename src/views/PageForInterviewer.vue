<script setup>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Card class="w-[100px] space-y-1" style="width: 350px; height: 250px;">
    <CardHeader>
      <CardTitle class="text-center">你好！面试官</CardTitle>
      <!-- <CardDescription>请选择</CardDescription> -->
    </CardHeader>
    <CardContent>
      <form>
        <div>
          <Input id="name" placeholder="请输入提供的房间号" />
        </div>
      </form>
    </CardContent>
    <CardFoot class="flex justify-between px-6 pb-6">
        <Button class="w-full">创建房间</Button>
        <Button class="w-full">加入房间</Button>

    </CardFoot>
  </Card>
</template>

<style scoped>
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.flex-col {
  flex-direction: column;
}   
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
.text-center {
  text-align: center;
}
.w-full {
  width: 30%;
}
.space-y-1 > * + * {
  margin-top: 1rem; /* 添加垂直间距 */
}
.space-y-2 > * + * {
  margin-top: 1.5rem; /* 添加垂直间距 */
}
.px-6 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.pb-6 {
  padding-bottom: 1.5rem;
}
</style>