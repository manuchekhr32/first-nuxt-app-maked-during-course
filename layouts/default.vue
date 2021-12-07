<template>
    <div>
        <NavigationTheHeader @sidenavToggle="navSwitch = !navSwitch" />
        <NavigationTheSidenav :show="navSwitch" @close="navSwitch = false" />
        <nuxt />
    </div>
</template>

<script>
export default {
    data() {
        return {
            navSwitch: false
        }
    },
}
</script>

<style>
    html {
        font-family: 'Open Sans', sans-serif;
    }
    body {
        margin: 0;
    }
</style>