<template>
  <div class="details container">
    <router-link to="/" class='btn btn-default btn-sm'>Back</router-link>
    <h1 class="page-header">{{customer.c_fname}} {{customer.c_lname}}
		<span class="pull-right"><button class='btn btn-danger' v-on:click="deleteCustomer(customer.c_id)" >Delete</button> </span>
		<span class="pull-right edit-btn"><router-link class='btn btn-primary' v-bind:to="'/customer/edit/'+customer.c_id" >Edit</router-link> </span>
    </h1>
    <ul class="list-group">
            <li class="list-group-item">
            	<span class="glyphicon glyphicon-envelope"></span> 
            	{{customer.c_phone}}
            </li>
            <li class="list-group-item">
            	<span class="glyphicon glyphicon-envelope"></span> 
            	{{customer.c_email}}
            </li>
        </ul>

        <ul class="list-group">
            <li class="list-group-item"><b>Address: </b> {{customer.c_address}}</li>
            <li class="list-group-item"><b>City: </b>{{customer.c_city}}</li>
            <li class="list-group-item"><b>State: </b>{{customer.c_state}}</li>
        </ul>
  </div>
</template>

<script>
	export default {
	  name: 'CustomerDetails',
	  data () {
	    return {
	    	customer:[]
	    }
	  },
	  methods:{
	  	getCustomerDetails:function (id) {
	  		this.$http.get('http://slimapp.com/api/get_customer/'+id).then(function (response) {
	        	this.customer = response.body;
	        });
	  	},
	  	deleteCustomer:function (id) {
	  		if (confirm('Are you sure you want to delete '+this.customer.c_fname)) {
				this.$http.delete('http://slimapp.com/api/customer/delete/'+id).then(function (response) {
					
	  				response = JSON.parse(response.bodyText);
	  				var alertMessage;
	  				
	  				if(jQuery.isEmptyObject(response.error))
	  					alertMessage = response.notice.text;
	  				else
	  					alertMessage = response.error.connection_failed;
	  				
	  				this.$router.push({path:'/' , query:{alert:alertMessage}});
		        
		        });
			}else{
				return;
			}
		}
	  },
	  created:function () {
	  	this.getCustomerDetails(this.$route.params.id);
	  }
	}
</script>
<style scoped>
	.edit-btn{
		padding-right:30px;
	}
</style>
