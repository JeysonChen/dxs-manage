const path = require('path')

function resolve(dir) {
	return path.resolve(__dirname, dir)
}
const lessOptions = {
	javascriptEnabled: true,
}
const prefixOptions = {
	prefix: true,
}

// mock

module.exports = {
	devServer: {
		before(app) {
			console.log(app, '99999')
			// //测试hulk报表
			// app.use('/marketing', uuap);
			// app.use('/ugate',uuap);
		},
        proxy: {
            // 商品模块、配置模块
            '/Product': {
				target: 'https://www.dxduoxiansheng.com', //目标接口域名
				changeOrigin: true, //是否跨域
                secure: false, // 设置支持https协议的代理
                changeOrigin: true,
            },
            // 站点模块、团长模块
            '/Account': {
				target: 'https://www.dxduoxiansheng.com', //目标接口域名
				// changeOrigin: true, //是否跨域
                secure: true, // 设置支持https协议的代理
                // changeOrigin: true,
            },
            // 订单模块
            '/Order': {
				target: 'https://www.dxduoxiansheng.com', //目标接口域名
				changeOrigin: true, //是否跨域
                secure: false, // 设置支持https协议的代理
                changeOrigin: true,
			},            
		},
	},
	chainWebpack: (config) => {
		if (process.env.NODE_ENV === 'development') {
			console.log('development')
		}
		if (process.env.NODE_ENV === 'production') {
			console.log('production')
		}
		if (process.env.NODE_ENV === 'test') {
			console.log('test')
		}

		// config.module
		//     .rule('i')
		//     .test(/\.vue$/)
		//     // .pre()
		//     .tap(options => Object.assign({}, options, prefixOptions));
		// .tap(options => {
		//     options.prefix = true;
		// });

		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach((type) => {
			config.module
				.rule('less')
				.oneOf(type)
				.use('less-loader')
				.tap((options) => Object.assign({}, options, lessOptions))
		})
		config.resolve.alias
			.set('@', resolve('src'))
			.set('api', resolve('src/api'))
			.set('assets', resolve('src/assets'))
			.set('css', resolve('src/assets/styles'))
			.set('components', resolve('src/components'))
			.set('store', resolve('src/store'))
			.set('router', resolve('src/router'))
			.set('pages', resolve('src/pages'))
			.set('views', resolve('src/views'))
			.set('utils', resolve('src/utils'))
	},
	// css打包
	css: {
		extract: process.env.NODE_ENV !== 'development' ? true : false,
		requireModuleExtension: true,
	},

	publicPath: process.env.NODE_ENV !== 'development' ? './' : '',
	assetsDir: 'static',
	indexPath: 'index.html',
	lintOnSave: false,
}
