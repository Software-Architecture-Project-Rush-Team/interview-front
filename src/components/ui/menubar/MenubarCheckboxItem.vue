<script setup>
import { cn } from '@/lib/utils';
import { Check } from 'lucide-vue-next';
import {
  MenubarCheckboxItem,
  MenubarItemIndicator,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  checked: { type: [Boolean, String], required: false },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits(['select', 'update:checked']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <MenubarCheckboxItem
    v-bind="forwarded"
    :class="
      cn(
        'tailwind.config.jsrelative tailwind.config.jsflex tailwind.config.jscursor-default tailwind.config.jsselect-none tailwind.config.jsitems-center tailwind.config.jsrounded-sm tailwind.config.jspy-1.5 tailwind.config.jspl-8 tailwind.config.jspr-2 tailwind.config.jstext-sm tailwind.config.jsoutline-none focus:tailwind.config.jsbg-accent focus:tailwind.config.jstext-accent-foreground data-[disabled]:tailwind.config.jspointer-events-none data-[disabled]:tailwind.config.jsopacity-50',
        props.class,
      )
    "
  >
    <span class="tailwind.config.jsabsolute tailwind.config.jsleft-2 tailwind.config.jsflex tailwind.config.jsh-3.5 tailwind.config.jsw-3.5 tailwind.config.jsitems-center tailwind.config.jsjustify-center">
      <MenubarItemIndicator>
        <Check class="tailwind.config.jsw-4 tailwind.config.jsh-4" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
