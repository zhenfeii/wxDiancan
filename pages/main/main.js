Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		seller: [],
		userInfo: {},
		weather: {
		},
		location: {},
		nolocationFlag: true       
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let app = getApp()
		let that = this

		wx.request({
			url: app.host + '/api/seller',
			data: {},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				// success
				if (res.data.code == 200) {
					that.setData({
						seller: res.data.data
					})
					console.log("获取seller[]成功！")
				}
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})

		//一个很实用的api，可以获取地址，IP，经度纬度
		wx.request({
			url: 'http://ip-api.com/json',
			data: {},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				// success
				let IP = res.data.query

				//根据IP，来获取实时天气
				wx.request({
					//KEY: kcpopbac8eiw06n3(在心知天气，个人中心可以找到)
					url: 'https://api.seniverse.com/v3/weather/now.json?key=kcpopbac8eiw06n3&language=zh-Hans&unit=c&location=' + IP,
					method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					// header: {}, // 设置请求的 header
					success: function (res) {
						//天气编码temperature
						let code = res.data.results[0].now.code
						let temperature = res.data.results[0].now.temperature
						let text = res.data.results[0].now.text
						that.setData({
							weather: res.data.results[0].now
						})
					},
					fail: function () {
						// fail
					},
					complete: function () {
						// complete
					}
				})
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
		console.log(this.data.location)
	},

	/**
	 * 获取当前位置
	 */
	chooseLocation: function () {
		let that = this
		wx.chooseLocation({
			success: function (res) {
				// success
				that.setData({
					location: res,
					nolocationFlag: null
				})
				wx.setStorageSync('address', res.address)
				wx.setStorageSync('addressDetail', res.name)
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
		
	}
})