<template>
  <div class="mb-16 space-y-8">
    <div class="space-y-4">
      <div class="flex items-center">
        <AppButton
          @click="changeComponent('MenuConfig')" 
          class="mr-4 h-9 w-8 rounded-md border border-white/10 bg-transparent p-0 pt-[0.2rem] text-xl hover:bg-white/10"
        >
          <span class="icon-[mdi-light--chevron-left]" />
        </AppButton>
        <h1 class="text-3xl font-bold">
          Animations
        </h1>
      </div>

      <template v-if="config">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="col-span-1 space-y-4 rounded border border-white/10 p-4 md:col-span-2">
            <div>
              <h2 class="text-lg font-semibold">
                Animations
              </h2>
            </div>
            <div class="grid grid-cols-[5rem_auto_50px] items-center gap-4">
              <AppToggle v-model="config.animations.enabled" />
              <div />
              <button
                @click="animationsConfig = defaultAnimationsConfig"
                v-if="config.animations.enabled"
                class="flex h-full flex-nowrap items-center justify-center rounded-md border border-white/10 bg-white/5 outline-none hover:bg-white/10"
              >
                <span class="icon-[mdi-light--refresh] -scale-x-100 text-xl" />
              </button>
            </div>
            <div v-if="config.animations.enabled && animationsConfig" class="grid gap-4">
              <div>Start delay</div>
              <input
                v-model="animationsConfig.startDelay"
                placeholder="Time in seconds"
                type="number"
                :class="twMerge(
                  'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                  !!animationsConfig.startDelay && 'text-white/40',
                )"
              >
              <div>End delay</div>
              <input
                v-model="animationsConfig.endDelay"
                placeholder="Time in seconds"
                type="number"
                :class="twMerge(
                  'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                  !!animationsConfig.startDelay && 'text-white/40',
                )"
              >
              <div class="mt-1.5">
                <span class="font-semibold">Winner animations</span>
              </div>
              <div v-for="(animation, index) in animationsConfig.winner" :key="index" class="grid items-center gap-4 lg:grid-cols-[200px_auto_50px] lg:grid-rows-1">
                <img :src="animation.info">
                <input
                  v-model="animation.info"
                  placeholder="URL of gif file"
                  type="text"
                  :disabled="!!animation.data"
                  :class="twMerge(
                    'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                    !!animation.data && 'text-white/40',
                  )"
                >
                <button
                  @click="animationsConfig.winner.splice(index, 1)"
                  class="flex h-10 flex-nowrap items-center justify-center rounded-md border border-white/10 bg-white/5 outline-none"
                >
                  <span class="icon-[mdi-light--delete] text-lg"></span>
                </button>
              </div>
              <div class="grid items-center gap-4 lg:grid-cols-[50px_138px_300px_50px_auto] lg:grid-rows-1">
                <button
                  @click="animationsConfig.winner.push({ info: '' })"
                  class="flex flex-nowrap items-center  justify-center rounded-md border border-white/10 bg-white/5 p-2 outline-none"
                >
                  <span class="icon-[mdi-light--plus]" />
                </button>
                <div />
              </div>
            </div>
            <div v-if="config.animations.enabled && animationsConfig" class="grid gap-4">
              <div class="mt-1.5">
                <span class="font-semibold">Bull animations</span>
              </div>
              <div v-for="(animation, index) in animationsConfig.bull" :key="index" class="grid items-center gap-4 lg:grid-cols-[200px_auto_50px] lg:grid-rows-1">
                <img :src="animation.info">
                <input
                  v-model="animation.info"
                  placeholder="URL of gif file"
                  type="text"
                  :disabled="!!animation.data"
                  :class="twMerge(
                    'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                    !!animation.data && 'text-white/40',
                  )"
                >
                <button
                  @click="animationsConfig.bull.splice(index, 1)"
                  class="flex h-10 flex-nowrap items-center justify-center rounded-md border border-white/10 bg-white/5 outline-none"
                >
                  <span class="icon-[mdi-light--delete] text-lg"></span>
                </button>
              </div>
              <div class="grid items-center gap-4 lg:grid-cols-[50px_138px_300px_50px_auto] lg:grid-rows-1">
                <button
                  @click="animationsConfig.bull.push({ info: '' })"
                  class="flex flex-nowrap items-center  justify-center rounded-md border border-white/10 bg-white/5 p-2 outline-none"
                >
                  <span class="icon-[mdi-light--plus]" />
                </button>
                <div />
              </div>
            </div>
            <div v-if="config.animations.enabled && animationsConfig" class="grid gap-4">
              <div class="mt-1.5">
                <span class="font-semibold">180 animations</span>
              </div>
              <div v-for="(animation, index) in animationsConfig.oneEighty" :key="index" class="grid items-center gap-4 lg:grid-cols-[200px_auto_50px] lg:grid-rows-1">
                <img :src="animation.info">
                <input
                  v-model="animation.info"
                  placeholder="URL of gif file"
                  type="text"
                  :disabled="!!animation.data"
                  :class="twMerge(
                    'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                    !!animation.data && 'text-white/40',
                  )"
                >
                <button
                  @click="animationsConfig.oneEighty.splice(index, 1)"
                  class="flex h-10 flex-nowrap items-center justify-center rounded-md border border-white/10 bg-white/5 outline-none"
                >
                  <span class="icon-[mdi-light--delete] text-lg"></span>
                </button>
              </div>
              <div class="grid items-center gap-4 lg:grid-cols-[50px_138px_300px_50px_auto] lg:grid-rows-1">
                <button
                  @click="animationsConfig.oneEighty.push({ info: '' })"
                  class="flex flex-nowrap items-center  justify-center rounded-md border border-white/10 bg-white/5 p-2 outline-none"
                >
                  <span class="icon-[mdi-light--plus]" />
                </button>
                <div />
              </div>
            </div>
            <div v-if="config.animations.enabled && animationsConfig" class="grid gap-4">
              <div class="mt-1.5">
                <span class="font-semibold">Miss animations</span>
              </div>
              <div v-for="(animation, index) in animationsConfig.miss" :key="index" class="grid items-center gap-4 lg:grid-cols-[200px_auto_50px] lg:grid-rows-1">
                <img :src="animation.info">
                <input
                  v-model="animation.info"
                  placeholder="URL of gif file"
                  type="text"
                  :disabled="!!animation.data"
                  :class="twMerge(
                    'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                    !!animation.data && 'text-white/40',
                  )"
                >
                <button
                  @click="animationsConfig.miss.splice(index, 1)"
                  class="flex h-10 flex-nowrap items-center justify-center rounded-md border border-white/10 bg-white/5 outline-none"
                >
                  <span class="icon-[mdi-light--delete] text-lg"></span>
                </button>
              </div>
              <div class="grid items-center gap-4 lg:grid-cols-[50px_138px_300px_50px_auto] lg:grid-rows-1">
                <button
                  @click="animationsConfig.miss.push({ info: '' })"
                  class="flex flex-nowrap items-center  justify-center rounded-md border border-white/10 bg-white/5 p-2 outline-none"
                >
                  <span class="icon-[mdi-light--plus]" />
                </button>
                <div />
              </div>
            </div>
            <div v-if="config.animations.enabled && animationsConfig" class="grid gap-4">
              <div class="mt-1.5">
                <span class="font-semibold">Bust animations</span>
              </div>
              <div v-for="(animation, index) in animationsConfig.bust" :key="index" class="grid items-center gap-4 lg:grid-cols-[200px_auto_50px] lg:grid-rows-1">
                <img :src="animation.info">
                <input
                  v-model="animation.info"
                  placeholder="URL of gif file"
                  type="text"
                  :disabled="!!animation.data"
                  :class="twMerge(
                    'w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none',
                    !!animation.data && 'text-white/40',
                  )"
                >
                <button
                  @click="animationsConfig.bust.splice(index, 1)"
                  class="flex h-10 flex-nowrap items-center justify-center rounded-md border border-white/10 bg-white/5 outline-none"
                >
                  <span class="icon-[mdi-light--delete] text-lg"></span>
                </button>
              </div>
              <div class="grid items-center gap-4 lg:grid-cols-[50px_138px_300px_50px_auto] lg:grid-rows-1">
                <button
                  @click="animationsConfig.bust.push({ info: '' })"
                  class="flex flex-nowrap items-center  justify-center rounded-md border border-white/10 bg-white/5 p-2 outline-none"
                >
                  <span class="icon-[mdi-light--plus]" />
                </button>
                <div />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { twMerge } from "tailwind-merge";
  import AppToggle from "@/components/AppToggle.vue";
  import type { IConfig } from "@/utils/storage";
  import { AutodartsToolsConfig, defaultConfig } from "@/utils/storage";
  import AppButton from "@/components/AppButton.vue";
  import type { IAnimationsConfig } from "@/utils/animationsStorage";
  import { AutodartsToolsAnimationsConfig, defaultAnimationsConfig } from "@/utils/animationsStorage";
  import { defineEmits } from 'vue';

  const emit = defineEmits(['changeComponent']);

  const changeComponent = (componentName: string) => {
    emit('changeComponent', componentName);
  };

  const config = ref<IConfig>();
  const animationsConfig = ref<IAnimationsConfig>();

  onMounted(async () => {
    config.value = await AutodartsToolsConfig.getValue();
    animationsConfig.value = await AutodartsToolsAnimationsConfig.getValue();
  });

  watch(config, async () => {
    await AutodartsToolsConfig.setValue({
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...JSON.parse(JSON.stringify(config.value)),
    });
  }, { deep: true });

  watch(animationsConfig, async () => {
    await AutodartsToolsAnimationsConfig.setValue({
      ...JSON.parse(JSON.stringify(defaultAnimationsConfig)),
      ...JSON.parse(JSON.stringify(animationsConfig.value)),
    });
  }, { deep: true });

</script>

<style>
  input[type="color"] {
    -webkit-appearance: none;
    border: none;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
</style>
