<script setup>
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-vue-next';
import { MenubarSubTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  inset: { type: Boolean, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <MenubarSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'tailwind.config.jsflex tailwind.config.jscursor-default tailwind.config.jsselect-none tailwind.config.jsitems-center tailwind.config.jsrounded-sm tailwind.config.jspx-2 tailwind.config.jspy-1.5 tailwind.config.jstext-sm tailwind.config.jsoutline-none focus:tailwind.config.jsbg-accent focus:tailwind.config.jstext-accent-foreground data-[state=open]:tailwind.config.jsbg-accent data-[state=open]:tailwind.config.jstext-accent-foreground',
        inset && 'tailwind.config.jspl-8',
        props.class,
      )
    "
  >
    <slot />
    <ChevronRight class="tailwind.config.jsml-auto tailwind.config.jsh-4 tailwind.config.jsw-4" />
  </MenubarSubTrigger>
</template>
