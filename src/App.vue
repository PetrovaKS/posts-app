<template>
  <DefaultLayout>
    <PostsPage />
    <SimpleToaster />
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PostsPage from '@/pages/PostsPage.vue'
import SimpleToaster from '@/components/ui/toast/SimpleToaster.vue'
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useUsersStore } from '@/stores/users'

const postsStore = usePostsStore()
const usersStore = useUsersStore()

onMounted(async () => {
  await postsStore.fetchPosts()
  await usersStore.fetchUsers()
})
</script>
