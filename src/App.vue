<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import CryptoHeader from '@/components/CryptoHeader.vue'
import CryptoSection from '@/components/CryptoSection.vue'
import CryptoTable from '@/components/CryptoTable.vue'
import CryptoProgress from '@/components/CryptoProgress.vue'
import CryptoAddition from '@/components/CryptoAddition.vue'
import useInterval from '@/compositions/use-interval'
import { format } from '@/service/date'

const store = useStore()

// Handle count down and render seconds
// Refresh the rate list every 60 seconds
const refreshCountdown = ref<number>(0)
const countdownPercentage = computed<number>(() => {
  return Math.round((refreshCountdown.value / 60) * 100)
})
const lastUpdatedAt = computed<string>(() => {
  const date = store.state.lastUpdatedAt

  if (!date) {
    return ''
  }

  return format(date)
})

useInterval(
  () => {
    if (refreshCountdown.value <= 0) {
      store
        .dispatch('refreshRateList')
        .then(() => {
          store.commit('setError', undefined)
        })
        .catch((err: any) => {
          store.commit('setError', err.message)
        })

      refreshCountdown.value = 60
    }

    refreshCountdown.value -= 1
  },
  1000,
  true
)

// Show the filter select when the user clicks the add button
const rateAdditionSelectVisible = ref<boolean>(false)
const canAddRate = computed<boolean>(() => {
  return store.state.selectedCodes.length < 10
})

const showRateAdditionSelect = (): void => {
  if (!canAddRate.value) {
    return
  }

  rateAdditionSelectVisible.value = true
}

const hasError = computed<boolean>(() => {
  return !!store.state.error
})
</script>

<template>
  <crypto-header />
  <div class="main-container">
    <crypto-section :title="$t('sectionTittle')">
      <crypto-table />
      <div class="footer">
        <div class="extra" @click.stop>
          <div
            class="add-btn"
            :class="{
              disabled: !canAddRate,
            }"
            @click.stop="showRateAdditionSelect"
          >
            <span class="add-btn__icon"><i>+</i></span>
            <span class="add-btn__text">{{ $t('add') }}</span>
          </div>
          <crypto-addition v-model:visible="rateAdditionSelectVisible" />
        </div>
        <div class="update-time">
          <div class="update-time__process">
            <crypto-progress
              :value="countdownPercentage"
              :text="`${refreshCountdown + 1}`"
            />
          </div>
          <div class="update-time__value">
            {{ $t('lastUpdate') }}
            {{ lastUpdatedAt }}
          </div>
        </div>
      </div>
      <div class="error-message" v-show="hasError">
        {{ $t('tips') }}
      </div>
    </crypto-section>
  </div>
</template>

<style>
body {
  margin: 0;
}
#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app .disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
.main-container {
  padding-top: 64px;
  padding-bottom: 320px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
}
.add-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.add-btn__icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  text-align: center;
  margin-right: 8px;
  font-size: 24px;
  color: #fff;
  border-radius: 50%;
  background-color: rgb(0, 113, 235);
}
.add-btn__icon i {
  line-height: 23px;
  font-style: normal;
}
.add-btn__text {
  font-size: 16px;
  font-weight: 600;
  color: rgb(0, 113, 235);
}
.update-time {
  display: flex;
  align-items: center;
}
.update-time__value {
  margin-left: 8px;
  font-size: 14px;
}
.extra {
  position: relative;
}
.error-message {
  margin: 32px 0;
  color: rgb(205, 61, 100);
}
@media (max-width: 640px) {
  .update-time__value {
    display: none;
  }
}
</style>
