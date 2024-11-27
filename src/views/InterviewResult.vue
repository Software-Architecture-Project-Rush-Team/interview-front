<!-- 面试官提交对于面试者的评价 -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

// 定义表单验证模式
const formSchema = toTypedSchema(z.object({
  intervieweeId: z.string().min(1, "请输入面试者ID"),
  comprehensiveScore: z.number().min(0).max(100, "分数范围0-100"),
  // 各评分维度
  languageExpression: z.number().min(0).max(20, "分数范围0-20"),
  logicalThinking: z.number().min(0).max(20, "分数范围0-20"),
  situationalResponse: z.number().min(0).max(20, "分数范围0-20"), 
  professionalKnowledge: z.number().min(0).max(20, "分数范围0-20"),
  personalQuality: z.number().min(0).max(20, "分数范围0-20"),
  comments: z.string().min(10, "评语至少10字").max(500, "评语最多500字"),
  suggestions: z.string().max(200, "建议最多200字").optional(),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    intervieweeId: '',
    comprehensiveScore: 0,
    languageExpression: 0,
    logicalThinking: 0,
    situationalResponse: 0,
    professionalKnowledge: 0, 
    personalQuality: 0,
    comments: '',
    suggestions: ''
  }
})

const onSubmit = form.handleSubmit((values) => {
  toast({
    title: '提交成功',
    description: '面试评价已保存',
  })
  // TODO: 调用API保存评价
})
</script>

<template>
  <form @submit="onSubmit" class="w-full max-w-2xl mx-auto space-y-8">
    <Card class="p-6">
      <CardHeader>
        <CardTitle>面试评价表</CardTitle>
        <CardDescription>请对本次面试进行综合评价</CardDescription>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- 面试者信息 -->
        <FormField v-slot="{ field }" name="intervieweeId">
          <FormItem>
            <FormLabel>面试者ID</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="请输入面试者ID" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- 评分维度 -->
        <div class="grid grid-cols-2 gap-6">
          <FormField v-slot="{ field }" name="languageExpression">
            <FormItem>
              <FormLabel>语言表达（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估表达的准确性、流畅性和感染力</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="logicalThinking">
            <FormItem>
              <FormLabel>逻辑思维（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估分析问题和解决问题的能力</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="situationalResponse">
            <FormItem>
              <FormLabel>情景应变（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估处理突发情况的应变能力</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="professionalKnowledge">
            <FormItem>
              <FormLabel>专业知识（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估岗位相关的专业知识储备</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="personalQuality">
            <FormItem>
              <FormLabel>个人素质（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估思想品德、心理素质等综合素养</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="comprehensiveScore">
            <FormItem>
              <FormLabel>综合得分</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="100" />
              </FormControl>
              <FormDescription>面试总分（满分100分）</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- 评语和建议 -->
        <FormField v-slot="{ field }" name="comments">
          <FormItem>
            <FormLabel>详细评语</FormLabel>
            <FormControl>
              <Textarea 
                v-bind="field" 
                placeholder="请详细描述面试者的表现..."
                class="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="suggestions">
          <FormItem>
            <FormLabel>改进建议</FormLabel>
            <FormControl>
              <Textarea 
                v-bind="field"
                placeholder="给面试者的建议..."
                class="min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full">提交评价</Button>
      </CardFooter>
    </Card>
  </form>
</template>

<style scoped>
.w-full {
  width: 100%;
}
.max-w-2xl {
  max-width: 42rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.space-y-8 > * + * {
  margin-top: 2rem;
}
.grid {
  display: grid;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.gap-6 {
  gap: 1.5rem;
}
</style>