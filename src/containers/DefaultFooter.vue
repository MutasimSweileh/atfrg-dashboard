<template>
      <TheFooter>
        <div>
          <!--footer-->
          <a href="https://atfrg.online">Atfrg</a>
          <span class="ml-1">&copy; 2020 Adhamz.</span>
        </div>
        <div class="ml-auto">
          <span class="mr-1">Powered by</span>
          <a href="https://adhamz.me">AdhamZ</a>
        </div>
      </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
}
</script>
