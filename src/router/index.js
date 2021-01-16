import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'

const Goods = () => import('@/views/goods');
const Sides = () => import('@/views/sites');
const Order = () => import('@/views/order');
const Chief = () => import('@/views/chief');
const Configure = () => import('@/views/configure');

Vue.use(VueRouter)

const routes = [
	// 登录
	{
		path: '/',
		name: 'Login',
		component: Login,
	},
	// 商品------------------------------------------------------------------------
	{
		path: '/goods/:menu',
		// name: 'Publish',
        component: Goods,
        meta: { 
            name: 'goods'
        }
    },

	// 站点------------------------------------------------------------------
	{
		path: '/sites/:menu',
		// name: 'Sites',
        component: Sides,
        meta: { 
            name: 'sites'
        }
	},

    // 订单---------------------------------------------------------------------
    {
		path: '/order/:menu',
		// name: 'Publish',
        component: Order,
        meta: { 
            name: 'order'
        }
    },

	// 团长----------------------------------------------------------------
	{
		path: '/chief/:menu',
		
        component: Chief,
        meta: { 
            name: 'chief'
        }
    },
    // 配置---------------------------------------------------------------------
    {
		path: '/configure/:menu',
		// name: 'Publish',
        component: Configure,
        meta: { 
            name: 'configure'
        }
    }
]

const router = new VueRouter({
	routes,
})

const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
