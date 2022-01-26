<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import CryptoSelect from '@/components/CryptoSelect.vue'
import CryptoOption from '@/components/CryptoOption.vue'
import Flag from '@/components/Flag.vue'
import useOutClick from '@/compositions/use-outclick'
import { Currency } from '@/service/rate'

interface CryptoAdditionProps {
  visible: boolean
}

const props = defineProps<CryptoAdditionProps>()

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const emit = defineEmits<Emits>()

const store = useStore()

useOutClick(() => {
  emit('update:visible', false)
})

const keyword = ref<string>('')

// Render options with all unselected currency list
const unselectedRateList = computed<Currency[]>(
  () => store.getters.unselectedRateList
)
const selectableRateList = computed<Currency[]>(() => {
  return unselectedRateList.value.filter((item): boolean => {
    return item.name.toLowerCase().indexOf(keyword.value.toLowerCase()) !== -1
  })
})

const search = (value: string): void => {
  keyword.value = value
}

const change = (value: string | number): void => {
  emit('update:visible', false)

  if (!value) {
    return
  }

  store.commit('addSelectedCode', value)
}
</script>

<template>
  <div class="add-crypto" v-if="props.visible">
    <crypto-select
      placeholder="Type to search..."
      auto-focus
      @search="search"
      @change="change"
    >
      <crypto-option
        v-for="item in selectableRateList"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
        <div class="currency-option">
          <div class="currency-option__flag">
            <flag :type="item.code" />
          </div>
          <span class="currency-option__text">{{ item.name }}</span>
        </div>
      </crypto-option>
    </crypto-select>
  </div>
</template>

<style>
.add-crypto {
  position: absolute;
  left: 0;
  top: 0;
}
@media (max-width: 640px) {
  .add-crypto {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
.currency-option {
  display: flex;
  align-items: center;
}
.currency-option__flag {
  margin-right: 8px;
}
</style>
