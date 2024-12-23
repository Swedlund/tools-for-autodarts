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
          General
        </h1>
      </div>

      <template v-if="config">
        <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Discord Webhooks
              </h2>
              <p class="max-w-2xl text-white/40">
                Whenever a <b>private</b> lobby opens, it sends the invitation link to your discord server using a webhook.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.discord.enabled" />
              <input
                v-model="config.discord.url"
                type="text"
                class="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none"
              >
            </div>
            <template v-if="config.discord.enabled">
              <div class="grid grid-cols-[5rem_auto] items-center gap-4">
                <AppToggle v-model="config.discord.manually" text-on="MAN" text-off="AUT" />
                <p>Toggles between sending the invitation link automatically or manually.</p>
              </div>
            </template>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Autostart
              </h2>
              <p class="max-w-2xl text-white/40">
                Displays a button to enable autostart on the lobby page. If autostart is enabled, it will automatically start the game after <b>3 seconds</b> once a player joins the lobby.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.autoStart.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Colors
              </h2>
              <p class="max-w-2xl text-white/40">
                Changes the colors of dart throws and scores.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.colors.enabled" />
            </div>
            <div v-if="config.colors.enabled" class="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div class="relative min-h-14 w-full">
                <input
                  v-model="config.colors.background"
                  type="color"
                  class="size-full overflow-hidden rounded-md border-none border-transparent p-0 outline-none"
                >
                <span class="pointer-events-none absolute inset-0 flex items-center justify-center p-2 text-center text-xs drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Click here to change color</span>
              </div>
              <div class="relative min-h-14 w-full">
                <input
                  v-model="config.colors.text"
                  type="color"
                  class="size-full overflow-hidden rounded-md border-none border-transparent p-0 outline-none"
                >
                <span class="pointer-events-none absolute inset-0 flex items-center justify-center p-2 text-center text-xs drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Click here to change color</span>
              </div>
              <div
                class="col-span-2 flex h-14 w-full items-center justify-center rounded-md text-5xl font-bold"
                :style="{
                  backgroundColor: config.colors.background,
                  color: config.colors.text,
                }"
              >
                501
              </div>
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Extend recent Local Players
              </h2>
              <p class="max-w-2xl text-white/40">
                Default recent local players capped at 5, this will extend it to infinite.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.recentLocalPlayers.enabled" />
            </div>
            <div v-if="config.recentLocalPlayers.enabled" class="grid grid-cols-[5rem_auto] items-center gap-4">
              <input
                v-model="config.recentLocalPlayers.cap"
                placeholder="10"
                type="number"
                class="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none placeholder:opacity-50"
              >
              <p>Maximum recent players you want to store</p>
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Disable takeout recognition
              </h2>
              <p class="max-w-2xl text-white/40">
                Disables the takeout recognition. So you have to manually click 'Next' after takeout.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.disableTakeout.enabled" />
            </div>
          </div>

          <div v-if="!config.disableTakeout.enabled" class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Takeout Notification
              </h2>
              <p class="max-w-2xl text-white/40">
                Displays a notification when ever takeout of darts is in progress.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.takeout.enabled" />
            </div>
          </div>

          <div v-if="!config.disableTakeout.enabled" class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Automatic next player on takeout
              </h2>
              <p class="max-w-2xl text-white/40">
                Automatically reset board and switch to next player if takeout stucks for x seconds.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.nextPlayerOnTakeOutStuck.enabled" />
              <input
                v-if="config.nextPlayerOnTakeOutStuck.enabled"
                v-model="config.nextPlayerOnTakeOutStuck.sec"
                type="text"
                class="rounded-md border border-white/10 bg-transparent px-2 py-1 text-center outline-none"
              >
              <span v-if="config.nextPlayerOnTakeOutStuck.enabled">seconds</span>
            </div>
          </div>

          <div v-if="!config.disableTakeout.enabled" class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Automatic next Leg
              </h2>
              <p class="max-w-2xl text-white/40">
                Automatically starts the next leg x seconds <span class="font-semibold text-white/60">after takeout</span>.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.automaticNextLeg.enabled" />
              <input
                v-if="config.automaticNextLeg.enabled"
                v-model="config.automaticNextLeg.sec"
                type="text"
                class="rounded-md border border-white/10 bg-transparent px-2 py-1 text-center outline-none"
              >
              <span v-if="config.automaticNextLeg.enabled">seconds</span>
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Smaller Scores
              </h2>
              <p class="max-w-2xl text-white/40">
                Reduces the font-size of the score of inactive players.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.inactiveSmall.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Shuffle Players
              </h2>
              <p class="max-w-2xl text-white/40">
                Adds a button to the lobby page to shuffle the players in the lobby.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.shufflePlayers.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Streaming Mode
              </h2>
              <p class="max-w-2xl text-white/40">
                Adds a button to the game page to enable streaming mode. If streaming mode is enabled, it will displays a green overlay with stats and scores which then can be captured by OBS or any other streaming software.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.streamingMode.enabled" />
            </div>
            <template v-if="config.streamingMode.enabled">
              <div class="grid grid-cols-[5rem_auto] items-center gap-4">
                <AppToggle v-model="config.streamingMode.backgroundImage" text-on="IMG" text-off="CK" />
                <p>Toggles the Background between Chrome Key and Image</p>
              </div>
              <div v-if="!config.streamingMode.backgroundImage" class="grid grid-cols-[5rem_auto] items-center gap-4">
                <input
                  v-model="config.streamingMode.chromaKeyColor"
                  type="color"
                  class="size-full overflow-hidden rounded border-none border-transparent p-0 outline-none"
                >
                <p>Chroma Key Color</p>
              </div>
              <div v-else class="grid grid-cols-[5rem_auto] items-center gap-4">
                <div
                  @click="handleStreamingModeBackgroundFileSelect"
                  class="aspect-square w-full cursor-pointer overflow-hidden rounded-md border border-dashed border-white/15"
                >
                  <img
                    v-if="config.streamingMode.image"
                    :src="config.streamingMode.image"
                    class="size-full object-cover"
                  >
                  <div class="flex size-full items-center justify-center opacity-15">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h9v2H5v14h14v-9h2v9q0 .825-.587 1.413T19 21zM17 9V7h-2V5h2V3h2v2h2v2h-2v2zM6 17h12l-3.75-5l-3 4L9 13zM5 5v14z" /></svg>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <AppButton
                    @click="handleStreamingModeBackgroundFileSelect"
                    auto
                  >
                    Change Image
                  </AppButton>
                  <AppButton
                    @click="handleStreamingModeBackgroundReset"
                    auto
                  >
                    Reset
                  </AppButton>
                </div>
                <input
                  @change="handleStreamingModeBackgroundFileSelected"
                  ref="streamingModeBackgroundFileSelect"
                  class="hidden"
                  type="file"
                >
              </div>
              <div v-if="config.streamingMode.enabled" class="grid grid-cols-[5rem_auto] items-center gap-4">
                <AppToggle v-model="config.streamingMode.throws" />
                <p>Display Throws</p>
              </div>
              <div v-if="config.streamingMode.enabled" class="grid grid-cols-[5rem_auto] items-center gap-4">
                <AppToggle v-model="config.streamingMode.board" />
                <p>Display the Board</p>
              </div>
              <div v-if="config.streamingMode.enabled && config.streamingMode.board" class="grid grid-cols-[5rem_auto] items-center gap-4">
                <AppToggle v-model="config.streamingMode.boardImage" text-on="LIVE" text-off="IMG" />
                <p>Toggles the Board between Live and Image mode</p>
              </div>
              <input
                v-model="config.streamingMode.footerText"
                placeholder="Bottom text of the streaming overlay"
                class="col-span-2 w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none placeholder:opacity-50"
              >
            </template>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                External Boards
              </h2>
              <p class="max-w-2xl text-white/40">
                Allows you to save external Boards to easily follow them.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.externalBoards.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Hide Menu in Match
              </h2>
              <p class="max-w-2xl text-white/40">
                Hide the menu during the match to have more space.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.menuDisabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Larger Legs & Sets
              </h2>
              <p class="max-w-2xl text-white/40">
                Increases the font-size of the legs and sets on the match page.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_5rem] items-center gap-4">
              <AppToggle v-model="config.legsSetsLarger.enabled" />
              <span v-if="config.legsSetsLarger.enabled" class="text-right">size</span>
              <input
                v-if="config.legsSetsLarger.enabled"
                v-model="config.legsSetsLarger.value"
                type="text"
                class="rounded-md border border-white/10 bg-transparent px-2 py-1 text-center outline-none"
              >
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Larger Player Match Data
              </h2>
              <p class="max-w-2xl text-white/40">
                Increases the font-size of the player match data on the match page.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_5rem] items-center gap-4">
              <AppToggle v-model="config.playerMatchData.enabled" />
              <span v-if="config.playerMatchData.enabled" class="text-right">size</span>
              <input
                v-if="config.playerMatchData.enabled"
                v-model="config.playerMatchData.value"
                type="text"
                class="rounded-md border border-white/10 bg-transparent px-2 py-1 text-center outline-none"
              >
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Winner animation
              </h2>
              <p class="max-w-2xl text-white/40">
                Shows an animation around player card when a player wins a leg.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.winnerAnimation.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Show thrown darts
              </h2>
              <p class="max-w-2xl text-white/40">
                Shows number of thrown darts after a player wins a leg.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.thrownDartsOnWin.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Show ring
              </h2>
              <p class="max-w-2xl text-white/40">
                Shows a ring with numbers around the live view.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.liveViewRing.enabled" />
            </div>
            <div v-if="config.liveViewRing.enabled" class="grid grid-cols-[5rem_5rem_5rem_auto] items-center gap-4">
              <p>Ring color</p>
              <AppToggle v-model="config.liveViewRing.colorEnabled" />
              <input
                v-if="config.liveViewRing.colorEnabled"
                v-model="config.liveViewRing.color"
                type="color"
                class="size-full overflow-hidden rounded border-none border-transparent p-0 outline-none"
              >
            </div>
            <div v-if="config.liveViewRing.enabled" class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <p>Ring size</p>
              <input
                v-model="config.liveViewRing.size"
                type="number"
                min="1"
                max="9"
                class="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 outline-none"
              >
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Automatic next player after 3 darts
              </h2>
              <p class="max-w-2xl text-white/40">
                After 3 darts the game automatically switches to the next player. So you can throw 6 darts in a row. Only for 1 or 2 player games.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_auto] items-center gap-4">
              <AppToggle v-model="config.nextPlayerAfter3darts.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <h2 class="text-lg font-semibold">
                Team lobby
              </h2>
              <p class="max-w-2xl text-white/40">
                Removes first player from the lobby and adds every following player to the board.
                Works only in private Lobbies.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.teamLobby.enabled" />
            </div>
          </div>

          <div class="space-y-4 rounded border border-white/10 p-4">
            <div>
              <div class="flex items-center justify-between text-lg font-semibold">
                <div>Dart-Zoom</div>
                <div class="opacity-50">
                  <small>by Dotty</small>
                </div>
              </div>
              <p class="max-w-2xl text-white/40">
                Dart-Zoom on 3 Camera-Views.
              </p>
            </div>
            <div class="grid grid-cols-[5rem_5rem_auto] items-center gap-4">
              <AppToggle v-model="config.dartZoom.enabled" />
            </div>
          </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AppToggle from "@/components/AppToggle.vue";
  import type { IConfig } from "@/utils/storage";
  import { AutodartsToolsConfig, defaultConfig } from "@/utils/storage";
  import AppButton from "@/components/AppButton.vue";
  import { defineEmits } from 'vue';

  const emit = defineEmits(['changeComponent']);

  const changeComponent = (componentName: string) => {
    emit('changeComponent', componentName);
  };

  const config = ref<IConfig>();
  const streamingModeBackgroundFileSelect = ref() as Ref<HTMLInputElement>;

  onMounted(async () => {
    config.value = await AutodartsToolsConfig.getValue();
  });

  watch(config, async () => {
    await AutodartsToolsConfig.setValue({
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...JSON.parse(JSON.stringify(config.value)),
    });
  }, { deep: true });

  function handleStreamingModeBackgroundFileSelect() {
    streamingModeBackgroundFileSelect.value.click();
  }

  function handleStreamingModeBackgroundFileSelected() {
    const file = streamingModeBackgroundFileSelect.value.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      config.value!.streamingMode.image = reader.result as string;
      console.log(reader.result);
    };
    reader.readAsDataURL(file);

    streamingModeBackgroundFileSelect.value.value = "";
  }

  function handleStreamingModeBackgroundReset() {
    config.value!.streamingMode.image = "";
  }

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
