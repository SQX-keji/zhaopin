<template>
	<view>
		<!-- #ifdef H5 -->
		<image class="bgImg1"
			src="https://zhaopin.xianmaxiong.com/file/uploadPath/2022/09/16/7c9fd30d3d119c3a2381739f279285c5.png"
			mode="widthFix"></image>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<image class="bgImg"
			src="https://zhaopin.xianmaxiong.com/file/uploadPath/2022/09/16/7c9fd30d3d119c3a2381739f279285c5.png"
			mode="widthFix"></image>
		<!-- #endif -->

		<view class="title1">
			请选择您的登录状态
		</view>
		<view class="title2">
			欢迎来到招聘平台选择你的状态开启使用吧
		</view>
		<!-- 选择按钮 -->
		<view class="selectBtn flex justify-center">
			<view class="selectBtn1 flex align-center justify-center" @click="gotoVers(2)">
				我要招人
			</view>
			<view class="selectBtn2 flex align-center justify-center" @click="gotoVers(1)">
				我要应聘
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userType: '', //用户类型 1:求职者 2:招聘者
				CompanyList: '', //企业数据
			};
		},
		onShow() {
			this.userType = uni.getStorageSync('userType')
			console.log(uni.getStorageSync('token'))
			// #ifdef MP-WEIXIN
			uni.hideHomeButton()
			// #endif
		},
		methods: {
			/**
			 * 获取用户企业实名数据
			 */
			getCompany() {
				this.$Request.get("/app/company/selectCompanyByUserId").then(res => {
					if (res.code == 0 && res.data) {
						this.CompanyList = res.data
						if (this.CompanyList.status == 1) {
							uni.showModal({
								title: '提示',
								content: '您提交的企业认证正在审核，是否查看修改?',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.navigateTo({
											url: '/my/renzheng/index'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else if (this.CompanyList.status == 2) { //已进行企业认证并且已通过则修改用户类型为2并跳转至企业端首页
							if (this.userType == 1) { //若用户类型为1则修改身份为2跳转至首页
								this.$Request.postT("/app/user/updateUserEntity", {
									userType: 2
								}).then(res => {
									if (res.code == 0) {
										// return
										uni.setStorageSync('companyId', this.CompanyList.companyId)
										uni.setStorageSync('userType', 2)
										// uni.reLaunch({
										// 	url:'/pages/index/index'
										// })
										uni.switchTab({
											url: '/pages/index/index'
										})
									} else {
										uni.showToast({
											title: '切换失败，请重试！',
											icon: 'none'
										})
									}
								})
							} else { //否则直接跳转至首页即可
								uni.setStorageSync('companyId', this.CompanyList.companyId)
								uni.setStorageSync('userType', 2)
								// uni.reLaunch({
								// 	url:'/pages/index/index'
								// })
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						} else if (this.CompanyList.status == 3) {
							uni.showModal({
								title: '提示',
								content: '您提交的企业认证已被拒绝，是否查看修改?',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.navigateTo({
											url: '/my/renzheng/index'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					} else {
						uni.showModal({
							title: '提示',
							content: '您还未企业认证,请先进行认证',
							confirmColor: '#00B88F',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url: '/my/renzheng/index'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}
				})
			},
			//选择登录身份
			gotoVers(type) {
				//用户端直接修改用户类型为1然后跳转至用户端首页
				if (type == 1) { //用户端
					//判断登录用户的userType 
					if (this.userType == 1) { //若为1则直接跳转至首页
						uni.setStorageSync('userType', 1)
						// uni.reLaunch({
						// 	url: '/pages/index/index'
						// })
						uni.switchTab({
							url:'/pages/index/index'
						})
					} else { //若为2，则修改用户的userType=2再跳转至首页
						let data = {
							userType: 1
						}
						this.$Request.postT("/app/user/updateUserEntity", data).then(res => {
							if (res.code == 0) {
								uni.setStorageSync('userType', 1)
								// uni.reLaunch({
								// 	url: '/pages/index/index'
								// })
								uni.switchTab({
									url:'/pages/index/index'
								})
							} else {
								uni.showToast({
									title: '切换失败，请重试!'
								})
							}
						})
					}
				} else { //企业端
					/**
					 * 企业端则判断该用户是否进行企业认证，
					 * 若认证成功则修改用户状态为2跳转至企业端首页，
					 * 若没有进行企业认证或审核中或审核失败则提示是否进行企业认证，选择是则跳转至认证的页面（用户类型还是为1）
					 */
					this.getCompany()
					// if (this.userType == 1) { //原本用户类型为1
					// 	this.getCompany()
					// } else { //用户类型本来就为2
					// 	uni.setStorageSync('userType', 2)
					// 	uni.reLaunch({
					// 		url: '/pages/index/index'
					// 	})
					// 	// uni.switchTab({
					// 	// 	url:'/pages/index/index'
					// 	// })
					// }
				}
			}
		}
	}
</script>

<style lang="scss">
	.bgImg1 {
		width: 100%;
		position: fixed;
		top: 86rpx;
		left: 0%;
		z-index: -1;
	}

	.bgImg {
		width: 100%;
		position: fixed;
		top: 10%;
		left: 0%;
		z-index: -1;
	}

	.title1 {
		width: 100%;
		text-align: center;
		margin-top: 48vh;
		font-size: 38rpx;
		color: #1A1A1A;
		font-weight: 800;
	}

	.title2 {
		width: 100%;
		text-align: center;
		margin-top: 20rpx;
		color: #999999;
		font-size: 26rpx;
		font-weight: 400;
	}

	.selectBtn {
		width: 100%;
		height: 90rpx;
		margin-top: 200rpx;
	}

	.selectBtn1 {
		width: 260rpx;
		height: 100%;
		border-radius: 8rpx;
		background-color: #ffffff;
		color: #00B88F;
		font-size: 28rpx;
		font-weight: bold;
		border: 2rpx solid #00B88F;
	}

	.selectBtn2 {
		width: 260rpx;
		height: 100%;
		border-radius: 8rpx;
		background-color: #00B88F;
		color: #ffffff;
		margin-left: 49rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
</style>
