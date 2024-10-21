<template>
	<view>
		<view class="zpType flex justify-center">
			<view class="zpType-box flex align-center" @click="getPostType()">
				<view class="zpType-boxs flex justify-between align-center">
					<text>招聘类型</text>
					<view class="flex align-center">
						<u-input v-model="postType" disabled :clearable="false" placeholder="请选择招聘类型"
							@click="getPostType()" type="text" />
						<u-icon name="arrow-right" color="#999999" @click="getPostType()" style="margin-left: 20rpx;"
							size="28"></u-icon>
					</view>
				</view>

			</view>
		</view>
		<view class="zpType flex justify-center flex-wrap">
			<view class="zpType-box flex flex-wrap justify-center">
				<view class="zpType-boxs flex justify-between align-center">
					<text>岗位名称</text>
					<view class="flex align-center">
						<u-input v-model="stationName" placeholder="请输入岗位名称" type="text" />
						<!-- <u-icon name="arrow-right" color="#999999"  style="margin-left: 20rpx;" size="28"></u-icon> -->
					</view>
				</view>
				<view class="line"></view>
				<view class="zpType-boxs flex justify-between align-center" @click="goJob">
					<text>岗位类型</text>
					<view class="flex align-center">
						<u-input disabled v-model="ruleClassifyName"
							:style="type=='updata' && status!=3?'color:#cccccc':''" @click="goJob" placeholder="请选择岗位类型"
							type="text" />
						<u-icon name="arrow-right" :color="type=='updata' && status!=3?'#cccccc':'#999999'"
							style="margin-left: 20rpx;" size="28"></u-icon>
					</view>
				</view>
				<view class="line"></view>
				<view class="zpType-boxs flex justify-between align-center" @click="goMap()">
					<text>工作地址</text>
					<view class="flex align-center" @click="goMap()">
						<u-input disabled v-model="address" @click="goMap()" type="text" placeholder="请选择工作地址" />
						<u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon>
					</view>
				</view>
				<view class="line"></view>
				<view class="zpType-boxs flex justify-between align-center" @click="IntentionChen()">
					<text>经验要求</text>
					<view class="flex align-center">
						<u-input disabled v-model="experience" @click="IntentionChen()" type="text"
							placeholder="请选择经验要求" />
						<u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon>
					</view>
				</view>
				<view class="line"></view>
				<view class="zpType-boxs flex justify-between align-center" @click="getSchoolList()">
					<text>学历要求</text>
					<view class="flex align-center">
						<u-input disabled v-model="education" type="text" @click="getSchoolList()"
							placeholder="请选择学历要求" />
						<u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon>
					</view>
				</view>
				<view class="line"></view>
				<view class="zpType-boxs flex justify-between align-center" @click="getPriceList()">
					<text>薪资范围</text>
					<view class="flex align-center">
						<u-input disabled v-model="salaryRange" @click="getPriceList()" type="text"
							placeholder="请选择薪资范围" />
						<u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon>
					</view>
				</view>

			</view>

		</view>
		<view class="xt flex justify-center">
			<view class="xt-box flex justify-center">
				<view class="xt-box-c">
					<view class="xt-box-c-item">
						<view class="xt-box-c-item-title flex justify-between align-center">
							岗位关键词
							<u-icon class="tagItmIcon" @click="showTag = true" name="plus-circle-fill" color="#cccccc"
								size="42"></u-icon>
						</view>
						<view class="xt-box-c-item-text flex justify-between align-center">
							<!-- <u-input style="width: 90%;" input-align="left" v-model="tag" type="text"
								placeholder="将优先推荐符合关键词的人才" /> -->
							<view class="" style="margin-top: 20rpx;margin-bottom: 20rpx;color: rgb(192, 196, 207);"
								v-if="tag.length==0">
								将优先推荐符合关键词的人才
							</view>
							<view class="flex flex-wrap" style="margin-top: 20rpx; margin-bottom: 20rpx;" v-else>
								<view class="tagItm" v-for="(item,index) in tag" :key="index">
									{{item}}
									<u-icon class="tagItmIcon" @click="deleteTag(item,index)" name="close-circle-fill"
										color="#cccccc" size="28"></u-icon>
								</view>

							</view>
							<!-- <u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon> -->
						</view>
						<view class="line margin-top-sm"></view>
					</view>
					<view class="xt-box-c-item" @click="gotoHy">
						<view class="xt-box-c-item-title">
							行业要求
						</view>
						<view class="xt-box-c-item-text flex justify-between align-center">
							<u-input @click="gotoHy" disabled style="width: 90%;" input-align="left" v-model="industry"
								type="text" placeholder="对人才行业背景的要求" />
							<u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon>
						</view>
						<view class="line margin-top-sm"></view>
					</view>
					<view class="xt-box-c-item" @click="setFuLi">
						<view class="xt-box-c-item-title">
							岗位福利
						</view>
						<view class="xt-box-c-item-text flex justify-between align-center">
							<u-input @click="setFuLi" disabled style="width: 90%;" input-align="left"
								v-model="positionWelfare" type="text" placeholder="请选择岗位福利" />
							<u-icon name="arrow-right" color="#999999" style="margin-left: 20rpx;" size="28"></u-icon>
						</view>
						<view class="line margin-top-sm"></view>
					</view>
					<view class="xt-box-c-item">
						<view class="xt-box-c-item-title">
							岗位介绍
						</view>
						<view class="xt-box-c-item-text flex justify-between align-center">
							<u-input style="width: 100%;" input-align="left" v-model="positionDetails" type="text"
								placeholder="请输入岗位介绍信息内容" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="xieyi flex justify-center align-center">
			<view class="xieyi-box">
				<u-checkbox @change="checkboxChange" v-model="selectShow" shape="circle" active-color="#00B88F"
					label-size="24rpx">
					我已同意<text style="color: #00B88F;" @click.stop="gotoXieyi()">
						《岗位发布协议》
					</text>
				</u-checkbox>
			</view>
		</view>
		<view class="btn flex justify-center align-center">
			<view class="btn-box flex justify-center align-center" @click="submitJob()">
				确认发布
			</view>
		</view>

		<!-- 工作性质 -->
		<u-select v-model="workShow" :list="workTypes" @confirm="workConfirm"></u-select>
		<!-- 工作经验 -->
		<u-select v-model="workShow2" :list="workList" @confirm="workConfirm2"></u-select>
		<!-- 学历 -->
		<u-select v-model="schoolShow" :list="schoolList" @confirm="workConfirm3"></u-select>
		<!-- 薪资 -->
		<u-select v-model="priceShow" :list="priceList" @confirm="workConfirm4"></u-select>
		<!-- 岗位福利 -->
		<u-popup v-model="showFl" mode="bottom" border-radius="24" :mask-close-able="false" :closeable="true">
			<view class="fl flex justify-center">
				<view class="fl-box">
					<view class="fl-box-title">
						岗位福利
					</view>
					<view class="fl-box-con flex flex-wrap">
						<view class="fl-box-con-item" :class="item.select==true?'flActive':''" @click="selectFl(item)"
							v-for="(item,index) in flList" :key="index">
							{{item.value}}
						</view>
					</view>
					<view class="fl-box-sub flex justify-center align-center" @click="subFl()">
						确认
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 岗位关键词 -->
		<u-popup v-model="showTag" mode="center" width="600rpx" :closeable="true" height="400rpx" border-radius="24">
			<view class="tagTitle">岗位关键词</view>
			<view class="tagCont flex justify-center">
				<view class="tagCont-box">
					<u-input v-model="tagValue" type="text" placeholder="请输入岗位关键词" input-align="left" :border="true" />
				</view>
			</view>
			<view class="tagCont flex justify-center">
				<view class="tagCont-boxs flex align-center justify-center" @click="addTag">
					确认
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectShow: false,
				tagValue: '',
				showTag: false,
				flList: [],
				showFl: false,
				postType: '',
				stationName: '',
				projectName: '',
				experience: '',
				education: '',
				salaryRange: '',
				tag: [],
				industry: '',
				positionWelfare: '',
				positionDetails: '',
				workTypes: [],
				workShow: false,
				lat: '',
				lng: '',
				address: '',
				province: '',
				city: '',
				county: '',
				workList: [],
				workShow2: false,
				schoolList: [],
				schoolShow: false,
				priceList: [],
				priceShow: false,
				ruleClassifyId: '',
				ruleClassifyName: '',
				classifyOneId: '',
				classifyTwoId: '',
				price: 0,
				postPushId: '',
				type: '',
				status: '',
			};
		},
		onLoad(option) {
			if (option.type) {
				this.type = option.type
			}
			if (option.postPushId) {
				this.postPushId = option.postPushId
				this.getJobInfo()
			}
			//项目福利
			this.getFlList()
		},
		onShow() {
			let that = this
			//选择的岗位
			uni.$on('jobs', (info) => {
				that.ruleClassifyId = info.ruleClassifyId
				that.ruleClassifyName = info.ruleClassifyName
				that.price = info.price
				// that.classifyOneId = info.ruleClassifyId1
				// that.classifyTwoId = info.ruleClassifyId2
			})
			//选择的行业
			uni.$on('industry', (info) => {
				that.industry = info.industry
			})

		},
		methods: {
			//岗位发布协议
			gotoXieyi() {
				uni.navigateTo({
					url: '/my/setting/jobXy'
				})
			},
			//判断是否可以更改岗位
			goJob() {
				if (this.type == 'save' || !this.type || this.status == 3) {
					this.goNav('/package/jobIntention/jobList')
				} else {
					uni.showModal({
						title: '提示',
						content: '当前无法修改为其他岗位，若有需要请重新发布',
						confirmText: '去发布',
						complete(ret) {
							if (ret.confirm) {
								uni.navigateTo({
									url: '/package/addJob/addJob'
								})
							}
						}
					})
				}
			},
			//获取岗位价格
			getJobPrice(ruleClassifyId) {
				this.$Request.getT('/app/rule/ruleClassifyId', {
					ruleClassifyId: ruleClassifyId
				}).then(res => {
					if (res.code == 0) {
						this.price = res.data.price
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//获取岗位详情
			getJobInfo() {
				let data = {
					postPushId: this.postPushId
				}
				this.$Request.getT('/app/postPush/selectPostPushDetails', data).then(res => {
					if (res.code == 0) {
						let obj = res.data
						this.postType = obj.postType
						this.stationName = obj.stationName
						this.ruleClassifyName = obj.ruleClassifyName
						this.ruleClassifyId = obj.ruleClassifyId
						this.address = obj.address
						this.experience = obj.experience
						this.education = obj.education
						this.salaryRange = obj.salaryRange
						this.tag = obj.tag.split(',')
						this.industry = obj.industry
						this.positionWelfare = obj.positionWelfare
						this.positionDetails = obj.positionDetails
						this.province = obj.province
						this.city = obj.city
						this.county = obj.county
						this.lng = obj.lng
						this.lat = obj.lat
						this.status = obj.status
						if (this.type == 'save') {
							this.getJobPrice(obj.ruleClassifyId)
						} else if (this.status == 3) {
							this.getJobPrice(obj.ruleClassifyId)
						}
					}
				})
			},
			//发布岗位
			submitJob() {
				if (this.postType == '') {
					uni.showToast({
						title: '请选择招聘类型',
						icon: 'none'
					})
					return
				}
				if (this.stationName == '') {
					uni.showToast({
						title: '请输入岗位名称',
						icon: 'none'
					})
					return
				}
				if (this.ruleClassifyName == '') {
					uni.showToast({
						title: '请选择岗位类型',
						icon: 'none'
					})
					return
				}
				if (this.address == '') {
					uni.showToast({
						title: '请选择工作地址',
						icon: 'none'
					})
					return
				}
				if (this.experience == '') {
					uni.showToast({
						title: '请选择经验要求',
						icon: 'none'
					})
					return
				}
				if (this.education == '') {
					uni.showToast({
						title: '请选择学历要求',
						icon: 'none'
					})
					return
				}
				if (this.salaryRange == '') {
					uni.showToast({
						title: '请选择薪资范围',
						icon: 'none'
					})
					return
				}
				if (this.tag.length == 0) {
					uni.showToast({
						title: '请添加岗位关键词',
						icon: 'none'
					})
					return
				}
				if (this.industry == '') {
					uni.showToast({
						title: '请选择行业要求',
						icon: 'none'
					})
					return
				}
				if (this.positionWelfare == '') {
					uni.showToast({
						title: '请选择岗位福利',
						icon: 'none'
					})
					return
				}
				if (this.positionDetails == '') {
					uni.showToast({
						title: '请输入岗位介绍',
						icon: 'none'
					})
					return
				}

				if (this.selectShow == false) {
					uni.showToast({
						title: '请查看并同意《岗位发布协议》',
						icon: 'none'
					})
					return
				}

				let that = this
				if (this.type == 'save') {
					uni.showModal({
						title: '提示',
						content: '发布该岗位需支付' + this.price + '钻石，确认发布吗？',
						complete(ret) {
							if (ret.confirm) {
								// console.log(1)
								that.pay()
							}
						}
					})
				} else if (this.type == 'updata') { //修改
					if (this.status == 3) { //拒绝重新发布
						uni.showModal({
							title: '提示',
							content: '发布该岗位为热门岗位，需支付' + this.price + '钻石，确认发布吗？',
							complete(ret) {
								if (ret.confirm) {
									// console.log(1)
									that.pay()
								}
							}
						})
					} else { //时效期内修改
						uni.showModal({
							title: '提示',
							content: '本次修改岗位信息免费，确认发布吗？',
							complete(ret) {
								if (ret.confirm) {
									// console.log(1)
									that.pay(that.postPushId)
								}
							}
						})
					}

				} else {
					uni.showModal({
						title: '提示',
						content: '发布该岗位为热门岗位，需支付' + this.price + '钻石，确认发布吗？',
						complete(ret) {
							if (ret.confirm) {
								// console.log(1)
								that.pay()
							}
						}
					})
				}

			},
			//支付
			pay(postPushId) {
				let data = {
					postType: this.postType,
					stationName: this.stationName,
					ruleClassifyName: this.ruleClassifyName,
					ruleClassifyId: this.ruleClassifyId,
					address: this.address,
					experience: this.experience,
					education: this.education,
					salaryRange: this.salaryRange,
					tag: this.tag.join(','),
					industry: this.industry,
					positionWelfare: this.positionWelfare,
					positionDetails: this.positionDetails,
					province: this.province,
					city: this.city,
					county: this.county,
					lng: this.lng,
					lat: this.lat,
					companyId: uni.getStorageSync('companyId')
				};
				if (postPushId) {
					data.postPushId = postPushId
				}
				this.$Request.postJson('/app/postPush/savePostPush', data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '发布成功'
						})
						this.postType = ''
						this.stationName = ''
						this.ruleClassifyName = ''
						this.ruleClassifyId = ''
						this.address = ''
						this.experience = ''
						this.education = ''
						this.salaryRange = ''
						this.tag = []
						this.industry = ''
						this.positionWelfare = ''
						this.positionDetails = ''
						this.province = ''
						this.city = ''
						this.county = ''
						this.lng = ''
						this.lat = ''
						this.postPushId = ''
						setTimeout(() => {
							if (this.type) {
								uni.navigateBack()
							} else {
								uni.navigateTo({
									url: '/my/order/index'
								})
							}

						}, 1000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//新增关键词
			addTag() {
				// this.tag.push('关键词');
				if (this.tagValue == '') {
					uni.showToast({
						title: '请输入关键词',
						icon: 'none'
					})
				} else {
					this.tag.push(this.tagValue)
					this.showTag = false
					this.tagValue = ''
				}
			},
			//删除输入的关键词
			deleteTag(item, index) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定删除关键词“' + item + '”吗？',
					complete(ret) {
						if (ret.confirm) {
							that.tag.splice(index, 1)
						}
					}
				})
			},
			//行业选择页
			gotoHy() {
				uni.navigateTo({
					url: '/package/jobIntention/industry'
				})
			},
			//确认选择的福利
			subFl() {
				let arr = []
				this.flList.map(item => {
					if (item.select === true) {
						arr.push(item.value)
					}
				})
				this.positionWelfare = arr.join(',')
				this.showFl = false
			},
			setFuLi() {
				if (this.flList.length > 0) {
					this.showFl = true
				} else {
					this.showFl = false
					uni.showToast({
						title: '暂无岗位福利可选择',
						icon: 'none'
					})
				}
			},
			//选中/取消选中福利
			selectFl(item) {
				item.select = !item.select
				console.log(item)
				this.$forceUpdate()
			},
			// 获取项目福利列表
			getFlList() {
				let data = {
					type: '项目福利'
				}
				this.$Request.get('/app/dict/list', data).then(res => {
					if (res.code == 0) {
						if (res.data.length > 0) {
							res.data.map(item => {
								item.select = false
							})
							if (this.postPushId) {
								res.data.map(item => {
									this.positionWelfare.split(',').map(ite => {
										if (item.value === ite) {
											item.select = true
										}
									})
								})
							}
							this.flList = res.data
						} else {
							this.flList = []
						}

					}
				})
			},
			goNav(url) {
				uni.navigateTo({
					url: url
				})
			},
			workConfirm4(e) {
				this.salaryRange = e[0].value
			},
			//薪资
			getPriceList() {
				this.$Request.get('/app/dict/list', {
					type: '薪资'
				}).then(res => {
					if (res.code == 0) {
						let arr = res.data
						arr = JSON.parse(JSON.stringify(arr).replace(/code/g, 'label'))
						this.priceList = arr
						this.priceShow = true

					}
				})
			},
			workConfirm3(e) {
				this.education = e[0].value
			},
			//学历
			getSchoolList() {
				this.$Request.get('/app/dict/list', {
					type: '学历'
				}).then(res => {
					if (res.code == 0) {
						let arr = res.data
						arr = JSON.parse(JSON.stringify(arr).replace(/code/g, 'label'))
						this.schoolList = arr
						this.schoolShow = true

					}
				})
			},
			// 工作经验
			IntentionChen() {
				this.$Request.get('/app/dict/list', {
					type: '工作经验'
				}).then(res => {
					if (res.code == 0) {
						let arr = res.data
						arr = JSON.parse(JSON.stringify(arr).replace(/code/g, 'label'))
						this.workList = arr
						this.workShow2 = true

					}
				})
			},
			// 点击调起地图选择位置
			goMap() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						that.address = res.name
						that.lat = res.latitude
						that.lng = res.longitude
						that.shengcheng(res.longitude, res.latitude)
					}
				});
			},
			shengcheng(longitude, latitude) {
				this.$Request.getT('/app/Login/selectCity?lat=' + latitude + '&lng=' + longitude).then(res => {
					// console.log(res)
					if (res.code === 0) {
						this.province = res.data.province
						if (res.data.city) {
							this.city = res.data.city
						} else {
							this.city = res.data.province
						}
						this.county = res.data.district
					}
				});

			},
			workConfirm2(e) {
				this.experience = e[0].value
			},
			//选择类型
			workConfirm(e) {
				this.postType = e[0].value
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
						this.workTypes = arr
						this.workShow = true

					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
		padding-bottom: 100rpx;
	}

	.tagTitle {
		width: 100%;
		margin-top: 30rpx;
		text-align: center;
	}

	.tagCont {
		width: 100%;
		margin-top: 50rpx;

		.tagCont-box {
			width: 80%;
		}

		.tagCont-boxs {
			width: 80%;
			height: 80rpx;
			background-color: #00B88F;
			color: #ffffff;
			border-radius: 14rpx;
		}
	}

	.flActive {
		color: #00B88F !important;
		background-color: #DDFFF7 !important;
	}

	.fl {
		width: 100%;
		height: 100%;

		.fl-box {
			width: 686rpx;
			height: 100%;

			.fl-box-title {
				width: 100%;
				text-align: center;
				margin-top: 30rpx;
			}

			.fl-box-con {
				width: 100%;
				margin-top: 20rpx;

				.fl-box-con-item {
					padding: 15rpx;
					background-color: #F2F2F7;
					color: #121212;
					margin-right: 15rpx;
					margin-bottom: 20rpx;
					border-radius: 8rpx;
				}
			}

			.fl-box-sub {
				width: 100%;
				height: 70rpx;
				border-radius: 16rpx;
				background-color: #00B88F;
				color: #ffffff;
				margin-top: 20rpx;
				margin-bottom: 40rpx;
			}
		}
	}

	.line {
		width: 626rpx;
		border: 1rpx solid #F2F2F2;
	}

	.zpType {
		width: 100%;
		margin-top: 30rpx;

		.zpType-boxs {
			width: 100%;
			padding: 20rpx 30rpx;

			text {
				color: #333333;
				font-size: 28rpx;
				font-weight: 800;
			}
		}

		.zpType-box {
			width: 686rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 24rpx;

		}
	}

	.xt {
		width: 100%;
		// height: 675rpx;
		margin-top: 20rpx;

		.xt-box {
			width: 686rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 24rpx;

			.xt-box-c {
				width: 626rpx;
				height: 100%;
				padding-bottom: 30rpx;
			}

			.xt-box-c-item {
				width: 100%;
				margin-top: 30rpx;

				.xt-box-c-item-title {
					width: 100%;
					color: #333333;
					font-size: 28rpx;
					font-weight: 800;
				}

				.xt-box-c-item-text {
					width: 100%;

					.tagItm {
						margin-right: 10rpx;
						margin-bottom: 10rpx;
						padding: 15rpx;
						border-radius: 8rpx;
						background-color: #DDFFF7;
						color: #00B88F;
						position: relative;

						.tagItmIcon {
							position: absolute;
							right: -6rpx;
							top: -6rpx;
						}
					}
				}
			}
		}
	}

	.xieyi {
		width: 100%;
		margin-top: 30rpx;

		.xieyi-box {
			width: 686rpx;

		}
	}

	.btn {
		width: 100%;
		height: 88rpx;
		margin-top: 54rpx;

		.btn-box {
			width: 686rpx;
			height: 100%;
			background-color: #00B88F;
			border-radius: 16rpx;
			color: #ffffff;
			font-size: 28rpx;
			font-weight: bold;
		}
	}
</style>