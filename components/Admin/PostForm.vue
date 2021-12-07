<template>
    <div class="admin-new-post-page">
        <section class="new-post-form">
            <form @submit.prevent='onSave'>
                <UIAppControlInput v-model="editedPost.author">Author Name</UIAppControlInput>
                
                <UIAppControlInput v-model="editedPost.title">Title</UIAppControlInput>
                        
                <UIAppControlInput v-model="editedPost.thumbnail">Thumbnail Link</UIAppControlInput>
                        
                <UIAppControlInput
                    control-type="textarea"
                    v-model="editedPost.content">Content</UIAppControlInput>
                
                <UIAppControlInput
                    control-type="textarea"
                    v-model="editedPost.previewText">Preview text</UIAppControlInput>
                        
                <UIAppButton type="submit">Save</UIAppButton>
                        
                <UIAppButton
                    type="button"
                    style="margin-left: 10px"
                    btn-style="cancel"
                    @click="onCancel">Cancel
                </UIAppButton>
            </form>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            editedPost: this.data ? {...this.data} : { author: '', title: '', thumbnail: '', content: '', previewText: ''}
        }
    },

    methods: {
        onSave() {
            this.$emit('submit', this.editedPost)
        },
        onCancel() {
            this.$router.push('/admin/')
        }
    }
}
</script>

<style scoped>
  .admin-new-post-page {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
    align-items: center;
    min-height: 100vh;
    box-sizing: border-box;
    margin: 0;
  }

  .new-post-form {
    width: 100%;
    max-width: 500px;
  }
</style>