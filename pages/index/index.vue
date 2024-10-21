<template>
	<view>
		<block v-if="XCXIsSelect!='是'">
			<view class="banner flex justify-center">
				<view class="banner-box">
					<swiper :indicator-dots="false" style="width: 100%;height: 100%;" :autoplay="true" :interval="300"
						:duration="1000">
						<swiper-item v-for="(item,index) in bannerList" :key="index" @click="goNave(item.url)">
							<view class="swiper-item" style="width: 100%;height: 100%;">
								<image :src="item.imageUrl" style="width: 100%;height: 100%;border-radius: 24rpx;"
									mode="scaleToFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="" style="width: 100%;margin-top: 20rpx;" v-for="(item,index) in dataList" :key="index">
				<view class=""
					style="padding: 20rpx 20rpx;width: 686rpx;background-color: #ffffff;border-radius: 18rpx;margin: auto;">
					<view class="">
						<text>{{item.company?item.company.companyName:''}}</text>信息简介
					</view>
					<view class="flex flex-wrap" style="margin-top: 20rpx;">
						<text
							style="color: #666666;font-size: 26rpx;padding: 10rpx 25rpx 10rpx 25rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;"
							v-for="(ite,ind) in item.positionWelfare" :key="ind">{{ite}}</text>
					</view>
					<view class="" style="margin-top: 20rpx;">
						<text>{{item.company?item.company.companyName:''}}提供数据支持</text>
					</view>
				</view>
			</view>

		</block>
		<block v-else>
			<!-- 用户端 -->
			<block v-if="userType==1">
				<view class="topbg">
					<view class="banner flex justify-center" v-if="bannerListuser.length!=0">
						<view class="banner-box">
							<swiper :indicator-dots="false" style="width: 100%;height: 100%;" :autoplay="true"
								:interval="300" :duration="1000">
								<swiper-item v-for="(item,index) in bannerListuser" :key="index"
									@click="goNave(item.url)">
									<view class="swiper-item" style="width: 100%;height: 100%;">
										<image :src="item.imageUrl"
											style="width: 100%;height: 100%;border-radius: 24rpx;" mode="scaleToFill">
										</image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<view class="announcement" v-if="gongao.length!=0">
						<view class="announcementbox">
							<view class="anount">最新公告</view>
							<view class="anounts" v-if="gongao.length>0">
								<u-notice-bar color="#333" bg-color="#e5fff2" padding="16rpx 24rpx" :volume-icon="false"
									style="height: 100%;" mode="vertical" :list="gongao"></u-notice-bar>
							</view>
							<view class="anounts flex align-center" style="padding-left: 30rpx;" v-else>
								暂无公告
							</view>
						</view>
					</view>
					<view v-if="gridlist.length!=0">
						<u-grid :col="4" :border="false">
							<u-grid-item bg-color="#00DD9A">
								<view v-for="(item,index) in gridlist" :key="index" style="text-align: center;"
									@click="goNave(item.url)">
									<image :src="item.imageUrl" style="width:80rpx;height: 80rpx;border-radius: 50%;">
									</image>
									<view style="color: #FFFFFF;">{{item.name}}</view>
								</view>
							</u-grid-item>

						</u-grid>
					</view>
				</view>
				<view
					style="background: #00DD9A;width: 100%;border-radius:0 0 24rpx 24rpx;position: sticky;top: 0px;z-index: 999;">
					<view class="topbg-type flex justify-center">
						<view class="topbg-type-box flex justify-between align-center">
							<view class="topbg-type-box-l flex align-center">
								<view class="topbg-type-box-l-i" :class="current==index?'active':''"
									@tap="current=index" v-for="(item,index) in typeList" :key="index">
									{{item.label}}
								</view>
							</view>
							<view class="topbg-type-box-r" @click="goNav('/package/search/search')">
								<u-icon name="search" color="#ffffff" size="40"></u-icon>
							</view>
						</view>
					</view>
					<!-- 求职意向 -->
					<view class="topbg-yx flex justify-center flex-wrap">
						<view class="topbg-yx-box flex justify-between align-center">
							<view class="topbg-yx-box-l ">
								<scroll-view scroll-x="true" class="topbg-scroll"
									:scroll-into-view="'bottomView'+currentjob" scroll-with-animation="true">
									<view class="topbg-yx-box-l-i" :id="'bottomView'+index"
										:class="currentjob==index?'active2':''" @click="currentjob=index"
										v-for="(item,index) in jobTypeList" :key="index">
										<view class="topbg-yx-box-l-i-c">
											<view class="topbg-yx-box-l-i-text">{{item.name}}</view>
											<view v-if="currentjob==index" class="topbg-yx-box-l-i-line"></view>
										</view>
									</view>
								</scroll-view>

							</view>
							<view class="topbg-yx-box-r flex align-center"
								@click="goNav('/package/jobIntention/jobIntention')">
								<text>添加求职意向</text>
								<u-icon name="plus-circle" color="#00B88F" size="38"></u-icon>
							</view>
						</view>
						<!-- 筛选 -->
						<view class="topbg-sx-box flex justify-between align-center" style="padding-bottom: 20rpx;">
							<view class="topbg-sx-box-l flex align-center">
								<view class="topbg-sx-box-l-i" :class="currentSx==index?'active3':''"
									@click="currentSx = index" v-for="(item,index) in sxTypeList" :key="index">
									{{item.name}}
								</view>
							</view>
							<view class="topbg-sx-box-r flex align-center">
								<text style="color: #00B78F;font-size: 28rpx;font-weight: 500;margin-right: 10rpx;"
									@click="goNav('/package/jobIntention/city')">{{city?city:'选择城市'}}</text>
								<u-icon name="arrow-down-fill" color="#00B78F" size="20"
									@click="goNav('/package/jobIntention/city')"></u-icon>

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
										<text>{{item.stationName}}</text>
										<text>{{item.salaryRange}}</text>
									</view>
									<view class="gwList-box-item-box-label flex align-center flex-wrap">
										<text
											style="color: #666666;font-size: 26rpx;padding: 10rpx 25rpx 10rpx 25rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;">
											{{item.education}}
										</text>
										<text
											style="color: #666666;font-size: 26rpx;padding: 10rpx 25rpx 10rpx 25rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;">
											{{item.experience}}
										</text>
										<text
											style="color: #666666;font-size: 26rpx;padding: 10rpx 25rpx 10rpx 25rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;"
											v-for="(ite,ind) in item.positionWelfare" :key="ind">{{ite}}</text>
									</view>
									<view class="gwList-box-item-box-name flex justify-between align-center">
										<text>{{item.company?item.company.companyName:''}}</text>
										<text
											v-if="item.company">{{item.company?item.company.companyPeople:'0人'}}</text>
									</view>
									<view class="gwList-box-item-box-line"></view>
									<view class="gwList-box-item-box-info flex justify-between align-center">
										<view class="gwList-box-item-box-info-l flex align-center">
											<image :src="item.company?item.company.companyLogo:'../../static/logo.png'"
												style="width: 58rpx;height: 58rpx;border-radius: 50%;margin-right: 20rpx;"
												mode=""></image>
											<view class="people" v-if="item.company">
												{{item.company.companyLegalPerson?item.company.companyLegalPerson:'未知'}}
											</view>·创始人
										</view>
										<view class="gwList-box-item-box-info-r">
											{{item.distance}} {{item.county}} {{item.address}}
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>


				</view>

				<!-- 暂无数据 -->
				<view class="gwList" v-else>
					<empty style="margin-top: 20vh;" />
				</view>

			</block>
			<!-- 企业版 -->
			<block v-else>
				<!-- banner -->
				<view class="banner flex justify-center">
					<view class="banner-box">
						<swiper :indicator-dots="false" style="width: 100%;height: 100%;" :autoplay="true"
							:interval="300" :duration="1000">
							<swiper-item v-for="(item,index) in bannerList" :key="index">
								<view class="swiper-item" style="width: 100%;height: 100%;">
									<image :src="item.imageUrl" style="width: 100%;height: 100%;border-radius: 24rpx;"
										mode="scaleToFill"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="announcement" v-if="gongao.length!=0">
					<view class="announcementbox">
						<view class="anount">最新公告</view>
						<view class="anounts" v-if="gongao.length>0">
							<u-notice-bar color="#333" bg-color="#e5fff2" padding="16rpx 24rpx" :volume-icon="false"
								style="height: 100%;" mode="vertical" :list="gongao"></u-notice-bar>
						</view>
					</view>
				</view>
				<view v-if="gridlist.length!=0">
					<u-grid :col="4" :border="false">
						<u-grid-item bg-color="#f2f2f7">
							<view v-for="(item,index) in gridlist" :key="index" style="text-align: center;"
								@click="goNave(item.url)">
								<image :src="item.imageUrl" style="width:80rpx;height: 80rpx;border-radius: 50%;">
								</image>
								<view style="color: #333333;">{{item.name}}</view>
							</view>
						</u-grid-item>

					</u-grid>
				</view>

				<!-- 筛选 -->
				<u-sticky @fixed="isfixed" @unfixed="isunfixed" :radius='40' h5-nav-height="0" :enable="enable">
					<view class="qySx flex justify-center" :class="isfixeds==true?'isfixed':'isfixeds'">
						<view class="qySx-box">
							<view class="qySx-box-sxp flex justify-between">
								<view class="qySx-box-l flex align-center">
									<scroll-view scroll-x="true" class="topbg-scroll"
										:scroll-into-view="'bottomView'+currentJobSx" scroll-with-animation="true">
										<view class="qySx-box-l-i flex flex-wrap align-center" :id="'bottomView'+index"
											@tap="currentJobSx=index;getDomWidth()"
											v-for="(item,index) in jobSxTypeList" :key="index">
											<view class="jobtitle" style="z-index: 999;"
												:class="currentJobSx==index?'activeQ':''">
												{{item.name}}
												<view class="jobtitleBom"
													:style="domeWidth>0?'width:'+domeWidth+'rpx':''"
													v-if="currentJobSx==index"
													style="height: 14rpx;background: linear-gradient(90deg, #08F3CE 0%, #05F3A7 100%);border-radius: 7rpx;">
												</view>
											</view>

										</view>
									</scroll-view>


								</view>
								<view class="qySx-box-r flex align-center" @click="goNavss('/package/addJob/addJob')">
									<text style="margin-right: 20rpx;color: #00B88F;">发布招聘</text>
									<u-icon name="plus-circle" color="#00B88F" size="38"></u-icon>
								</view>
							</view>
							<view class="qySx-box-sxs flex justify-between align-center">
								<view class="qySx-box-sxs-l flex align-center">
									<view class="qySx-box-sxs-l-i" @click="currentJobSxs=index"
										:class="currentJobSxs==index?'activeQs':''"
										v-for="(item,index) in jobSxsTypeList" :key="index">
										{{item.name}}
									</view>
								</view>
								<view class="qySx-box-sxs-r flex align-center">
									<text style="margin-right: 10rpx;color: #00B78F;"
										@click="goNav('/package/jobIntention/city')">{{city?city:'选择城市'}}</text>
									<u-icon name="arrow-down-fill" @click="goNav('/package/jobIntention/city')"
										style="margin-right: 30rpx;" color="#00B88F" size="20">
									</u-icon>
									<text style="margin-right: 10rpx;"
										@click="goNav('/package/screen/screen?type=2')">筛选</text>
									<u-icon name="arrow-down-fill" @click="goNav('/package/screen/screen?type=2')"
										color="#CCCCCC" size="20"></u-icon>
								</view>
							</view>

						</view>
					</view>
				</u-sticky>
				<!-- 简历列表 -->
				<view class="qyList flex justify-center">
					<view class="qyList-box">
						<view class="qyList-box-item flex justify-center" v-for="(item,index) in datasList" :key="index"
							@click="goNav('/pages/index/game/orderDet?resumesId='+item.resumesId)">
							<view class="qyList-box-item-box">
								<view class="qyList-box-item-info flex justify-between align-center">
									<view class="qyList-box-item-info-l">
										<view class="" style="color: #212121;font-size: 38rpx;font-weight: 800;">
											{{item.resumesName}}
										</view>
										<view class="flex align-center flex-wrap"
											style="color: #999999;font-size: 26rpx;margin-top: 10rpx;">
											<text>{{item.resumesAge}}岁</text>
											<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
											<text>{{item.resumesWorkExperience}}</text>
											<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
											<text>{{item.school}}</text>
											<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
											<text>期望{{item.resumesCompensation}}</text>
										</view>
									</view>
									<view class="qyList-box-item-info-r">
										<image :src="item.avatar?item.avatar:'../../static/logo.png'"
											style="width: 95rpx;height: 95rpx;border-radius: 50%;" mode=""></image>
									</view>
								</view>
								<view class="qyList-box-item-job flex align-center">
									<u-icon name="heart-fill" color="#00B88F" size="30" style="margin-right: 16rpx;">
									</u-icon>
									期望岗位:{{item.resumesPost}}
								</view>
								<view class="qyList-box-item-job flex align-center">
									<image src="../../static/images/qi.png"
										style="width: 30rpx;height: 32rpx;margin-right: 16rpx;" mode=""></image>
									<block v-if="item.resumesCompanyList[0]">
										{{item.resumesCompanyList[0]?item.resumesCompanyList[0].resumesTitle:''}} /
										{{item.resumesCompanyList[0]?item.resumesCompanyList[0].resumesPost:''}}
									</block>
									<block v-else>
										暂无
									</block>
								</view>
								<view class="qyList-box-item-rem" v-if="item.resumesDetails">
									优势:{{item.resumesDetails}}
								</view>
							</view>
						</view>
						<empty :isShow="false" v-if="datasList.length==0" />
					</view>
				</view>

			</block>
		</block>

		<view v-if="goback==true" class="goback" @click="gotoBack">
			<image style="width: 88rpx;height: 88rpx;border-radius: 50%;" src="../../static/images/up.jpg" mode="">
			</image>
		</view>
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
				enable: true, //开启吸顶
				goback: false,
				city: '',
				datasList: [],
				isfixeds: false,
				userType: 1,
				dataList: [],
				current: 0,
				typeList: [],
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
				currentjob: 0,
				jobTypeList: [{
					projectName: '',
					name: '全部',
				}, ],
				currentJobSx: 0,
				jobSxTypeList: [{
					projectName: '',
					name: '全部',
				}],
				currentJobSxs: 0,
				jobSxsTypeList: [{
						id: 1,
						name: '推荐',
					},
					{
						id: 2,
						name: '最新',
					},
					// {
					// 	id: 2,
					// 	name: '优选',
					// }
				],
				token: '',
				page: 1,
				limit: 10,
				latitude: '',
				longitude: '',
				totlo: '',
				education: '', //学历
				experience: '', //经验
				industry: '', //行业
				salaryRange: '', //薪资
				companyPeople: '', //公司规模
				domeWidth: 0,
				showModal: true,
				arr: [],
				companyStatus: '',
				XCXIsSelect: '是',
				bannerList: [], //企业端轮播图
				bannerListuser: [], //用户端轮播图
				gridlist: [], //用户端分类
				gongao: [], //公告
			};
		},
		watch: {
			current(newData, oldData) {
				uni.showLoading({
					title: '加载中'
				})
				this.getUserList()
			},
			currentSx(newData, oldData) {
				uni.showLoading({
					title: '加载中'
				})
				this.getUserList();
			},
			currentjob(newData, oldData) {
				uni.showLoading({
					title: '加载中'
				})
				this.getUserList()
			},
			currentJobSx(newData, oldData) {
				uni.showLoading({
					title: '加载中'
				})
				this.getPeopList()
			},
			currentJobSxs(newData, oldData) {
				uni.showLoading({
					title: '加载中'
				})
				this.getPeopList()
			},
			//监听userType的变化  如果有旧值跟新值不同  则把分页重置为初始状态，为了解决切换身份后数据分页错误的问题
			userType(newType, oldType) {
				if (newType != oldType) {
					this.page = 1
					if (this.userType == 1) {
						uni.showLoading({
							title: '加载中'
						})
						this.getUserList()
					} else {
						uni.showLoading({
							title: '加载中'
						})
						this.getPeopList()
					}
				}
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 350) {
				this.goback = true
			} else {
				this.goback = false
			}
		},
		onLoad(e) {
			// 获取邀请码保存到本地
			if (e.invitation) {
				this.$queue.setData('inviterCode', e.invitation);
			}
			// #ifdef MP-WEIXIN
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				this.$queue.setData('inviterCode', scene.split(',')[0]);
			}
			// #endif
			// this.XCXIsSelect = this.$queue.getData("XCXIsSelect");
			uni.showLoading({
				title: '加载中'
			})

			if (uni.getStorageSync('userType')) {
				this.userType = uni.getStorageSync('userType');
			}
			let that = this
			//获取经纬度后请求岗位接口，经纬度用于筛选距离
			uni.getLocation({
				type: 'gcj02', //wgs84  gcj02
				success: function(res) {
					console.log(res, '地理位置');
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					if (that.userType == 1) {
						// that.getUserList();
						that.getPostType()
					} else {
						that.getPeopList()
					}
					console.log(uni.getStorageSync('city') == '', '22222222222')
					if (!uni.getStorageSync('city') || uni.getStorageSync('city') == '' || uni.getStorageSync(
							'city') == null) {
						// #ifdef MP-WEIXIN
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + that.latitude +
								',' + that.longitude + '&key=O2PBZ-6J3CX-GWK44-TXGQL-QKC2T-2UBP6',
							success(re) {
								// console.log(re)
								if (re.statusCode === 200) {
									let citydata = re.data.result.ad_info.city
									console.log("获取城市名称成功", citydata)
									that.city = citydata ? citydata : '区域'
									uni.setStorageSync('city', citydata)
								} else {
									console.log("获取信息失败，请重试！")
								}
							}
						});
						// #endif
						// #ifdef APP-PLUS
						if (res.address) {
							that.city = res.address.city
						} else {
							that.getSelectCity(that.longitude, that.latitude);
						}
						// #endif
						// #ifdef H5
						that.getSelectCity(that.longitude, that.latitude);
						// #endif
					}
				},
				fail: function() {
					console.log('获取地址失败');
				}
			})
			this.getDomWidth()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 1
			if (this.userType == 1) {
				this.getUserList()
			} else {
				this.getPeopList()
			}
		},
		//加载更多
		onReachBottom() {
			if (this.page < this.totlo) {
				this.page += 1
				if (this.userType == 1) {
					this.getUserList()
				} else {
					this.getPeopList()
				}

			}
		},
		onHide() {
			//离开页面时关闭吸顶功能,用于处理h5环境运行下'bottom' of null报错的问题
			this.enable = false
		},
		onShow() {
			let that = this;
			uni.$once('city', data => {
				that.city = data.city
				uni.setStorageSync('city', that.city)
			})
			this.getBannerList()
			this.getgridList()
			this.getgonggaoList()
			// #ifdef MP-WEIXIN
			// this.$Request.get('/app/common/type/257').then(res => {
			// 	if (res.code == 0) {
			// 		this.XCXIsSelect = res.data.value
			// 	}
			// });
			this.$Request.get('/app/common/type/238').then(res => {
				if (res.code == 0) {
					this.XCXIsSelect = res.data.value
				}
			});
			// #endif


			this.enable = true
			if (uni.getStorageSync('userType')) {
				this.userType = uni.getStorageSync('userType');
			}

			this.token = uni.getStorageSync('token');
			//获取选中的筛选条件
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
				console.log(filter)
			} else {
				this.education = '' //学历
				this.experience = '' //经验
				this.industry = '' //行业
				this.salaryRange = '' //薪资
				this.companyPeople = '' //公司规模
			}
			// this.getPostType();
			if (this.userType == 1) {
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#00DD9A'
				})
			} else {
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#F2F2F7'
				})
			}
			if (this.token) {
				this.getUserInfo();

				if (this.userType == 1) {
					this.getJobType();
				} else {
					this.jobTypeList = [{
						projectName: '',
						name: '全部',
					}]
					this.getCompanyClassify()
					this.getCompanyStatus()
				}
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
				this.jobTypeList = [{
					projectName: '',
					name: '全部',
				}]
			}
			if (uni.getStorageSync('city')) {
				this.city = uni.getStorageSync('city')
			} else {
				this.city = ''
			}
			if (this.city) {
				if (this.userType == 1) { //用户端岗位
					that.getPostType();
				} else { //企业端简历
					that.getPeopList();
				}
			}

		},
		methods: {
			goNave(url) {
				if (url.indexOf('/pages/') !== -1 || url.indexOf('/my/') !== -1 || url.indexOf('/package/') !== -1) {
					uni.navigateTo({
						url
					});
				} else {
					//#ifndef H5
					uni.navigateTo({
						url: '/pages/index/webView?url=' + url
					});
					//#endif
					//#ifdef H5
					window.location.href = url;
					//#endif	
				}
			},
			//获取公告
			getgonggaoList() {
				if (uni.getStorageSync('userType') == 1) {
					this.$Request.get('/app/message/page/1/1/100').then(res => {
						if (res.code == 0) {
							let arr = []
							res.data.list.map(item => {

								if (item.type == 1) {
									arr.push(item.title)
								}
							})
							this.gongao = arr
						} else {
							this.gongao = []
						}
					})
				} else if (uni.getStorageSync('userType') == 2) {
					this.$Request.get('/app/message/page/1/1/100').then(res => {
						if (res.code == 0) {
							let arr = []
							res.data.list.map(item => {
								if (item.type == 2) {
									arr.push(item.title)
								}
							})
							this.gongao = arr
						} else {
							this.gongao = []
						}
					})
				}

			},
			//获取金刚区
			getgridList() {
				if (uni.getStorageSync('userType') == 1) {
					this.$Request.get('/app/banner/selectBannerList?classify=2').then(res => {
						if (res.code == 0) {
							this.gridlist = res.data
						} else {
							this.gridlist = []
						}
					})
				} else {
					this.$Request.get('/app/banner/selectBannerList?classify=4').then(res => {
						if (res.code == 0) {
							this.gridlist = res.data
						} else {
							this.gridlist = []
						}
					})
				}

			},
			//获取bannerlist
			getBannerList() {
				if (uni.getStorageSync('userType') == 1) {
					this.$Request.get('/app/banner/selectBannerList?classify=1').then(res => {
						if (res.code == 0) {
							this.bannerListuser = res.data
						} else {
							this.bannerListuser = [
								'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2007-11-7%2F200711072147151187.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674883340&t=4b9cbb7796600699ac28f75cd138ba04'
							]
						}
					})
				} else {
					this.$Request.get('/app/banner/selectBannerList?classify=3').then(res => {
						if (res.code == 0) {
							this.bannerList = res.data
						} else {
							this.bannerList = [
								'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2007-11-7%2F200711072147151187.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674883340&t=4b9cbb7796600699ac28f75cd138ba04'
							]
						}
					})
				}

			},
			goNavss(url) {
				if (this.companyStatus) {
					if (this.companyStatus == 1) {
						uni.showToast({
							title: '企业认证审核中，请审核通过后操作!',
							icon: 'none'
						})
						return
					}
					if (this.companyStatus == 3) {
						uni.showToast({
							title: '企业认证审核未通过，请重新认证!',
							icon: 'none'
						})
						return
					}
					uni.navigateTo({
						url: url
					})

				} else {
					uni.showModal({
						title: '提示',
						content: '还未完成企业认证，请完成企业认证后操作',
						complete(ret) {
							if (ret.confirm) {

							}
						}
					})
				}
			},
			//获取企业认证状态(1:审核中 2:通过 3:拒绝)
			getCompanyStatus() {
				this.$Request.get("/app/company/selectCompanyByUserId").then(res => {
					if (res.code == 0 && res.data) {
						this.companyStatus = res.data.status
						uni.setStorageSync('companyStatus', this.companyStatus)
					} else {
						this.companyStatus = ''
					}

				})
			},
			// 开启订阅消息
			openMsg() {
				console.log('订阅消息')
				var that = this
				uni.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						console.log(ret.subscriptionsSetting, '------------------')
						// if (ret.subscriptionsSetting.itemSettings && Object.keys(ret.subscriptionsSetting.itemSettings).length == 2) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							console.log(99999)
							uni.setStorageSync('sendMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										console.log(that.arr)
										wx.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												console.log(JSON.stringify(re),
													'++++++++++++++')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
													uni.setStorageSync('sendMsg', true)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										uni.setStorageSync('sendMsg', true)
										console.log('确认')
										that.showModal = false
									} else if (res.cancel) {
										console.log('取消')
										uni.setStorageSync('sendMsg', false)
										that.showModal = true
									}
								}
							})
						}
					}
				})
			},
			//回到顶部
			gotoBack() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			/**
			 * 获取简历列表
			 */
			getPeopList() {
				let data = {
					page: this.page,
					limit: this.limit,
					postType: '', //工作性质
					resumesPost: this.jobSxTypeList[this.currentJobSx].projectName, //岗位名称
					screen: +this.currentJobSxs + 1, //1推荐 2最新
					city: this.city, //城市
					resumesCompensation: this.salaryRange, //薪资范围
					resumesEducation: this.education, //学历
					resumesWorkExperience: this.experience, //经验
					industryName: this.industry, //行业
					// companyPeople: this.companyPeople, //公司规模
					lng: this.longitude,
					lat: this.latitude,
					companyId: uni.getStorageSync('companyId') ? uni.getStorageSync('companyId') : ''
				}
				this.$Request.get('/app/resumes/selectResumesList', data).then(res => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					if (res.code == 0 && res.data) {
						this.totalPage = res.data.totalPage
						// res.data.list.map(item => {
						// 	if (item.positionWelfare) {
						// 		item.positionWelfare = item.positionWelfare.split(',')
						// 	} else {
						// 		item.positionWelfare = []
						// 	}
						// })
						if (this.page == 1) {
							this.datasList = res.data.list
						} else {
							this.datasList = [...this.datasList, ...res.data.list]
						}
						this.totlo = res.data.totalPage
					} else {
						this.datasList = []
					}
				})
			},
			/**
			 * 获取公司发布的岗位列表
			 */
			getCompanyClassify() {
				let data = {
					companyId: uni.getStorageSync('companyId')
				}
				this.$Request.getT('/app/postPush/getCompanyClassify', data).then(res => {
					if (res.code == 0) {
						let arr = [{
							projectName: '',
							name: '全部',
						}, ]
						res.data.map(item => {
							let obj = {
								projectName: item,
								name: item,
							}
							arr.push(obj)
						})
						this.jobSxTypeList = arr
					}
				})
			},
			/**
			 * 获取dom元素的宽度
			 */
			getDomWidth() {
				this.$nextTick(() => {
					let that = this
					let obj = uni.createSelectorQuery().select('#bottomView' + that
						.currentJobSx) // xx为class或者id，如 .block, #block
					obj.boundingClientRect(function(data) { // data - dom中的参数，宽高等
						console.log(data.width)
						that.domeWidth = data.width * 2 * 0.8
					}).exec()
				})

			},
			/**
			 * @param {Object} longitude
			 * @param {Object} latitude
			 * 使用经纬度获取城市
			 */
			getSelectCity(longitude, latitude) {
				this.$Request.get('/app/Login/selectCity?lat=' + latitude + '&lng=' + longitude).then(res => {
					if (res.code == 0) {
						console.log(res, '获取地址信息')
						this.city = res.data.city ? res.data.city : '区域'
						uni.setStorageSync('city', res.data.city)
						if (this.userType == 1) {
							this.getUserList()
						} else {
							this.getPeopList()
						}
					}
				});
			},
			/**
			 * 获取求职意向
			 */
			getJobType() {
				this.$Request.get('/app/intention/getIntentionList').then(res => {
					if (res.code == 0 && res.data.records.length > 0) {
						let arr = [{
							projectName: '',
							name: '全部',
						}, ]
						res.data.records.map(item => {
							let obj = {
								projectName: item.ruleClassifyName,
								name: item.ruleClassifyName,
							}
							arr.push(obj)
						})
						this.jobTypeList = arr
					}
				})
			},
			/**
			 * 获取岗位列表
			 */
			getUserList() {
				let data = {
					page: this.page,
					limit: this.limit,
					postType: this.typeList.length > 0 ? this.typeList[this.current].label : '',
					ruleClassifyName: this.jobTypeList[this.currentjob].projectName, //岗位名称
					screen: +this.currentSx + 1, //1推荐 2最新
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
					uni.hideLoading()
					if (res.code == 0) {
						res.data.records.map(item => {
							if (item.positionWelfare) {
								item.positionWelfare = item.positionWelfare.split(',')
							} else {
								item.positionWelfare = []
							}
							if (item.distance) {
								if (parseFloat(item.distance) > 1000) {
									item.distance = (parseFloat(item.distance) / 1000).toFixed(2) + 'km'
								} else {
									item.distance = (parseFloat(item.distance)).toFixed(2) + 'm'
								}

							} else {
								item.distance = ''
							}

						})
						if (this.page == 1) {
							console.log(res.data.records, '岗位数据')
							this.dataList = res.data.records
						} else {
							this.dataList = [...this.dataList, ...res.data.records]
						}
						this.totlo = res.data.pages
					}
				})
			},
			/**
			 * 工作性质
			 */
			getPostType() {
				this.$Request.get('/app/dict/list', {
					type: '工作性质'
				}).then(res => {
					if (res.code == 0) {
						let arr = res.data
						arr = JSON.parse(JSON.stringify(arr).replace(/code/g, 'label'))
						this.typeList = arr
						this.getUserList()
					}
				})
			},
			/**
			 * 获取个人信息
			 */
			getUserInfo() {
				this.$Request.get("/app/user/selectUserById").then(res => {
					if (res.code == 0) {
						this.$queue.setData('weChatNum', res.data.weChatNum)
						if (res.data.companyId) {
							uni.setStorageSync('companyId', res.data.companyId)
						}
						if (res.data.userType == 1 || res.data.userType == null) {
							this.userType = 1
							uni.setStorageSync('userType', 1)
						} else {
							this.userType = 2
							uni.setStorageSync('userType', 2)
						}
					}
				})
			},
			gotoInfo(postPushId) {
				if (uni.getStorageSync('token')) {
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
						url: '/pages/index/game/order?postPushId=' + postPushId
					})
				} else {
					this.noLogin()
				}

			},
			//跳转
			goNav(url) {
				if (uni.getStorageSync('token')) {
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
							uni.navigateTo({
								url: '/pages/public/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//吸顶
			isfixed(e) {
				console.log(e, '+++++++++++++')
				this.isfixeds = true
			},
			//不吸顶
			isunfixed() {
				this.isfixeds = false
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F7;
	}

	.goback {
		position: fixed;
		top: 80%;
		right: 30rpx;
	}

	.jobtitle {
		position: relative;

		.jobtitleBom {
			position: absolute;
			width: 30rpx;
			left: 50%;
			top: 80%;
			transform: translate(-50%, 0);

		}
	}

	.topbg-scroll {
		width: 100%;
		white-space: nowrap;
	}

	.activeQs {
		color: #1A1A1A !important;
		font-weight: 800;
	}

	.activeQ {
		color: #1A1A1A !important;
		font-size: 38rpx;
		font-weight: 800;
	}

	.active {
		font-size: 38rpx !important;
		font-weight: 800 !important;
	}

	.active2 {
		color: #1A1A1A !important;
		font-size: 38rpx !important;
		font-weight: 800 !important;
	}

	.active3 {
		color: #1A1A1A !important;
		font-size: 28rpx !important;
		font-weight: 800 !important;
	}

	.topbg {
		width: 100%;
		// height: 100rpx;
		background-color: #00DD9A;
		// position: fixed;
		// /* #ifdef MP-WEIXIN */
		// top: 0;
		// /* #endif */
		// /* #ifdef H5 */
		// top: 78rpx;
		// /* #endif */
		// /* #ifdef APP-PLUS */
		// top: 0;
		// /* #endif */
		// z-index: 998;
	}

	.topbg-type {
		width: 100%;
		height: 40rpx;
		// margin-top: 28rpx;
		padding-top: 28rpx;

		.topbg-type-box {
			width: 686rpx;
			height: 100%;
		}

		.topbg-type-box-l-i {
			font-size: 32rpx;
			color: #ffffff;
			margin-right: 40rpx;
		}
	}

	.topbg-yx {
		width: 100%;
		// height: 366rpx;
		background: linear-gradient(to bottom, #ffffff, #F2F2F7);
		border-radius: 40rpx 40rpx 0 0;
		margin-top: 30rpx;
		align-content: flex-start;

		.topbg-yx-box {
			width: 686rpx;
			height: 40rpx;
			margin-top: 35rpx;
		}

		.topbg-yx-box-l {
			width: 62%;



			.topbg-yx-box-l-i {
				display: inline-block;
				margin-right: 50rpx;
				color: #999999;
				font-size: 32rpx;
				font-weight: 500;

				.topbg-yx-box-l-i-c {
					z-index: 1 !important;

					// position: relative;
					.topbg-yx-box-l-i-text {
						z-index: 3 !important;
					}
				}

				.topbg-yx-box-l-i-line {
					margin-top: -10rpx;
					width: 100%;
					height: 10rpx;
					background: linear-gradient(90deg, #08F3CE 0%, #05F3A7 100%);
					border-radius: 7rpx;
					z-index: 2 !important;
				}
			}
		}

		.topbg-yx-box-r {
			text {
				color: #00B88F;
				font-size: 28rpx;
				font-weight: 500;
				margin-right: 20rpx;
			}
		}

		.topbg-sx-box {
			width: 686rpx;
			// height: 25rpx;
			margin-top: 30rpx;

			.topbg-sx-box-l-i {
				color: #999999;
				font-size: 28rpx;
				font-weight: 500;
				margin-right: 38rpx;
			}
		}
	}




	.gwList {
		width: 100%;
		// margin-top: 260rpx;

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

						.people {
							max-width: 110rpx;
							overflow: hidden; //超出的文本隐藏
							text-overflow: ellipsis; //溢出用省略号显示
							white-space: nowrap; // 默认不换行；
						}
					}

					.gwList-box-item-box-info-r {
						color: #999999;
						width: 50%;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; // 默认不换行；
					}
				}
			}
		}
	}

	.banner {
		width: 100%;
		height: 250rpx;
		// margin-top: 20rpx;

		.banner-box {
			width: 686rpx;
			height: 100%;
			border-radius: 24rpx;
		}
	}

	.isfixed {
		border-radius: 0 !important;
	}

	.isfixeds {
		border-radius: 40rpx 40rpx 0 0;
	}

	.qySx {
		width: 100%;
		// height: 366rpx;
		background: linear-gradient(to bottom, #ffffff, #F2F2F7);
		padding-bottom: 40rpx;

		.qySx-box {
			width: 686rpx;
			height: 100%;

			.qySx-box-sxp {
				height: 60rpx;
				margin-top: 40rpx;
			}

			.qySx-box-l {
				height: 100%;
				width: 65%;

				// background-color: red;
				.qySx-box-l-i {
					display: inline-block;
					height: 100%;
					margin-right: 20rpx;
					color: #999999;
					font-size: 32rpx;
				}
			}

			.qySx-box-r {
				height: 100%;
			}

			.qySx-box-sxs {
				width: 100%;
				height: 30rpx;
				margin-top: 30rpx;

				.qySx-box-sxs-l {

					.qySx-box-sxs-l-i {
						margin-right: 40rpx;
						color: #999999;
						font-size: 28rpx;
					}
				}

				.qySx-box-sxs-r {
					color: #999999;
					font-size: 28rpx;
				}
			}
		}
	}

	.qyList {
		width: 100%;
		height: auto;

		.qyList-box {
			width: 686rpx;
			height: 100%;

			.qyList-box-item {
				width: 100%;
				// height: 400rpx;
				padding-bottom: 40rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;

				.qyList-box-item-box {
					width: 626rpx;
					height: 100%;
				}

				.qyList-box-item-info {
					margin-top: 40rpx;
				}

				.qyList-box-item-job {
					width: 100%;
					color: #121212;
					font-size: 28rpx;
					font-weight: 500;
					margin-top: 20rpx;
				}

				.qyList-box-item-rem {
					color: #999999;
					font-size: 26rpx;
					margin-top: 20rpx;
				}
			}
		}
	}

	.announcement {
		// background: #ffffff;
		padding: 0px 0px 10px 10px;
		margin-top: 20rpx;
	}

	.announcementbox {
		width: 712upx;
		height: 64upx;
		background: #e5fff2;
		border-radius: 32upx;
		display: flex;
		align-items: center;
		padding: 0px 24upx;
	}

	.anount {
		color: #00DD9A;
		font-weight: bold;
	}

	.anounts {
		width: 80%;
		height: 60rpx;
		color: #333333;
		font-size: 24upx;
	}
</style>