Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		let app = getApp()
		let openId = wx.getStorageSync("openid")
		wx.request({
			url: app.host + '/api/order?openId=' + openId,
			data: {},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function(res){
				debugger
				// success
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			}
		})
		
	}
})