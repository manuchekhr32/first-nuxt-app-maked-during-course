<template>
    <div class="home-page">
        <section class="intro">
            <h1>Get the latest tech news</h1>
        </section>
        <PostsPostList :posts="loadedPosts" />
    </div>
</template>

<script>
export default {
  head: {
    title: 'Home page'
  },

  // asyncData(context, callback) {
  //   setTimeout(() => {
  //     callback(null, {
  //       loadedPosts: [
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
  //     })
  //   }, 2000);
  // },
  computed: {
    loadedPosts() {
      return this.$store.getters.getLoadedPosts
    }
  }
}
</script>

<style>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/main-page-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>