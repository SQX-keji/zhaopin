<template>
	<view class="">
		<view v-if="msgList.length" class="margin-topW">
			<view class="flex padding-tb radius padding-lr-sm bg" @click="goMsg" v-for="(item,index) in msgList"
				:key='index'>
				<view>
					<image style="width: 80rpx;height: 80rpx;border-radius: 80rpx;"
						src="../../static/images/msg/msg.png"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="flex justify-between">
						<view class="text-white">{{item.title?item.title: '系统消息'}}</view>
						<view v-if="messageCount>0"
							style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
							{{messageCount}}
						</view>
					</view>
					<view>
						<view class="text-grey">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-topW">
			<view class="flex padding-tb radius padding-lr-sm bg" @click="goChat">
				<view>
					<image style="width: 80rpx;height: 80rpx;border-radius: 80rpx;"
						src="../../static/images/msg/msgs.png"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="flex justify-between">
						<view class="text-white">在线客服</view>
						<view v-if="userCount>0"
							style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
							{{userCount}}
						</view>
					</view>
					<view>
						<view class="text-grey">联系在线客服</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="chatList.length" class="margin-top-sm  content ">
			<view class="radius padding-lr-sm bg" style="margin-top: 4rpx;" @click="goIM(item)"
				v-for="(item,index) in chatList" :key='index'>
				<view class="flex padding-tb ">
					<view>
						<u-image shape="circle" width='80rpx' height="80rpx" :src="item.avatar"></u-image>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between align-center">
							<view class="text-white flex align-center userNameleng">
								<view class="">
									{{item.userName}}
								</view>
								<text class="text-grey"
									style="font-size: 26rpx;margin-left: 20rpx;">{{item.stationName}}</text>
							</view>
							<view class="text-grey">{{item.messageTime?getMonthOrDay(item.messageTime):''}}</view>
						</view>
						<view class="flex justify-between" style="margin-top: 10rpx;">
							<view class="text-grey" v-if="item.messageType == 1">{{item.content}}</view>
							<view class="text-grey" v-else-if="item.messageType == 18">位置</view>
							<view class="text-grey" v-else-if="item.messageType == 9">简历请求</view>
							<view class="text-grey" v-else-if="item.messageType == 6">微信请求</view>
							<view class="text-grey" v-else-if="item.messageType == 5">手机号请求</view>
							<view class="text-grey" v-else>[图片]</view>
							<view v-if="item.contentCount"
								style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
								{{item.contentCount}}
							</view>

						</view>
					</view>
				</view>
				<!-- <view class="flex padding-tb" v-else>
					<view>
						<u-image shape="circle" width='80rpx' height="80rpx" :src="item.avatar"></u-image>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between">
							<view class="text-white">{{item.userName}}</view>
							<view class="text-grey">{{item.messageTime?item.messageTime:''}}</view>
						</view>
						<view class="flex justify-between">
							<view class="text-grey" v-if="item.messageType == 1">{{item.content}}</view>
							<view class="text-grey" v-else-if="item.messageType == 18">位置</view>
							<view class="text-grey" v-else-if="item.messageType == 9">简历请求</view>
							<view class="text-grey" v-else-if="item.messageType == 6">微信请求</view>
							<view class="text-grey" v-else-if="item.messageType == 5">手机号请求</view>
							<view class="text-grey" v-else>[图片]</view>
							<view v-if="item.contentCount"
								style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
								{{item.contentCount}}
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>

		<empty v-if="!chatList.length && !msgList.length" content='暂无消息'></empty>
	</view>
</template>

