<template>
  <div class="customers container">
   <h1 class="page-header">Manage Customers</h1>
   <Alert v-if='alert' v-bind:message='alert' />
   <input type="text" class='form-control' placeholder="Enter last name" v-model="filterInput">
   <br>
   <table class="table table-striped">
     <thead>
       <tr>
         <th>First name</th>
         <th>Last name</th>
         <th>Email</th>
         <th>View</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for='customer in filterBy(customers,filterInput)'>
         <td>{{customer.c_fname}}</td>
         <td>{{customer.c_lname}}</td>
         <td>{{customer.c_email}}</td>
         <!-- as we are going to have a variable in 'to' so we will use v-bind  -->
         <td><router-link class='btn btn-default' v-bind:to="'/customer/'+customer.c_id">View</router-link></td>
       </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
  import Alert from './Alert'
  
  export default {
    name: 'Customers',
    data () {
      return {
        customers:[],
        alert:'',
        filterInput:''
      }
    },
    methods:{
      getCustomers:function () {
        this.$http.get('http://slimapp.com/api/get_customers').then(function (response) {
          this.customers = response.body;
        });
      },
      filterBy(customers,filterInput){
        // filterInput = filterInput.charAt(0).toUpperCase() + filterInput.slice(1);
        return customers.filter(function (customer) {
          return customer.c_lname.indexOf(filterInput) > -1;
        });
      }
    },
    // created hook is used to be called when the Vue instance is created
    created:function () {
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert
      }
      this.getCustomers();
    },
    // updated hook is used to automatically update Dom whenever there are changes in Vue instance
    // updated:function () {
    //   this.getCustomers();
    // },
    components:{
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
