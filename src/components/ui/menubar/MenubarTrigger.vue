<script setup>
import { cn } from '@/lib/utils';
import { MenubarTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, required: false },
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
  <MenubarTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'tailwind.config.jsflex tailwind.config.jscursor-default tailwind.config.jsselect-none tailwind.config.jsitems-center tailwind.config.jsrounded-sm tailwind.config.jspx-3 tailwind.config.jspy-1.5 tailwind.config.jstext-sm tailwind.config.jsfont-medium tailwind.config.jsoutline-none focus:tailwind.config.jsbg-accent focus:tailwind.config.jstext-accent-foreground data-[state=open]:tailwind.config.jsbg-accent data-[state=open]:tailwind.config.jstext-accent-foreground',
        props.class,
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
