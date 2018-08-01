<template>
  <div class="customers container">
   <h1 class="page-header">Manage Customers</h1>
   <table class="table table-striped">
     <thead>
       <tr>
         <th>First name</th>
         <th>Last name</th>
         <th>Email</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for='customer in customers'>
         <td>{{customer.c_fname}}</td>
         <td>{{customer.c_lname}}</td>
         <td>{{customer.c_email}}</td>
       </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
export default {
  name: 'Customers',
  data () {
    return {
      customers:[]
    }
  },
  methods:{
    getCustomers:function () {
      this.$http.get('http://slimapp.com/api/get_customers').then(function (response) {
        console.log(response.body);
        this.customers = response.body;
        
      });
    }
  },
  created:function () {
    this.getCustomers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
