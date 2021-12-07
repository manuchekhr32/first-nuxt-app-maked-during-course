<template>
    <div class="admin-new-post-page">
        <AdminPostForm @submit="onSubmitted" />
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['check-auth', 'auth'],

    methods: {
      onSubmitted(reData) {
        this.$store.dispatch('newPost', reData)
        // Because the newPost action returned data => then()
        .then(() => {
          this.$router.push('/admin')
        })
      }
    },
}
</script>