<template>
	<view class="padding-bottom-xl">
		<!-- <view class="text-white padding margin bg" v-if="form.isRecommend==2">
			<view class="flex align-center justify-between" style="color: red;">
				<view class=" text-bold">已录入人才库</view>
			</view>
		</view> -->
		<view class="text-white padding margin bg" v-if="form.status==3">
			<view class="flex align-center justify-between" style="color: red;">
				<view class=" text-bold">拒绝理由</view>
				<view class="text-right ">
					{{form.auditContent}}
				</view>
			</view>
		</view>
		<view class="text-white padding margin bg">
			<u-form label-width="150" :label-style="labelStyle" :model="form" ref="uForm">
				<u-form-item label="姓名">
					<u-input height="200rpx" v-model="form.resumesName" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="年龄">
					<u-input v-model="form.resumesAge" type="number" placeholder="请输入年龄" />
				</u-form-item>
				<u-form-item label="家庭住址" placeholder="请输入家庭住址">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item label="性别" right-icon="arrow-right">
					<u-input v-model="resumesSex" placeholder="请选择性别" :disabled="true" @click="SexChen()" />
				</u-form-item>
				<u-form-item label="手机号">
					<u-input v-model="form.resumesPhone" type="number" maxlength="11" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="学历" right-icon="arrow-right">
					<u-input v-model="form.resumesEducation" placeholder="请选择学历" :disabled="true"
						@click="learnChen()" />
				</u-form-item>
				<u-form-item label="婚姻状况" right-icon="arrow-right">
					<u-input v-model="form.resumesMarriage" placeholder="请选择婚姻状况" :disabled="true"
						@click="MarriageChen()" />
				</u-form-item>
				<u-form-item label="期望薪资" right-icon="arrow-right">
					<u-input v-model="form.resumesCompensation" placeholder="请选择期望薪资" :disabled="true"
						@click="getMonyList()" />
				</u-form-item>
				<u-form-item label="电子邮箱">
					<u-input v-model="form.resumesEmail" placeholder="请输入电子邮箱" />
				</u-form-item>
				<u-form-item label="工作经验" right-icon="arrow-right">
					<u-input v-model="form.resumesWorkExperience" placeholder="请选择工作经验" :disabled="true"
						@click="IntentionChen()" />
				</u-form-item>
				<u-form-item label="毕业院校">
					<u-input v-model="form.school" placeholder="请输入毕业院校" />
				</u-form-item>
				<u-form-item label="所学专业">
					<u-input v-model="form.major" placeholder="请输入所学专业" />
				</u-form-item>
				<u-form-item label="毕业时间" right-icon="arrow-right">
					<u-input v-model="form.graduationTime" :disabled="true" @click="showGraduationTime = true"
						placeholder="请选择毕业时间" />
				</u-form-item>
				<u-form-item label="行业" right-icon="arrow-right">
					<u-input v-model="form.industryName" :disabled="true"
						@click="gotoHy('/package/jobIntention/industry')" placeholder="请选择行业" />
				</u-form-item>
				<u-form-item label="意向城市" right-icon="arrow-right">
					<u-input v-model="form.city" :disabled="true" @click="cityShow = true" placeholder="请选择意向城市" />
				</u-form-item>
			</u-form>
		</view>

		<view class="text-white padding margin bg radius ">
			<view>
				<view class="flex align-center justify-between">
					<view class=" text-bold">求职岗位</view>
					<view @click="PostChen()">
						<image src="../static/add.png" style="width: 54upx;height: 54upx;"></image>
					</view>
				</view>
				<view class="flex align-center label" v-if="form.resumesPost">
					<view v-if="form.resumesPost">{{form.resumesPost}}</view>
					<!-- <view v-if="form.rulePostName">-</view>
					<view v-if="form.rulePostName" class="">{{form.rulePostName}}</view> -->
				</view>
				<view class="margin-top-sm text-sm" style="color: #999999;" v-else>添加岗位会根据你的岗位需求为你推荐</view>
			</view>

			<view class="margin-tb-sm" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
			<view>
				<view class="flex align-center justify-between">
					<view class=" text-bold">工作经历</view>
					<view @click="gowork(1)">
						<image src="../static/add.png" style="width: 54upx;height: 54upx;"></image>
					</view>
				</view>
				<view class="margin-top-sm text-sm" style="color: #999999;" v-if="form.resumesCompanyList.length==0">
					添加工作经历向企业全面展示你的能力</view>
				<view v-for="(item,index) in form.resumesCompanyList" class="gzjl" :key="index" v-else>
					<view class="flex justify-between" style="color: #121212;">
						<view class="text-bold">
							{{item.resumesTitle}}
						</view>
						<view class="">
							<u-icon name="trash" color="rgb(146,146,146)"
								@click="deleteList(form.resumesCompanyList,index)" size="38"></u-icon>
							<u-icon style="margin-left: 20rpx;" name="edit-pen" @click="updataLists(item,index,1)"
								color="rgb(146,146,146)" size="38"></u-icon>
						</view>
					</view>
					<view v-if="item.resumesProject">
						{{item.resumesProject}}
					</view>
					<view class="flex align-center margin-tb-xs" style="color: #999999;">
						<view>{{item.resumesTime}}</view>
						<view class="margin-left">{{item.resumesPost}}</view>
					</view>
					<view>{{item.resumesContent}}</view>
				</view>
			</view>
			<view class="margin-tb-sm" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
			<view>
				<view class="flex align-center justify-between">
					<view class=" text-bold">项目经验</view>
					<view @click="gowork(2)">
						<image src="../static/add.png" style="width: 54upx;height: 54upx;"></image>
					</view>
				</view>
				<view class="margin-top-sm text-sm" style="color: #999999;" v-if="form.resumesWorkList.length==0">
					添加工作经历向企业全面展示你的能力</view>
				<view v-for="(item,index) in form.resumesWorkList" class="gzjl" :key="index" v-else>
					<view class="flex justify-between" style="color: #121212;">
						<view class="text-bold">
							{{item.resumesTitle}}
						</view>
						<view class="">
							<u-icon name="trash" color="rgb(146,146,146)"
								@click="deleteList(form.resumesWorkList,index)" size="38"></u-icon>
							<u-icon style="margin-left: 20rpx;" name="edit-pen" @click="updataLists(item,index,2)"
								color="rgb(146,146,146)" size="38"></u-icon>
						</view>
					</view>
					<view class="flex align-center margin-tb-xs" style="color: #999999;">
						<view>{{item.resumesTime}}</view>
						<view class="margin-left">{{item.resumesPost}}</view>
					</view>
					<view>{{item.resumesContent}}</view>
				</view>
			</view>
			<view class="margin-tb-sm" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
			<view>
				<view class="flex align-center justify-between">
					<view class=" text-bold">个人优势</view>
				</view>
				<view class=" padding-xs radius margin-top-sm" style="background: #F5F5F5;">
					<u-input v-model="form.resumesDetails" type="textarea" height="300"
						placeholder="详细的个人信息与工作经历会让企业更加感兴趣" inputAlign="text-alight:left" />

				</view>

			</view>
			<!-- <view style="margin-top: 20rpx;">
				<view class="flex align-center justify-between">
					<view class=" text-bold">资格证书</view>
				</view>
				<view class="flex justify-between flex-wrap" style="margin-top: 10rpx;">
					<u-checkbox activeColor="#00B88F" v-model="item.checked" style="width: 50%;" v-for="(item, index) in nameList"
						:key="index" :name="item.name">{{item.name}}</u-checkbox>
				</view>

			</view> -->
			<!-- <view class="margin-top">
				<view class=" text-bold">资格证书上传
				</view>
				<view class="flex" style="overflow: hidden;flex-direction: initial;flex-wrap: wrap;">
					<view v-if="resumesImage.length">
						<view class="margin-top flex margin-right-sm flex-wrap">
							<view class="flex"
								style="width: 200rpx;height: 200rpx;margin-right: 5rpx;position: relative;margin-bottom: 5rpx;"
								v-for="(image,index) in resumesImage" :key="index">
								<image :src="image" style="width: 100%;height: 100%;"></image>
								<view style="z-index: 9;position: absolute;top: -15rpx;right: -15rpx;"
									@click="removeImg(index)">
									<u-icon name="close-circle-fill" color="#00B88F" size="50rpx"></u-icon>
								</view>

							</view>
						</view>
					</view>
					<view class="margin-top" @click="addImages(2)">
						<view style="width: 200rpx;height: 200rpx;background: #f4f5f6;"
							class="flex justify-center align-center">
							<view>
								<u-icon name="plus" color="#000000" size="40"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>


		<view class="margin-lr ">
			<!-- <u-button v-if="id" @click="update" class="margin-top" :custom-style="customStyle" shape="square"
			:hair-line="false">提交审核</u-button> -->
			<u-button @click="submit" class="margin-top" :custom-style="customStyle" shape="square" :hair-line="false">
				提交审核</u-button>
		</view>
		<!-- 选择学历 -->
		<u-select v-model="learnShow" :list="learnList" @confirm="learnConfirm"></u-select>
		<!-- 专业-->
		<u-select v-model="sexShow" :list="Sexlist" @confirm="sexConfirm"></u-select>
		<!-- 婚姻状况 -->
		<u-select v-model="MarriageShow" :list="Marriagelist" @confirm="MarriageConfirm"></u-select>
		<!-- 工作经验 -->
		<u-select v-model="IntentionShow" :list="Intentionlist" @confirm="IntentionConfirm"></u-select>
		<!-- 薪资 -->
		<u-select v-model="monyShow" :list="monyList" @confirm="moneyConfirm"></u-select>
		<u-picker v-model="showGraduationTime" mode="time" @confirm="setGraduationTime"></u-picker>
		<!-- 意向城市 -->
		<u-picker v-model="cityShow" mode="region" @confirm="cityConfirm"></u-picker>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	export default {
		data() {
			return {
				showGraduationTime: false,
				nameList: [],
				labelStyle: {
					fontWeight: 'bold'
				},
				resumesImage: [],
				customStyle: {
					backgroundColor: '#00B88F',
					color: '#FFFFFF',
					border: 0
				},
				cityShow: false,
				form: {
					address: '', //家庭住址
					ruleClassifyId: '',
					resumesName: '', //姓名
					resumesAge: '', //年龄
					resumesPhone: '', //电话
					resumesEducation: '', //学历
					resumesMarriage: '', //婚姻状态
					resumesCompensation: '', //期望薪资
					resumesEmail: '', //电子邮箱
					resumesWorkExperience: '', //工作经验
					// resumesMajor: '', //专业
					resumesPost: '', //求职岗位
					resumesDetails: '', //自我介绍
					resumesCompanyList: [], //工作经历
					resumesWorkList: [], //项目经验
					// resumesImage: [], //证书
					school: '',
					major: '', //所学专业
					// rulePostId: '',
					// rulePostName: '',
					resumesSex: '', //性别
					// resumesImageName:'',//证书名称
					graduationTime: '', //毕业时间
					industryName: '', //行业
					city: '', //意向城市
				},
				resumesImage: [],
				learnShow: false,
				learnList: [], //学历列表
				MarriageShow: false, //婚姻状况
				Marriagelist: [],
				//求职岗位
				IntentionShow: false,
				Intentionlist: [],
				//岗位
				postlist: [],
				resumesId: '',
				resumes: {},
				sexShow: false, //性别
				resumesSex: '',
				Sexlist: [{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				type: 1, // 1:新增/2:修改
				monyShow: false,
				monyList: [],
			}
		},
		onLoad(option) {
			this.getbookName();
			if (option.resumesId) {
				this.type = 2
				this.resumesId = option.resumesId
				uni.setStorageSync("resumesId", option.resumesId)
				this.getDetails()
			}

		},
		// onHide() {
		// 	uni.removeStorageSync('resumesCompanyList')
		// 	uni.removeStorageSync('resumesWorkList')
		// },
		onUnload() {
			uni.removeStorageSync('resumesCompanyList')
			uni.removeStorageSync('resumesWorkList')
		},
		onShow() {
			let that = this
			uni.$on('jobs', (info) => {
				that.form.resumesPost = info.ruleClassifyName
				that.form.ruleClassifyId = info.ruleClassifyId
			})
			if (uni.getStorageSync("resumesCompanyList")) {
				this.form.resumesCompanyList = uni.getStorageSync("resumesCompanyList")
				uni.setStorageSync("resumesCompanyList", this.form.resumesCompanyList)
			}
			if (uni.getStorageSync("resumesWorkList")) {
				this.form.resumesWorkList = uni.getStorageSync("resumesWorkList")
				uni.setStorageSync("resumesWorkList", this.form.resumesWorkList)
			}
			if (uni.getStorageSync("resumesId")) {
				this.resumesId = uni.getStorageSync("resumesId")
			}
			// if (uni.getStorageSync("resumes")) {
			// 	this.resumes = uni.getStorageSync("resumes")
			// 	this.form.rulePostId = this.resumes.rulePostId
			// 	this.form.rulePostName = this.resumes.rulePostName
			// 	this.form.resumesPost = this.resumes.resumesPost
			// 	this.form.ruleClassifyId = this.resumes.ruleClassifyId
			// }
			//选择的行业
			uni.$on('industry', (info) => {
				that.form.industryName = info.industry
			})
		},
		methods: {
			/**
			 * @param {Object} e
			 * 地区选择回调
			 */
			cityConfirm(e) {
				this.form.city = e.city.label
			},
			//去选择行业
			gotoHy(url) {
				uni.navigateTo({
					url: url
				})
			},
			//设置毕业时间
			setGraduationTime(e) {
				this.form.graduationTime = e.year + '-' + e.month + '-' + e.day
			},
			//证书名称
			getbookName() {
				this.$Request.get('/app/dict/list', {
					type: '证书名称'
				}).then(res => {
					if (res.code == 0) {
						let arr = []
						res.data.map(item => {
							let obj = {
								name: item.code,
								checked: false,
								disabled: false
							}
							arr.push(obj)
						})
						this.nameList = arr
					}
				})
			},
			//修改
			updataLists(list, index, state) {
				uni.navigateTo({
					url: '/my/publish/workhistory?index=' + index + '&state=' + state + '&list=' + JSON.stringify(
						list)
				})
			},
			//删除制定工作经验
			deleteList(list, index) {
				list.splice(index, 1)
				uni.removeStorageSync('resumesCompanyList')
				uni.removeStorageSync('resumesWorkList')
				// uni.setStorageSync("resumesCompanyList", this.form.resumesCompanyList)
				// uni.setStorageSync("resumesWorkList", this.form.resumesWorkList)
			},
			moneyConfirm(e) {
				this.form.resumesCompensation = e[0].value
			},
			//薪资列表
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
			removeImg(index) {
				this.resumesImage.splice(index, 1)
			},
			sexConfirm(e) {
				console.log(e)
				this.form.resumesSex = e[0].value
				this.resumesSex = e[0].label
			},
			SexChen() {
				console.log('11111111111111')
				this.sexShow = true
			},
			//获取 学历  婚姻状况  工作经验  专业
			getType(index) {
				let type = ''
				if (index == '学历') {
					type = index
				} else if (index == '婚姻状况') {
					type = index
				} else if (index == '工作经验') {
					type = index
				} else if (index == '专业') {
					type = index
				}
				let data = {
					type: type
				}
				this.$Request.get('/app/dict/list', data).then(res => {
					if (res.code == 0) {
						if (res.data.length > 0) {
							var arr = []
							res.data.forEach((d, index) => {
								var data = {}
								data.label = d.value
								data.value = index
								arr.push(data)
							})
							if (index == '学历') {
								this.learnList = arr
								this.learnShow = true
							} else if (index == '婚姻状况') {
								this.Marriagelist = arr
								this.MarriageShow = true
							} else if (index == '工作经验') {
								this.Intentionlist = arr
								this.IntentionShow = true
							} else if (index == '专业') {
								this.Majorlist = arr
								this.MajorShow = true
							}
							console.log(arr)
						} else {
							uni.showToast({
								title: '暂无可选',
								icon: 'none'
							})
						}

					}
				})
			},
			// 工作经验
			IntentionChen() {
				this.list = []
				this.getType('工作经验')
			},
			IntentionConfirm(e) {
				this.form.resumesWorkExperience = e[0].label
			},
			MarriageChen() {
				this.list = []
				this.getType('婚姻状况')
			},
			//婚姻状况
			MarriageConfirm(e) {
				this.form.resumesMarriage = e[0].label
			},
			learnChen() {
				this.list = []
				this.getType('学历')
			},
			//选择学历
			learnConfirm(e) {
				this.form.resumesEducation = e[0].label
			},
			PostChen() {
				// uni.navigateTo({
				// 	url: '/my/publish/resumesPost'
				// })
				uni.navigateTo({
					url: '/package/jobIntention/jobList'
				})
			},
			gowork(state) {
				uni.navigateTo({
					url: '/my/publish/workhistory?state=' + state
				})
			},


			// 发布
			submit() {
				this.form.resumesImage = this.resumesImage
				this.form.resumesImage = this.form.resumesImage.toString();
				let arr = this.nameList.filter(item => item.checked === true)
				let arr2 = []
				arr.map(item => {
					arr2.push(item.name)
				})
				this.form.resumesImageName = arr2.join(',')
				// if(){}
				// this.form.resumesSex = this.resumesSex
				if (!this.form.resumesName) {
					uni.showToast({
						title: '请输入真实姓名',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesAge) {
					uni.showToast({
						title: '请输入年龄',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.address) {
					uni.showToast({
						title: '请输入家庭住址',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesSex) {
					uni.showToast({
						title: '请选择性别 ',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesPhone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesEducation) {
					uni.showToast({
						title: '请选择学历',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesMarriage) {
					uni.showToast({
						title: '请输入婚姻状况',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesCompensation) {
					uni.showToast({
						title: '请选择期望薪资',
						icon: 'none',
						duration: 1000
					})
					return
				}
				// if (!this.form.resumesEmail) {
				// 	uni.showToast({
				// 		title: '请输入电子邮箱',
				// 		icon: 'none',
				// 		duration: 1000
				// 	})
				// 	return
				// }
				if (!this.form.resumesWorkExperience) {
					uni.showToast({
						title: '请选择工作经验',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.school) {
					uni.showToast({
						title: '请填写毕业院校',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.major) {
					uni.showToast({
						title: '请填写所学专业',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.graduationTime) {
					uni.showToast({
						title: '请选择毕业时间',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.industryName) {
					uni.showToast({
						title: '请选择行业',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.city) {
					uni.showToast({
						title: '请选择意向城市',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (!this.form.resumesPost) {
					uni.showToast({
						title: '请添加求职岗位',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (this.form.resumesWorkExperience != '无经验') {
					if (this.form.resumesCompanyList.length == 0) {
						uni.showToast({
							title: '请添加工作经历',
							icon: 'none',
							duration: 1000
						})
						return
					}
					if (this.form.resumesWorkList.length == 0) {
						uni.showToast({
							title: '请添加项目经验',
							icon: 'none',
							duration: 1000
						})
						return
					}
				}
				if (!this.form.resumesDetails) {
					uni.showToast({
						title: '个人优势可以让你的简历眼前一亮，请填写个人优势',
						icon: 'none',
						duration: 1000
					})
					return
				}
				// else{
				// 	this.form.resumesCompanyList = []
				// 	this.form.resumesWorkList = []
				// }
				// if (!this.form.resumesDetails) {
				// 	uni.showToast({
				// 		title: '请添加个人优势',
				// 		icon: 'none',
				// 		duration: 1000
				// 	})
				// 	return
				// }
				if (this.type == 2) {
					this.$Request.postJson("/app/resumes/updateResumes", this.form).then(res => {
						if (res.code == 0) {
							// uni.removeStorageSync('resumesWorkList')
							uni.removeStorageSync('resumesCompanyList')
							// uni.removeStorageSync('resumes')
							uni.removeStorageSync('resumesId')
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					});
				} else {
					this.$Request.postJson("/app/resumes/insertResumes", this.form).then(res => {
						if (res.code == 0) {
							// uni.removeStorageSync('resumesWorkList')
							uni.removeStorageSync('resumesCompanyList')
							// uni.removeStorageSync('resumes')
							uni.showToast({
								title: '提交成功',
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					});
				}

			},
			getDetails() {
				this.$Request.get('/app/resumes/selectResumesByUserId').then(res => {
					if (res.code == 0) {
						this.form = res.data
						if (this.form.resumesSex == 1) {
							this.form.resumesSex = 1
							this.resumesSex = '男'
						} else {
							this.form.resumesSex = 2
							this.resumesSex = '女'
						}
						if (res.data.resumesImage && res.data.resumesImage != '') {
							this.resumesImage = res.data.resumesImage.split(',')
						}
						//初始化为对象否则会出现无法在字符串上创建属性的错误（原因是在onshow中有赋值）
						// this.resumes = {}
						// this.resumes.rulePostId = res.data.rulePostId
						// this.resumes.resumesPost = res.data.resumesPost
						// this.resumes.rulePostName = res.data.rulePostName
						this.form.resumesPost = res.data.resumesPost
						this.form.ruleClassifyId = res.data.ruleClassifyId

						uni.setStorageSync("resumesWorkList", this.form.resumesWorkList)
						uni.setStorageSync("resumesCompanyList", this.form.resumesCompanyList)
						//证书名称回显
						if (res.data.resumesImageName) {
							res.data.resumesImageName.split(',').map(item => {
								this.nameList.map(re => {
									if (item === re.name) {
										re.checked = true
									}
								})

							})
						}
					}
				})
			},
			// 图片上传
			addImages(e) {
				let that = this
				uni.chooseImage({
					count: 99,
					sourceType: ['album', 'camera'],
					success: res => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							that.$queue.showLoading("上传中...");
							uni.uploadFile({ // 上传接口
								url: config.APIHOST + '/alioss/upload',
								filePath: res.tempFilePaths[i],
								name: 'file',
								success: (uploadFileRes) => {
									if (e == 2) {
										that.resumesImage.push(JSON.parse(uploadFileRes.data).data)
									}
									uni.hideLoading();
								}
							});
						}
					}
				})
			},

			config: function(name) {
				var info = null;
				if (name) {
					var name2 = name.split("."); //字符分割
					if (name2.length > 1) {
						info = configdata[name2[0]][name2[1]] || null;
					} else {
						info = configdata[name] || null;
					}
					if (info == null) {
						let web_config = cache.get("web_config");
						if (web_config) {
							if (name2.length > 1) {
								info = web_config[name2[0]][name2[1]] || null;
							} else {
								info = web_config[name] || null;
							}
						}
					}
				}
				return info;
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.gzjl {
		width: 100%;
		background-color: rgb(247, 247, 247);
		border-radius: 10rpx;
		margin-top: 10rpx;
		padding: 25rpx;
	}

	.bg {
		background-color: #FFFFFF;
		border-radius: 24upx;
	}

	/deep/ .u-form-item {
		padding: 20rpx 0 20rpx 0;
	}

	.label {
		background: #DDFFF7;
		border-radius: 4upx;
		color: #00B88F;
		display: inline-flex;
		padding: 14upx 23upx;
	}
</style>