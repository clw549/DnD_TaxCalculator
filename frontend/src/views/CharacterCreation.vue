<template>
  <div class="createCharacter">
    <CreateCharacter/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateCharacter from '@/components/CharacterCreation.vue'

export default {
  name: 'createCharacter',
  components: {
    CreateCharacter
  }
}
</script>