<script>
	import empty from '../../components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				page: 1,
				limit: 100,
				chatList: [],
				userId: '',
				msgList: [],
				time: '',
				messageCount: 0,
				userCount: 0,
				arr: [],
				showModal: true,
			}
		},
		onLoad() {
			if (uni.getStorageSync('userId')) {
				this.getChatList()
			}

		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this
			if (uni.getStorageSync('token')) {
				that.getweiduMsg();
				that.getChatList()
				that.getMsgList()
				that.$nextTick(function() {
					that.messageCount = uni.getStorageSync('messageCount')
				})
			}
		},
		onShow() {
			let that = this
			that.userId = uni.getStorageSync('userId')
			if (that.userId) {
				that.time = setInterval(function() {
					that.getweiduMsg();
					that.getChatList()
					that.getMsgList()
					that.$nextTick(function() {
						that.messageCount = uni.getStorageSync('messageCount')
					})

				}, 1000)
				this.$Request.getT('/app/common/type/310').then(res => { //消息未读提醒
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				this.$Request.getT('/app/common/type/337').then(res => { //预约成功通知(通用)
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				this.$Request.getT('/app/common/type/338').then(res => { //订单状态通知
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				// #ifdef MP-WEIXIN
				if (this.showModal) {
					this.openMsg()
				}
				// #endif
			} else {
				that.chatList = []
				that.msgList = []
			}
		},
		onHide() {
			clearInterval(this.time)
		},
		methods: {
			//把时间转换为月日
			getMonthOrDay(time) {
				let date = new Date(time) // 获取时间
				// var year = date.getFullYear() // 获取年
				let month = date.getMonth() + 1 // 获取月
				let strDate = date.getDate() // 获取日
				return month + '月' + strDate + '日'
			},
			// 开启订阅消息
			openMsg() {
				console.log('订阅消息')
				var that = this
				uni.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						console.log(ret.subscriptionsSetting.itemSettings, '*************************************')
						// if (ret.subscriptionsSetting.itemSettings && Object.keys(ret.subscriptionsSetting.itemSettings).length == 2) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							uni.setStorageSync('sendMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										wx.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												console.log(JSON.stringify(re),
													'++++++++++++++')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
													// uni.setStorageSync('sendMsg', true)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										// uni.setStorageSync('sendMsg', true)
										console.log('确认')
										that.showModal = false
									} else if (res.cancel) {
										console.log('取消')
										// uni.setStorageSync('sendMsg', false)
										that.showModal = true
									}
								}
							})
						}
					}
				})
			},
			getweiduMsg() {
				this.$Request.get("/app/chats/userCount").then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.userCount = res.data
					}
				});
			},
			//在线客服
			goChat() {
				// uni.navigateTo({
				// 	url:'/my/setting/chat'
				// })
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					// console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							// console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								// console.log(re)
							}
						},
						fail: (res) => {
							// console.log(res)
						}
					})
				}
				// #endif
				let that = this
				if (uni.getStorageSync('userType') == 1) { //用户端
					// #ifdef MP-WEIXIN
					wx.openCustomerServiceChat({
						extInfo: {
							url: that.$queue.getData('kefu')
						},
						corpId: that.$queue.getData('kefuAppid'),
						success(res) {
							console.log(res)
						},
					})
					// #endif
					// #ifdef H5
					window.location.href = that.$queue.getData('kefu');
					// #endif
					// #ifdef APP
					let kefu = that.$queue.getData('kefu')
					console.log(kefu)
					plus.runtime.openURL(kefu, function(res) {});
					// #endif
				} else { //企业端
					// #ifdef MP-WEIXIN
					wx.openCustomerServiceChat({
						extInfo: {
							url: that.$queue.getData('kefuq')
						},
						corpId: that.$queue.getData('kefuAppidq'),
						success(res) {
							console.log(res)
						},
					})
					// #endif
					// #ifdef H5
					window.location.href = that.$queue.getData('kefuq');
					// #endif
					// #ifdef APP
					let kefu = that.$queue.getData('kefuq')
					console.log(kefu)
					plus.runtime.openURL(kefu, function(res) {});
					// #endif
				}

			},
			getChatList() {
				this.$Request.get("/app/chat/selectChatConversationPage", {
					page: this.page,
					limit: this.limit
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.chatList = res.data.list
					}
				});
			},
			getMsgList() {
				this.$Request.get("/app/message/selectMessageByUserIdLimit1").then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.msgList = res.data.list
					}
				});
			},
			goIM(e) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					// console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							// console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								// console.log(re)
							}
						},
						fail: (res) => {
							// console.log(res)
						}
					})
				}
				// #endif
				let userId = '';
				let userType = uni.getStorageSync('userType')
				console.log(e, 'aaaaaaaaa')
				if (userType == 2) { //当前登录用户为企业
					userId = e.userId
				} else { //当前登录用户为用户
					userId = e.focusedUserId
				}
				if (uni.getStorageSync('userType') == 1) {
					uni.navigateTo({
						url: '/pages/msg/im?chatConversationId=' + e.chatConversationId + '&byUserId=' + userId +
							'&postPushId=' + e.postPushId
					})
				} else {
					uni.navigateTo({
						url: '/pages/msg/im?chatConversationId=' + e.chatConversationId + '&byUserId=' + userId +
							'&resumesId=' + e.resumesId + '&postPushId=' + e.postPushId
					})
				}

			},
			goMsg() {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					// console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							// console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								// console.log(re)
							}
						},
						fail: (res) => {
							// console.log(res)
						}
					})
				}
				// #endif
				uni.navigateTo({
					url: '/pages/msg/message'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.bg {
		background: #FFFFFF;
	}

	.userNameleng {
		width: 80%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
</style>