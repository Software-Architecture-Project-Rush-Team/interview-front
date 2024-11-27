<script setup>
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-vue-next';
import { CalendarPrev, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  step: { type: String, required: false },
  prevPage: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarPrev
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'tailwind.config.jsh-7 tailwind.config.jsw-7 tailwind.config.jsbg-transparent tailwind.config.jsp-0 tailwind.config.jsopacity-50 hover:tailwind.config.jsopacity-100',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="tailwind.config.jsh-4 tailwind.config.jsw-4" />
    </slot>
  </CalendarPrev>
</template>
