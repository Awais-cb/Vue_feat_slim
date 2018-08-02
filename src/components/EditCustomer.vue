<template>
	<div class="EditCustomer container">
		<router-link v-bind:to="'/customer/'+customer.c_id" class='btn btn-default btn-sm'>Back</router-link>
	   	<h1 class="page-header">Edit Customer</h1>
	   	<Alert v-if='alert' v-bind:message='alert'/>
	  	<form v-on:submit="updateCustomer">
		  	<div class="well">
	            <h4>Customer Info</h4>
	            <div class="form-group">
	                <label>First Name</label>
	                <input type="text" class="form-control" placeholder="First Name" v-model="customer.c_fname">
	            </div>
	            <div class="form-group">
	                <label>Last Name</label>
	                <input type="text" class="form-control" placeholder="Last Name" v-model="customer.c_lname">
	            </div>
	        </div>
	        <div class="well">
	            <h4>Customer Contact</h4>
	            <div class="form-group">
	                <label>Email</label>
	                <input type="text" class="form-control" placeholder="Email" v-model="customer.c_email">
	            </div>
	            <div class="form-group">
	                <label>Phone</label>
	                <input type="text" class="form-control" placeholder="Phone" v-model="customer.c_phone">
	            </div>
	        </div>

	        <div class="well">
	            <h4>Customer Location</h4>
	            <div class="form-group">
	                <label>Address</label>
	                <input type="text" class="form-control" placeholder="Address" v-model="customer.c_address">
	            </div>
	            <div class="form-group">
	                <label>City</label>
	                <input type="text" class="form-control" placeholder="City" v-model="customer.c_city">
	            </div>
	            <div class="form-group">
	                <label>State</label>
	                <input type="text" class="form-control" placeholder="State" v-model="customer.c_state">
	            </div>
	        </div>
	        <button type="submit" class="btn btn-primary">Update</button>	
	  	</form> 
	</div>
</template>

<script>
import Alert from './Alert';	
export default {
  name: 'EditCustomer',
  data () {
    return {
    	customer:[],
    	alert:''
    }
  },
  	methods: {
	  	updateCustomer:function(e) {
	  		e.preventDefault();
	  		console.log(this.customer);
	  		if(!this.customer.c_fname || !this.customer.c_lname || !this.customer.c_email || !this.customer.c_phone || !this.customer.c_address || !this.customer.c_city || !this.customer.c_state){
	  			this.alert = 'Please file in all required feilds';
	  		}else{
	  			let updatedCustomer={
	  				fname:this.customer.c_fname,
	  				lname:this.customer.c_lname,
	  				email:this.customer.c_email,
	  				phone:this.customer.c_phone,
	  				address:this.customer.c_address,
	  				city:this.customer.c_city,
	  				state:this.customer.c_state
	  			}
	  			// submitting to api
	  			this.$http.put('http://slimapp.com/api/customer/update/'+this.$route.params.id,updatedCustomer).then(function(response) {
	  				response = JSON.parse(response.bodyText);
	  				var alertMessage;
	  				if(jQuery.isEmptyObject(response.error))
	  					alertMessage = response.notice.text;
	  				else
	  					alertMessage = response.error.connection_failed;
	  					 

	  				this.$router.push({path:'/',query:{alert:alertMessage}});
	  			});
	  		}
	  	},
	  	getCustomerDetails:function (id) {
	  		this.$http.get('http://slimapp.com/api/get_customer/'+id).then(function (response) {
	        	this.customer = response.body;
	        	// console.log(this.customer);
	        });
		}
  	},
  	created:function () {
  		this.getCustomerDetails(this.$route.params.id);
  	},
  	components:{
  		Alert
  	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
