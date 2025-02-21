<template>
  <div class="deleteAccount">
    <DeleteAccount/>
  </div>
</template>

<script>
// @ is an alias to /src
import DeleteAccount from '@/components/DeleteAccount.vue'

export default {
  name: 'deleteAccount',
  components: {
    DeleteAccount
  }
}
</script>