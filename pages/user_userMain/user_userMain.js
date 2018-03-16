Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: '',
		avatarUrl: '',
		phone: '13172213691'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let name = wx.getStorageSync('name')
		let avatarUrl = wx.getStorageSync('avatarUrl')
		this.setData({
			username: name,
			avatarUrl: avatarUrl

		})
	}
})