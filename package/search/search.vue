<template>
	<view>
		<!-- 搜索 -->
		<view class="search flex align-center justify-center">
			<view class="search-box">
				<u-search placeholder="搜索岗位" shape="square" @clear="clear" v-model="keyword" @custom="custom"
					@search="custom"></u-search>
			</view>
		</view>
		<block v-if="show">
			<view class="searchJl flex justify-center">
				<view class="searchJl-box">
					<view class="searchJl-box-title">
						热门搜索
					</view>
					<view class="searchJl-box-label flex align-center flex-wrap">
						<view class="searchJl-box-item" @click="goSearch(item.keyWord)"
							v-for="(item,index) in searchList" :key="index">
							{{item.keyWord}}
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<!-- 筛选 -->
			<view class="screen flex justify-center align-center">
				<view class="screen-box">
					<view class="topbg-sx-box flex justify-between align-center">
						<view class="topbg-sx-box-l flex align-center">
							<view class="topbg-sx-box-l-i" :class="currentSx==index?'active3':''"
								@click="currentSx = index" v-for="(item,index) in sxTypeList" :key="index">
								{{item.name}}
							</view>
						</view>
						<view class="topbg-sx-box-r flex align-center">
							<text style="color: #00B78F;font-size: 28rpx;font-weight: 500;margin-right: 10rpx;"
								@click="goNav('/package/screen/city?city='+city+'&county='+county)">{{county?county:city}}</text>
							<u-icon name="arrow-down-fill" color="#00B78F" size="20"
								@click="goNav('/package/screen/city?city='+city+'&county='+county)"></u-icon>

							<text style="color: #CCCCCC;margin-left: 30rpx;margin-right: 30rpx;">|</text>

							<text style="color: #999999;font-size: 28rpx;font-weight: 500;margin-right: 10rpx;"
								@click="goNav('/package/screen/screen')">筛选</text>
							<u-icon name="arrow-down-fill" color="#CCCCCC" size="20"
								@click="goNav('/package/screen/screen')"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<!-- 岗位推荐 -->
			<view class="gwList flex justify-center" v-if="dataList.length>0">
				<view class="gwList-box">
					<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
						<view class="gwList-box-item flex justify-center" @click="gotoInfo(item.postPushId)"
							v-for="(item,index) in dataList" :key="index">
							<view class="gwList-box-item-box">
								<view class="gwList-box-item-box-title flex justify-between align-center">
									<text>{{item.ruleClassifyName}}</text>
									<text>{{item.salaryRange}}</text>
								</view>
								<view class="gwList-box-item-box-label flex align-center flex-wrap">
									<text
										style="color: #666666;font-size: 26rpx;padding: 10rpx 25rpx 10rpx 25rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;"
										v-for="(ite,ind) in item.positionWelfare" :key="ind">{{ite}}</text>
								</view>
								<view class="gwList-box-item-box-name flex justify-between align-center">
									<text>{{item.company?item.company.companyName:''}}</text>
									<text v-if="item.company">{{item.company?item.company.companyPeople:''}}</text>
								</view>
								<view class="gwList-box-item-box-line"></view>
								<view class="gwList-box-item-box-info flex justify-between align-center">
									<view class="gwList-box-item-box-info-l flex align-center">
										<image :src="item.company?item.company.companyLogo:'../../static/logo.png'"
											style="width: 58rpx;height: 58rpx;border-radius: 50%;margin-right: 20rpx;"
											mode=""></image>
										<text
											v-if="item.company">{{item.company?item.company.companyLegalPerson:'未知'}}·创始人</text>
									</view>
									<view class="gwList-box-item-box-info-r">
										{{item.county}}
										{{item.address}}

									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- 暂无数据 -->
			<view class="gwList" v-else>
				<empty />
			</view>
		</block>
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
				show: false,
				keyword: '',
				currentSx: 0,
				sxTypeList: [{
						id: 1,
						name: '推荐',
					},
					{
						id: 2,
						name: '最新',
					}
				],
				token: '',
				page: 1,
				limit: 10,
				totlo: 1,
				city: '',
				county: '', //区
				education: '', //学历
				salaryRange: '', //薪资
				experience: '', //经验
				companyPeople: '', //公司规模
				industry: '', //行业
				longitude: '',
				latitude: '',
				dataList: [],
				searchList: [],
			};
		},
		watch: {
			currentSx(newData, oldData) {
				this.getUserList();
			},
		},
		onLoad() {
			let that = this
			//获取经纬度后请求岗位接口，经纬度用于筛选距离
			uni.getLocation({
				type: 'gcj02', //wgs84  gcj02
				success: function(res) {
					console.log(res, '地理位置');
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					that.getUserList();
				},
				fail: function() {
					console.log('获取地址失败');
				}
			})
			this.getMyRecordList()
		},
		onShow() {
			let that = this;
			if (!this.city) {
				if (uni.getStorageSync('city')) {
					this.city = uni.getStorageSync('city')
				} else {
					this.city = ''
				}
			}
			uni.$once('filterCity', data => {
				console.log(data, '选择的市')
				that.city = data.city
				that.county = data.county
				that.getUserList();
			})
			this.token = uni.getStorageSync('token');

			console.log(uni.getStorageSync('filter'), '1111111111');
			if (uni.getStorageSync('filter') && (uni.getStorageSync('filter')).length > 0) {
				let filter = uni.getStorageSync('filter')
				filter.map(item => {
					let arr = []
					item.list.map(ite => {
						if (ite.value != '不限') {
							arr.push(ite.value)
						}
					})
					switch (item.name) {
						case '学历':
							this.education = arr.join(',')
							break;
						case '薪资':
							this.salaryRange = arr.join(',')
							break;
						case '经验':
							this.experience = arr.join(',')
							break;
						case '公司规模':
							this.companyPeople = arr.join(',')
							break;
						case '行业':
							this.industry = arr.join(',')
							break;
					}

				})
			} else {
				this.education = '' //学历
				this.experience = '' //经验
				this.industry = '' //行业
				this.salaryRange = '' //薪资
				this.companyPeople = '' //公司规模
			}
			that.getUserList();
		},
		onPullDownRefresh() {
			this.page = 1
			this.getUserList();
		},
		onReachBottom() {
			if (this.page < this.totlo) {
				this.page += 1
				this.getUserList();
			}
		},
		methods: {
			/**
			 * @param {Object} postPushId
			 * 岗位详情
			 */
			gotoInfo(postPushId) {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/index/game/order?postPushId=' + postPushId
					})
				} else {
					this.noLogin()
				}

			},
			//我的搜索关键词
			getMyRecordList() {
				this.$Request.get('/app/record/getMyRecordList', {
					userId: uni.getStorageSync('userId') ? uni.getStorageSync('userId') : ''
				}).then(res => {
					if (res.code == 0) {
						this.searchList = res.data.records
						if (this.searchList.length > 0) {
							this.show = true
						} else {
							this.show = false
							this.custom()
						}
					}
				})
			},
			/**
			 * 清空搜索内容
			 */
			clear() {
				this.page = 1
				this.getUserList();
			},
			/**
			 * @param {Object} keyword
			 * 热词搜索
			 */
			goSearch(keyword) {
				this.show = false
				this.keyword = keyword
				this.getUserList();
			},
			/**
			 * @param {Object} e
			 * 用户点击搜索时触发
			 */
			custom(e) {
				this.show = false
				this.page = 1
				this.getUserList()
			},
			/**
			 * 获取岗位列表
			 */
			getUserList() {
				let data = {
					page: this.page,
					limit: this.limit,
					postType: '',
					ruleClassifyName: this.keyword, //岗位名称
					screen: +this.currentSx + 1, //1推荐 2最新
					county: this.county, //区
					city: this.city, //城市
					salaryRange: this.salaryRange, //薪资范围
					education: this.education, //学历
					experience: this.experience, //经验
					industry: this.industry, //行业
					companyPeople: this.companyPeople, //公司规模
					lng: this.longitude,
					lat: this.latitude,
					userId: uni.getStorageSync('userId') ? uni.getStorageSync('userId') : ''
				}
				this.$Request.get('/app/postPush/userGetPostPushList', data).then(res => {
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						res.data.records.map(item => {
							if (item.positionWelfare) {
								item.positionWelfare = item.positionWelfare.split(',')
							} else {
								item.positionWelfare = []
							}
						})
						if (this.page == 1) {
							this.dataList = res.data.records
						} else {
							this.dataList = [...this.dataList, ...res.data.records]
						}
						this.totlo = res.data.pages
					}
				})
			},
			//跳转
			goNav(url) {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: url
					})
				} else {
					this.noLogin()
				}

			},
			//未登录
			noLogin() {
				uni.showModal({
					title: '提示',
					content: '您还未登录,请先登录',
					confirmColor: '#00B88F',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// uni.reLaunch({
							// 	url:'/pages/public/login'
							// })
							uni.navigateTo({
								url: '/pages/public/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F7;
	}

	.active3 {
		color: #1A1A1A !important;
		font-size: 28rpx !important;
		font-weight: 800 !important;
	}

	.search {
		width: 100%;
		height: 88rpx;
		background-color: #ffffff;
		position: fixed;
		top: 0;
		z-index: 9999;

		.search-box {
			width: 686rpx;
			height: 60rpx;
		}
	}

	.screen {
		width: 100%;
		height: 100rpx;
		background-color: #ffffff;
		position: fixed;
		top: 88rpx;
		z-index: 9999;

		.screen-box {
			width: 686rpx;
			height: 80rpx;

			.topbg-sx-box {
				width: 686rpx;
				height: 25rpx;
				margin-top: 30rpx;

				.topbg-sx-box-l-i {
					color: #999999;
					font-size: 28rpx;
					font-weight: 500;
					margin-right: 38rpx;
				}
			}
		}
	}

	.searchJl {
		width: 100%;
		background-color: #ffffff;
		position: fixed;
		top: 80rpx;
		height: calc(100vh - 80rpx);

		.searchJl-box {
			width: 686rpx;
			height: 100%;

			.searchJl-box-title {
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
				margin-top: 40rpx;
			}

			.searchJl-box-label {
				width: 100%;
				margin-top: 20rpx;

				.searchJl-box-item {
					padding: 20rpx;
					border-radius: 8rpx;
					background-color: #F5F5F5;
					color: #333333;
					font-size: 24rpx;
					font-weight: 500;
					margin-right: 20rpx;
					margin-top: 20rpx;
				}
			}
		}
	}

	.gwList {
		width: 100%;
		margin-top: 200rpx;

		.gwList-box {
			width: 686rpx;
			height: 100%;

			.gwList-box-item {
				width: 100%;
				// height: 329rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
			}

			.gwList-box-item-box {
				width: 623rpx;
				height: 100%;

				.gwList-box-item-box-title {
					margin-top: 30rpx;

					text:nth-of-type(1) {
						color: #1F1F1F;
						font-size: 38rpx;
						font-weight: 800;
					}

					text:nth-of-type(2) {
						color: #00B88F;
						font-size: 38rpx;
						font-weight: bold;
					}
				}

				.gwList-box-item-box-label {
					margin-top: 30rpx;
				}

				.gwList-box-item-box-name {
					margin-top: 24rpx;
					color: #999999;
					font-size: 28rpx;
					font-weight: 500;
				}

				.gwList-box-item-box-line {
					width: 100%;
					border: 1rpx solid #E6E6E6;
					margin-top: 30rpx;
					margin-bottom: 20rpx;
				}

				.gwList-box-item-box-info {
					font-size: 26rpx;

					.gwList-box-item-box-info-l {
						color: #1A1A1A;
					}

					.gwList-box-item-box-info-r {
						color: #999999;
					}
				}
			}
		}
	}
</style>