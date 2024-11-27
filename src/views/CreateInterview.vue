<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { toast } from '@/components/ui/toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { Checkbox } from '@/components/ui/checkbox'

const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(
  z.object({
    interviewType: z.string().refine(v => v, { message: '请选择面试形式' }),
    interviewDate: z.string().refine(v => v, { message: '请选择面试日志' }),
    // location: z.string().min(1, '请输入面试地点'),
    candidates: z.array(z.string()).min(1, '请选择至少一名面试者'),
  })
)

const interviewTypes = [
  {
    value: 'structured',
    label: '结构化面试',
  },
  {
    value: 'structured-group',
    label: '结构化小组',
  },
  {
    value: 'leaderless',
    label: '无领导小组讨论',
  },
]

const candidates = ref([
  { id: '1', name: '张三', avatar: '/avatars/1.png' },
  { id: '2', name: '李四', avatar: '/avatars/2.png' },
  { id: '3', name: '王五', avatar: '/avatars/3.png' },
  { id: '4', name: '赵六', avatar: '/avatars/4.png' },
  { id: '5', name: '孙七', avatar: '/avatars/5.png' },
])

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    interviewType: '',
    interviewDate: '',
    // location: '',
    candidates: [],
  },
})

const placeholder = ref()

const value = computed({
  get: () => (values.interviewDate ? parseDate(values.interviewDate) : undefined),
  set: (val) => val,
})

// 面试类型的更新属性
const selectedInterviewType = computed({
  get: () => values.interviewType,
  set: (val) => {
    setFieldValue('interviewType', val)
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: '创建成功',
    description: '面试已成功创建，面试号为 #123456，将发送至面试者邮箱！',
  })
})

// In script section, update the toggleCandidate method:
const toggleCandidate = (candidateId: string) => {
  const currentCandidates = [...values.candidates]
  const index = currentCandidates.indexOf(candidateId)
  
  if (index > -1) {
    currentCandidates.splice(index, 1)
  } else {
    currentCandidates.push(candidateId)
  }
  
  setFieldValue('candidates', currentCandidates)
}
</script>

<template>
  <form @submit="onSubmit">
    <div class="container mx-auto py-8">
      <Card class="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>创建面试</CardTitle>
        </CardHeader>
        <CardContent class="space-y-8">
        <!-- 面试类型 -->
        <FormField name="interviewType">
          <FormItem>
            <FormLabel>面试类型</FormLabel>
            <FormControl>
              <Select v-model="selectedInterviewType">
                <SelectTrigger>
                  <SelectValue placeholder="选择面试类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="type in interviewTypes"
                    :key="type.value"
                    :value="type.value"
                  >
                    <div>
                      <div>{{ type.label }}</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

          <!-- 面试日期 -->
          <FormField name="interviewDate">
            <FormItem>
              <FormLabel>面试日期：</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button variant="outline">
                      <span>
                        {{ value ? df.format(new Date(value.year, value.month - 1, value.day)) : '请选择面试日期' }}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <Calendar
                      v-model:placeholder="placeholder"
                      v-model="value"
                      calendar-label="选择面试日期"
                      @update:model-value="(v) => {
                        if (v) {
                            setFieldValue('interviewDate', v.toString())
                        }
                        else {
                            setFieldValue('interviewDate', undefined)
                        }
                      }"
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- 面试地点 -->
          <!-- <FormField name="location">
            <FormItem>
              <FormLabel>面试地点</FormLabel>
              <FormControl>
                <Input v-model="values.location" placeholder="请输入面试地点" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField> -->

          <!-- 选择面试者 -->
        <FormField name="candidates">
          <FormItem>
            <FormLabel>选择面试者</FormLabel>
            <FormControl>
              <Carousel class="relative w-full max-w-3xl mx-auto">
                <CarouselContent class="-ml-4">
                  <CarouselItem v-for="candidate in candidates" :key="candidate.id" class="pl-4 basis-1/3">
                    <div class="p-2">
                      <Card
                        :class="[
                          'cursor-pointer transition-all min-h-[280px]',
                          values.candidates.includes(candidate.id) 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:bg-muted/50',
                        ]"
                      >
                        <CardContent class="p-6 text-center relative">
                        <!-- Checkbox in top-right corner -->
                        <div class="absolute top-2 right-2">
                          <Checkbox
                            :checked="values.candidates.includes(candidate.id)"
                            @update:checked="() => toggleCandidate(candidate.id)"
                            :class="[
                              'transition-colors data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
                              'border-2'
                            ]"
                          />
                        </div>
                          
                          <!-- Avatar and Name -->
                          <img
                            :src="candidate.avatar"
                            :alt="candidate.name"
                            class="w-32 h-32 rounded-full mx-auto mb-4"
                          />
                          <div class="font-medium text-lg">{{ candidate.name }}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Add this after the Carousel component -->
        <div class="mt-4 space-y-2">
        <div class="text-sm text-muted-foreground">
            已选择 {{ values.candidates.length }} 名面试者
        </div>
            <div v-if="values.candidates.length > 0" class="flex flex-wrap gap-2">
                <div 
                v-for="candidateId in values.candidates" 
                :key="candidateId"
                class="inline-flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 rounded-md"
                >
                {{ candidates.find(c => c.id === candidateId)?.name }}
                </div>
            </div>
        </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" class="w-full">创建面试</Button>
        </CardFooter>
      </Card>
    </div>

  </form>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>