<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="md:h-full">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Zaloguj się
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="name@example.com"
                required="true"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                Hasło
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required="true"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                    required="true"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500"> Zapamiętaj mnie </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Zaloguj się
            </button>
            <p class="text-sm font-light text-gray-500">
              Nie masz konta?
              <RouterLink
                :to="{ name: 'register' }"
                class="font-medium text-indigo-600 hover:underline"
              >
                Zarejestruj się
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
