<template>
  <Dialog v-model:open="usersStore.isUserModalOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Информация о пользователе</DialogTitle>
        <DialogDescription> Детальная информация о выбранном пользователе </DialogDescription>
      </DialogHeader>

      <!-- Карточка пользователя -->
      <div class="space-y-4" v-if="user">
        <!-- Имя и логин -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-muted-foreground">Имя</label>
            <div class="p-2 bg-muted/50 rounded-md min-h-10">
              {{ user.name || 'Не указано' }}
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-muted-foreground">Логин</label>
            <div class="p-2 bg-muted/50 rounded-md min-h-10">
              {{ user.username || 'Не указано' }}
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-muted-foreground">Электронная почта</label>
          <div class="p-2 bg-muted/50 rounded-md min-h-10">
            {{ user.email || 'Не указано' }}
          </div>
        </div>

        <!-- Телефон -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-muted-foreground">Телефон</label>
          <div class="p-2 bg-muted/50 rounded-md min-h-10">
            {{ user.phone || 'Не указано' }}
          </div>
        </div>

        <!-- Веб-сайт -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-muted-foreground">Веб-сайт</label>
          <div class="p-2 bg-muted/50 rounded-md min-h-10">
            <a
              v-if="user.website"
              :href="`https://${user.website}`"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              {{ user.website }}
            </a>
            <span v-else class="text-muted-foreground">Не указано</span>
          </div>
        </div>

        <!-- Компания -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-muted-foreground">Компания</label>
          <div class="p-2 bg-muted/50 rounded-md min-h-10">
            {{ user.company?.name || 'Не указано' }}
          </div>
        </div>

        <!-- Адрес -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-muted-foreground">Адрес</label>
          <div class="p-2 bg-muted/50 rounded-md min-h-10">
            {{ formatAddress(user.address) }}
          </div>
        </div>
      </div>

      <!-- Состояние ошибки -->
      <div v-else class="text-center py-8 text-muted-foreground">Пользователь не найден</div>

      <DialogFooter>
        <Button variant="outline" @click="usersStore.closeUserModal">Закрыть</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

const user = computed(() => {
  if (!usersStore.selectedUserId) return null
  return usersStore.getUserById(usersStore.selectedUserId)
})

// Форматирование адреса
const formatAddress = (address) => {
  if (!address) return 'Не указано'

  const parts = []
  if (address.street) parts.push(address.street)
  if (address.suite) parts.push(address.suite)
  if (address.city) parts.push(address.city)

  return parts.length > 0 ? parts.join(', ') : 'Не указано'
}
</script>
