<template> 
    <div class="admin-page">
        <section class="new-post">
            <UIAppButton @click="$router.push('/admin/new-post/')">New post</UIAppButton>
            <UIAppButton @click="signOut()">LogOut</UIAppButton>
        </section>
        <section class="existing-posts">
            <h1>Existing posts</h1>
            <PostsPostList :posts="posts" isAdmin />
        </section>
    </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
  layout: 'admin',

  computed: {
    posts() {
      return this.$store.getters.getLoadedPosts
    }
  },

  methods: {
    signOut() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>