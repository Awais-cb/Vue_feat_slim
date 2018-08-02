<template>
	<div class="AddCustomer container">
		<router-link to="/" class='btn btn-default btn-sm'>Back</router-link>
	   	<h1 class="page-header">Add Customer</h1>
	   	<Alert v-if='alert' v-bind:message='alert'/>
	  	<form v-on:submit="addCustomer">
		  	<div class="well">
	            <h4>Customer Info</h4>
	            <div class="form-group">
	                <label>First Name</label>
	                <input type="text" class="form-control" placeholder="First Name" v-model="customer.first_name">
	            </div>
	            <div class="form-group">
	                <label>Last Name</label>
	                <input type="text" class="form-control" placeholder="Last Name" v-model="customer.last_name">
	            </div>
	        </div>
	        <div class="well">
	            <h4>Customer Contact</h4>
	            <div class="form-group">
	                <label>Email</label>
	                <input type="text" class="form-control" placeholder="Email" v-model="customer.email">
	            </div>
	            <div class="form-group">
	                <label>Phone</label>
	                <input type="text" class="form-control" placeholder="Phone" v-model="customer.phone">
	            </div>
	        </div>

	        <div class="well">
	            <h4>Customer Location</h4>
	            <div class="form-group">
	                <label>Address</label>
	                <input type="text" class="form-control" placeholder="Address" v-model="customer.address">
	            </div>
	            <div class="form-group">
	                <label>City</label>
	                <input type="text" class="form-control" placeholder="City" v-model="customer.city">
	            </div>
	            <div class="form-group">
	                <label>State</label>
	                <input type="text" class="form-control" placeholder="State" v-model="customer.state">
	            </div>
	        </div>
	        <button type="submit" class="btn btn-primary">Submit</button>	
	  	</form> 
	</div>
</template>

<script>
import Alert from './Alert';	
export default {
  name: 'AddCustomer',
  data () {
    return {
    	customer:[],
    	alert:''
    }
  },
  methods: {
  	addCustomer:function(e) {
  		e.preventDefault();
  		if(!this.customer.first_name || !this.customer.last_name || !this.customer.email || !this.customer.phone || !this.customer.address || !this.customer.city || !this.customer.state){
  			this.alert = 'Please file in all required feilds';
  		}else{
  			let newCustomer={
  				fname:this.customer.first_name,
  				lname:this.customer.last_name,
  				email:this.customer.email,
  				phone:this.customer.phone,
  				address:this.customer.address,
  				city:this.customer.city,
  				state:this.customer.state
  			}
  			// submitting to api
  			this.$http.post('http://slimapp.com/api/add_customer',newCustomer).then(function(response) {
  				response = JSON.parse(response.bodyText);
  				var alertMessage;
  				if(jQuery.isEmptyObject(response.error))
  					alertMessage = response.notice.text;
  				else
  					alertMessage = response.error.connection_failed;
  					 

  				this.$router.push({path:'/',query:{alert:alertMessage}});
  			});
  		}
  	}
  },
  components:{
  	Alert
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
