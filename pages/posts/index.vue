<template>
    <div class="post-page">
        <PostsPostList :posts="loadedPosts" />
    </div>
</template>

<script>
export default {
  // fetch(context) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //               {
  //                   id: 1,
  //                   title: "This is our first post",
  //                   previewText: "This is preview text",
  //                   thumbnail: "https://www.bbva.com/wp-content/uploads/2017/08/innovacion-bbva-100817-1024x551.jpg"
  //               },
  //               {
  //                   id: 2,
  //                   title: "This is our second post",
  //                   previewText: "This is preview text 2",
  //                   thumbnail: "https://www.bbva.com/wp-content/uploads/2017/08/innovacion-bbva-100817-1024x551.jpg"
  //               },
  //           ]
  //       })
  //     }, 2000);
  //   })
  //   .then(data => {
  //     context.store.commit('setPosts', data.loadedPosts)
  //   })
  //   .catch(err => {
  //     context.error(err)
  //   })
  // },

  computed: {
    loadedPosts() {
      return this.$store.getters.getLoadedPosts
    }
  }
}
</script>

<style scoped>
.post-page {
    display: grid;
    place-items: center;
}
</style>