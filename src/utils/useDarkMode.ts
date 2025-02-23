import {ref, watch} from 'vue'

const isDark = ref(false)

export function useDarkMode() {
    const toggleDark = () => {
        isDark.value = !isDark.value
        document.documentElement.classList.toggle('dark')
    }

    watch(isDark, (newValue) => {
        localStorage.setItem('darkMode', newValue ? 'dark' : 'light')
    })

    // Initialize from localStorage
    const storedTheme = localStorage.getItem('darkMode')
    if (storedTheme === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }

    return {
        isDark,
        toggleDark
    }
}