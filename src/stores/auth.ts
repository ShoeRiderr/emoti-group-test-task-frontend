import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const isLoggedIn = ref(false);

    function logIn() {
        isLoggedIn.value = true;
    }

    function logOut() {
        isLoggedIn.value = false;
    }

    return { isLoggedIn, logIn, logOut };
});