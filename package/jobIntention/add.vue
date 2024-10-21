<template>
	<view>
		<!-- 表单 -->
		<view class="list flex justify-center">
			<view class="list-box">
				<view class="list-box-job flex justify-between align-center">
					<view class="list-box-job-l" @click="gotoJob('/package/jobIntention/jobList')">
						<view class="list-box-job-l-label" @click="gotoJob('/package/jobIntention/jobList')">
							期望岗位
						</view>
						<view class="" @click="gotoJob('/package/jobIntention/jobList')" style="width: 100%;">
							<u-input @click="gotoJob('/package/jobIntention/jobList')" disabled
								v-model="ruleClassifyName" :clearable="false" input-align="left" type="text"
								placeholder="请选择" />
						</view>
					</view>
					<view class="list-box-job-r" @click="gotoJob('/package/jobIntention/jobList')">
						<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
					</view>
				</view>
				<view class="list-box-line"></view>
				<view class="list-box-job flex justify-between align-center"
					@click="gotoJob('/package/jobIntention/city')">
					<view class="list-box-job-l" @click="gotoJob('/package/jobIntention/city')">
						<view class="list-box-job-l-label" @click="gotoJob('/package/jobIntention/city')">
							期望地点
						</view>
						<view class="" style="width: 100%;">
							<u-input disabled v-model="city" @click="gotoJob('/package/jobIntention/city')"
								:clearable="false" input-align="left" type="text" placeholder="如:北京" />
						</view>
					</view>
					<view class="list-box-job-r" @click="gotoJob('/package/jobIntention/city')">
						<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
					</view>
				</view>
				<view class="list-box-line"></view>
				<view class="list-box-job flex justify-between align-center"
					@click="gotoJob('/package/jobIntention/industry')">
					<view class="list-box-job-l" @click="gotoJob('/package/jobIntention/industry')">
						<view class="list-box-job-l-label" @click="gotoJob('/package/jobIntention/industry')">
							期望行业
						</view>
						<view class="" @click="gotoJob('/package/jobIntention/industry')" style="width: 100%;">
							<u-input @click="gotoJob('/package/jobIntention/industry')" disabled v-model="industry"
								:clearable="false" input-align="left" type="text" placeholder="如:互联网/电子商务" />
						</view>
					</view>
					<view class="list-box-job-r" @click="gotoJob('/package/jobIntention/industry')">
						<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
					</view>
				</view>
				<view class="list-box-line"></view>
				<view class="list-box-job flex justify-between align-center" @click="getMonyList()">
					<view class="list-box-job-l" @click="getMonyList()">
						<view class="list-box-job-l-label" @click="getMonyList()">
							期望薪资
						</view>
						<view class="" style="width: 100%;">
							<u-input disabled v-model="resumesCompensation" @click="getMonyList()" :clearable="false"
								input-align="left" type="text" placeholder="如:1W-2W" />
						</view>
					</view>
					<view class="list-box-job-r" @click="getMonyList()">
						<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
					</view>
				</view>
				<view class="list-box-line"></view>
				<view class="list-box-job flex justify-between align-center" @click="getPostType()">
					<view class="list-box-job-l" @click="getPostType()">
						<view class="list-box-job-l-label" @click="getPostType()">
							工作性质
						</view>
						<view class="" style="width: 100%;">
							<u-input disabled v-model="workType" @click="getPostType()" :clearable="false"
								input-align="left" type="text" placeholder="如:全职" />
						</view>
					</view>
					<view class="list-box-job-r" @click="getPostType()">
						<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
					</view>
				</view>
			</view>
		</view>


		<!-- 确认 -->
		<view class="subbtn flex justify-center" @click="addjob()">
			<view class="subbtn-box flex justify-center align-center">
				保存
			</view>
		</view>


		<!-- 薪资 -->
		<u-select v-model="monyShow" :list="monyList" @confirm="moneyConfirm"></u-select>
		<!-- 工作性质 -->
		<u-select v-model="workShow" :list="workTypes" @confirm="workConfirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				monyShow: false,
				monyList: [], //薪资列表
				resumesCompensation: '', //薪资
				workShow: false,
				workType: '', //工作性质
				workTypes: [],
				city: '', //城市
				ruleClassifyId: '', //岗位id
				ruleClassifyName: '', //岗位名称
				industry: '',
				classifyOneId: '', //岗位一级
				classifyTwoId: '', //岗位二级id
				isDefault: 0,
			};
		},
		onShow() {
			let that = this
			//选择的岗位
			uni.$on('jobs', (info) => {
				that.ruleClassifyId = info.ruleClassifyId
				that.ruleClassifyName = info.ruleClassifyName
				// that.classifyOneId = info.ruleClassifyId1
				// that.classifyTwoId = info.ruleClassifyId2
			})
			//选择的城市
			uni.$on('city', (info) => {
				that.city = info.city
			})
			//选择的行业
			uni.$on('industry', (info) => {
				that.industry = info.industry
			})

		},
		methods: {
			/**
			 * 提交求职期望
			 */
			addjob() {
				if (!this.ruleClassifyId) {
					uni.showToast({
						title: '请选择期望岗位',
						icon: 'none'
					})
					return
				}
				if (!this.city) {
					uni.showToast({
						title: '请选择期望城市',
						icon: 'none'
					})
					return
				}
				if (!this.industry) {
					uni.showToast({
						title: '请选择期望行业',
						icon: 'none'
					})
					return
				}
				if (!this.resumesCompensation) {
					uni.showToast({
						title: '请选择期望薪资',
						icon: 'none'
					})
					return
				}
				if (!this.workType) {
					uni.showToast({
						title: '请选择工作性质',
						icon: 'none'
					})
					return
				}
				let data = {
					ruleClassifyId: this.ruleClassifyId, //岗位id
					ruleClassifyName: this.ruleClassifyName, //岗位名称
					citys: this.city, //工作城市
					salaryRange: this.resumesCompensation, //薪资范围
					industry: this.industry, //行业
					postType: this.workType, //工作性质
					isDefault: this.isDefault
					// classifyOneId:this.classifyOneId,
					// classifyTwoId:this.classifyTwoId
				}
				this.$Request.postT('/app/intention/saveUpdate', data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '添加成功'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			workConfirm(e) {
				this.workType = e[0].value
			},
			moneyConfirm(e) {
				this.resumesCompensation = e[0].value
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
			/**
			 * 薪资列表
			 */
			getMonyList() {
				this.$Request.get('/app/dict/list', {
					type: '薪资'
				}).then(res => {
					if (res.code == 0) {
						let arr = res.data
						arr = JSON.parse(JSON.stringify(arr).replace(/code/g, 'label'))
						this.monyList = arr
						this.monyShow = true

					}
				})
			},
			gotoJob(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F7;
	}

	.list {
		width: 100%;
		// height: 795rpx;
		margin-top: 30rpx;

		.list-box {
			width: 686rpx;
			height: 100;
			background-color: #ffffff;
			border-radius: 24rpx;

			.list-box-job {
				width: 606rpx;
				height: 164rpx;
				margin: 0 auto;

				.list-box-job-l {
					width: 80%;
				}

				.list-box-job-r {
					width: 30rpx;
				}
			}

			.list-box-line {
				width: 650rpx;
				height: 1rpx;
				border: 1rpx solid #F2F2F2;
			}
		}
	}

	.subbtn {
		width: 100%;
		height: 88rpx;
		margin-top: 90rpx;

		.subbtn-box {
			width: 686rpx;
			height: 100%;
			background-color: #00B88F;
			border-radius: 44rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>