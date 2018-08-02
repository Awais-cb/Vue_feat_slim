// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Customers from './components/Customers'
import About from './components/About'
import AddCustomer from './components/AddCustomer'
import CustomerDetails from './components/CustomerDetails'
import EditCustomer from './components/EditCustomer'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(vueResource)

// creating router object
const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
		{path:'/',component:Customers},
		{path:'/about',component:About},
		{path:'/add_customer',component:AddCustomer},
		{path:'/customer/:id',component:CustomerDetails},
		{path:'/customer/edit/:id',component:EditCustomer},
	]
});



// mention router here and wrapper with id of app
// vm is vue instance "vue model" which takes 'options' object 
const vm = new Vue({
	router,
	template:`
		<div id='app'>
			<nav class="navbar navbar-inverse">
		      <div class="container">
		        <div class="navbar-header">
		          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span class="sr-only">Toggle navigation</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		          </button>
		          <router-link class="navbar-brand" to="/">Customers's demo app</router-link>
		        </div>
		        <div id="navbar" class="collapse navbar-collapse">
		          <ul class="nav navbar-nav">
		            <li><router-link to='/'>Home</router-link></li>
		            <li><router-link to="/about">About</router-link></li>
		          </ul>
		          <ul class="nav navbar-nav navbar-right">
				    <li><router-link to="/add_customer">Add Customer</router-link></li>
				  </ul>
		        </div>
		      </div>
		    </nav>
			<router-view></router-view>
		</div>
	`
});

vm.$mount('#app');
