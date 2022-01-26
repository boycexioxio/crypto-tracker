<script lang="ts" setup>
import { ref, onMounted, provide } from 'vue'
import useOutClick from '@/compositions/use-outclick'

interface CryptoSelectProps {
  modelValue?: string | number
  placeholder?: string
  autoFocus?: boolean
}

const props = withDefaults(defineProps<CryptoSelectProps>(), {
  placeholder: '',
  autoFocus: false,
})

interface Emits {
  (e: 'update:model-value', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'search', value: string): void
}

const emit = defineEmits<Emits>()

// Handle auto focus
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autoFocus && inputRef.value) {
    inputRef.value.focus()
  }
})

// Control the visibility of the select body
const isFocused = ref<boolean>(false)

const setFocus = () => {
  isFocused.value = true
}

useOutClick(() => {
  isFocused.value = false
})

// Handle search with keyword
const search = (e: Event): void => {
  const { value } = e.target as HTMLInputElement

  emit('search', value)
}

// Clear the keyword
const clear = (): void => {
  emit('search', '')
  emit('change', '')

  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

interface SelectedOption {
  value: string | number
  label: string | number
}

const selectValue = (value: SelectedOption): void => {
  emit('update:model-value', value.value)
  emit('change', value.value)

  if (inputRef.value) {
    inputRef.value.value = `${value.label}`
  }

  isFocused.value = false
}

provide<(val: SelectedOption) => void>('select-value', selectValue)
</script>

<template>
  <div
    class="crypto-select"
    :class="{
      'crypto-select--focus': isFocused,
    }"
    @click.stop
  >
    <div class="crypto-select__ipt">
      <input
        ref="inputRef"
        type="text"
        :placeholder="props.placeholder"
        @focus="setFocus"
        @input="search"
      />
      <div class="crypto-select__close" @click="clear">&times;</div>
    </div>
    <div class="crypto-select__body">
      <slot />
    </div>
  </div>
</template>

<style>
.crypto-select {
  position: relative;
}
.crypto-select__ipt {
  position: relative;
  z-index: 1;
}
.crypto-select__ipt input {
  padding: 12px 16px;
  padding-right: 38px;
  border: 2px solid rgb(221, 221, 221);
  border-radius: 6px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
}
.crypto-select--focus .crypto-select__ipt input {
  border-color: rgb(0, 113, 235);
}
.crypto-select__close {
  position: absolute;
  top: 0;
  right: 6px;
  display: none;
  padding: 7px;
  font-size: 24px;
  cursor: pointer;
}
.crypto-select__body {
  position: absolute;
  top: 50px;
  left: 0;
  display: none;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
@media (max-width: 640px) {
  .crypto-select__ipt input {
    width: 100%;
    box-sizing: border-box;
  }

  .crypto-select__body {
    max-height: calc(100vh - 60px);
  }
}
.crypto-select--focus .crypto-select__close,
.crypto-select--focus .crypto-select__body {
  display: block;
}
</style>
