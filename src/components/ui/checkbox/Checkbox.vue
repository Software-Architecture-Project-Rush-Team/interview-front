<script setup>
import { cn } from '@/lib/utils';
import { Check } from 'lucide-vue-next';
import {
  CheckboxIndicator,
  CheckboxRoot,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  defaultChecked: { type: Boolean, required: false },
  checked: { type: [Boolean, String], required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  name: { type: String, required: false },
  value: { type: String, required: false },
  id: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits(['update:checked']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'tailwind.config.jspeer tailwind.config.jsh-4 tailwind.config.jsw-4 tailwind.config.jsshrink-0 tailwind.config.jsrounded-sm tailwind.config.jsborder tailwind.config.jsborder-primary tailwind.config.jsring-offset-background focus-visible:tailwind.config.jsoutline-none focus-visible:tailwind.config.jsring-2 focus-visible:tailwind.config.jsring-ring focus-visible:tailwind.config.jsring-offset-2 disabled:tailwind.config.jscursor-not-allowed disabled:tailwind.config.jsopacity-50 data-[state=checked]:tailwind.config.jsbg-primary data-[state=checked]:tailwind.config.jstext-primary-foreground',
        props.class,
      )
    "
  >
    <CheckboxIndicator
      class="tailwind.config.jsflex tailwind.config.jsh-full tailwind.config.jsw-full tailwind.config.jsitems-center tailwind.config.jsjustify-center tailwind.config.jstext-current"
    >
      <slot>
        <Check class="tailwind.config.jsh-4 tailwind.config.jsw-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
