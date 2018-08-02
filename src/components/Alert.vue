<template>
	<div class="alert alert-warning alert-dismissible">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		{{message}}
	</div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['message'],
  data () {
    return {
    
    }
  }
}
</script>
<style scoped>

</style>
