<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :data="postDetails" @submit="submitted" />
        </section>
    </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  
  asyncData( context ) {
    return context.app.$axios.$get('/posts/' + context.params.postId + '.json')
    .then(data => {
      return {
        postDetails: data
      }
    })
    .catch(err => {
      context.error(err)
    })
  },

  methods: {
    submitted(editedPost) {
      this.$store.dispatch('editPost', {
        postId: this.$route.params.postId,
        data: {...editedPost}
      })
    }
  },
}
</script>