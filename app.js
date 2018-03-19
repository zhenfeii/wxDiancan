//app.js
App({
  onLaunch: function () {
		var that = this
		// 登录
		var code = null
    wx.login({
      success: res => {
				code = res.code
				console.log("login success")
				/**
				 * 官文文档：
				 * code	String	用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换							取 openid 和 session_key 等信息
				 */
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				
				wx.getUserInfo({
					success: res => {
						// 可以将 res 发送给后台解码出 unionId
						console.log('getUserInfo success',res)
						var userInfo = res.userInfo
						var nickName = userInfo.nickName
						var avatarUrl = userInfo.avatarUrl
						var gender = userInfo.gender //性别 0：未知、1：男、2：女
						var province = userInfo.province
						var city = userInfo.city
						var country = userInfo.country

						//把用户信息存储到本地
						wx.setStorageSync('name', nickName)
						wx.setStorageSync('avatarUrl', avatarUrl)


						/**
						 *  1，把code发送给后台，后台获取session_key 和 openid
						 *  2，然后查询数据库user表有没有这个用户(要把openid)
						 * 	3, 若无，则新增加一条记录(增加一个用户)
						 */
						wx.request({
							url: getApp().host + '/api/login',
							data: {
								code: code,
								name: nickName,
								avatarUrl: avatarUrl,
								gender: gender,
								province: province,
								city: city,
								country: country
							},
							method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
							// header: {}, // 设置请求的 header
							success: function(res){
								
								wx.setStorageSync('openid', res.data.data.openid)

								//把用户信息set到userInfo
								let userInfoObject = {name:nickName, avatarUrl: avatarUrl}
								that.globalData.userInfo = userInfoObject

								console.log("/api/login success")
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
      }
    })
    
  },
  globalData: {
    userInfo: null
	},
	// host: "http://localhost:8080/wx"	
	host: "http://7qdnyi.natappfree.cc/wx"
})