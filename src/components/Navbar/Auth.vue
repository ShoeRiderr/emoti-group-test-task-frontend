<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { vOnClickOutside  } from '@vueuse/components';

const router = useRouter();

const authStore = useAuthStore();

const user = computed(() => authStore.user)

const showUserMenu = ref(false);

async function logout() {
  try {
    await authStore.logOut();

    await router.push({
      name: "login",
    });
  } catch (error) {
    authStore.errors = error
  }
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
}

function closeUserMenu() {
  showUserMenu.value = false;
}

</script>

<template>
  <!-- Logged in user -->
  <div
    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
  >
    <!-- Profile dropdown -->
    <div class="relative ml-3">
      <div>
        <button
          @click="toggleUserMenu"
          v-on-click-outside="closeUserMenu"
          type="button"
          class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="false"
        >
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">Open user menu</span>
          <img class="h-8 w-8 rounded-full" src="@/assets/images/user_image.png" alt="" />
        </button>
      </div>

      <div
        v-if="showUserMenu"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <RouterLink
          :to="{ name: 'user', params: { id: user?.id} }"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-0"
        >
          Twój Profil
        </RouterLink>
        <a
          href="#"
          @click="logout"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-2"
        >
          Wyloguj się
        </a>
      </div>
    </div>
  </div>
</template>
