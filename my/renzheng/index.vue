<template>
	<view>
		<view class="text-center text-red bg-white" v-if="form.auditContent&&form.status==3">拒绝理由：{{form.auditContent}}
		</view>
		
		<view class="">
			<view class=" padding">
				<view class=" padding bg">
					<u-form :model="form" ref="uForm" label-position="top" :label-style='lableStyle'>
						<u-form-item label="企业名称" :border-bottom='false'>
							<u-input placeholder="请输入企业名称" v-model="form.companyName" inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="公司规模" :border-bottom='false'>
							<u-input placeholder="请输入公司规模" disabled @click="Comshow = true" v-model="form.companyPeople" inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="公司所在地" :border-bottom='false'>
							<u-input placeholder="请选择省市区" :disabled="true" @click="show=true" v-model="form.companyAddress1" inputAlign="text-align:left" />
							<u-input placeholder="请输入详细地址" v-model="form.companyAddress" inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="公司所属行业" :border-bottom='false'>
							<u-input placeholder="请选择公司所属行业" v-model="form.companyScope" :disabled="true" @click="gotoHy()" inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="法人" :border-bottom='false'>
							<u-input placeholder="请输入公司法人" v-model="form.companyLegalPerson" inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="企业邮箱" :border-bottom='false'>
							<u-input placeholder="请输入企业邮箱" v-model="form.email" inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="注册资金(万)" :border-bottom='false'>
							<u-input placeholder="请输入注册资金(万)" type="number" v-model="form.companyRegisteredFund"
								inputAlign="text-align:left" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="注册时间" :border-bottom='false'>
							<u-input placeholder="请输入注册时间" v-model="form.companyCreateTime" inputAlign="text-align:left"
								:disabled="true" @click="companyShow=true" />
						</u-form-item>
						<view class="margin-bottom" style="width: 100%;height: 1rpx;background: #F2F2F2;"></view>
						<u-form-item label="公司介绍" :border-bottom='false'>
							<u-input type="textarea" height="350" placeholder="请输入公司介绍" v-model="form.companyDetails"
								:clearable="false" inputAlign="text-align:left" />
						</u-form-item>
					</u-form>
				</view>
				<view class="yyzz flex justify-center">
					<view class="yyzz-box">
						<view class="yyzz-box-title">
							营业执照照片
						</view>
						<view class="yyzz-box-images flex justify-center align-center">
							<view class="yyzz-box-images-c flex flex-wrap align-center" @click="addImage(2)">
								<block v-if="!form.companyCertification">
									<view class="flex align-center justify-center" style="width: 100%;">
										<u-icon name="camera" color="#000000" size="65"></u-icon>
									</view>
									<view class="yyzz-box-images-c-t flex justify-center">
										营业执照照片
									</view>
								</block>
								<block v-else>
									<image :src="form.companyCertification" style="width: 100%;height: 100%;" mode=""></image>
								</block>
							</view>
						</view>
					</view>
				</view>
				<view class="yyzz flex justify-center" style="margin-bottom: 40rpx;">
					<view class="yyzz-box">
						<view class="yyzz-box-title">
							企业头像照片
						</view>
						<view class="yyzz-box-images flex justify-center align-center">
							<view class="yyzz-box-images-c flex justify-center flex-wrap" @click="addImage(1)">
								<block v-if="!form.companyLogo">
									<view class="flex align-center justify-center" style="width: 100%;">
										<u-icon name="camera" color="#000000" size="65"></u-icon>
									</view>
									<view class="yyzz-box-images-c-t flex justify-center">
										企业头像照片
									</view>
								</block>
								<block v-else>
									<image :src="form.companyLogo" style="width: 100%;height: 100%;" mode=""></image>
								</block>
							</view>
						</view>
					</view>
				</view>
				<u-button @click="submit" class="margin-top" :custom-style="customStyle" shape="square"
					:hair-line="false">提交审核
				</u-button>
			</view>
		</view>
		<u-picker v-model="companyShow" mode="time" @confirm="companyConfirm"></u-picker>
		<!-- 求职岗位 -->
		<u-select z-index="99999999" v-model="postShow" :list="postlist" @confirm="postConfirm"></u-select>
		<!-- 区域选择 -->
		<u-picker v-model="show" mode="region" @confirm="confirm"></u-picker>
		<!-- 招聘信息选择弹窗 -->
		<u-popup v-model="zhaoShow" @open="open" style="overflow-y: hidden;" width="80%" height="500rpx" :closeable="true" mode="center" border-radius="14">
			<view class="" style="width: 100%;height: 90%;overflow: hidden;">
				<view class="selectTitle">选择</view>
				<view class="selectbox flex justify-center">
					<view class="selectbox-con">
						<view class="flex align-center justify-between margin-bottom">
							<view class=" text-bold">岗位</view>
							<view class="text-right flex align-center ">
								<u-input :disabled="true" @click="getClassifyList()" placeholder="请选择岗位" v-model="postName"
									inputAlign="text-align:left" />
								<view class="margin-left-sm">
									<image src="../../static/images/my/right_icon.png" style="width: 12upx;height: 21upx;"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="selectbox flex justify-center">
					<view class="selectbox-con">
						<view class="flex align-center justify-between margin-bottom" @click="">
							<view class=" text-bold">人数</view>
							<view class="text-right flex align-center ">
								<u-input type="number" placeholder="请输入人数" v-model="peopleNum"
									inputAlign="text-align:left" />
								<view class="margin-left-sm">
									<image src="../../static/images/my/right_icon.png" style="width: 12upx;height: 21upx;"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="selectbox flex justify-center">
					<view @click="okHand" class="selectbox-con flex justify-center align-center" style="width: 80%;height: 88rpx;border-radius: 20rpx;background-color: #82A9FE;color: #ffffff;">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 公司规模 -->
		<u-select v-model="Comshow" :list="comList" value-name="value" label-name="value" @confirm="comConfirm"></u-select>
	</view>
</template>

<script>
	import configdata from '../../common/config.js';

	export default {
		data() {
			return {
				Comshow:false,
				show:false,
				form: {
					companyName: '', //企业名称
					companyLegalPerson:'',//公司规模
					companyAddress1:'',//省市区
					companyAddress: '', //营业地址
					companyScope: '', //经营范围
					companyPeople:'',//公司法人
					companyRegisteredFund: '', //注册资金
					companyCreateTime: '', //注册时间
					// companyContent: [], //招聘信息
					companyDetails: '', //简介
					companyLogo: '',
					companyCertification: '', //营业执照
					email: '', //企业邮箱
				},
				lableStyle: {
					color: '#000000',
					fontSize: '30upx',
					fontWeight: 'bold'
				},
				customStyle: {
					backgroundColor: '#00B88F',
					color: '#FFFFFF',
					border: 0
				},
				postlist: [],
				companyShow: false,
				postShow: false,
				zhaoShow:false,
				peopleNum:'',
				postName:'',
				comList:[],
			}
		},
		onLoad() {
			this.getCompany()
			this.getComList()
		},
		onShow() {
			let that = this
			that.Qe = uni.getStorageSync("Qe")
			that.geRen = uni.getStorageSync("geRen")
			//选择的行业
			uni.$on('industry',(info)=>{
				that.form.companyScope = info.industry
			})
		},
		methods: {
			//跳转至行业选择
			gotoHy(){
				uni.navigateTo({
					url:'/package/jobIntention/industry'
				})
			},
			//选择公司规模
			comConfirm(e){
				this.form.companyPeople = e[0].value
			},
			//获取公司规模
			getComList(){
				this.$Request.get("/app/dict/list", {
					type: '公司规模 '
				}).then(res => {
					if (res.code == 0) {
						this.comList = res.data
					}
				})
			},
			confirm(e){
				this.form.companyAddress1 = e.province.label+''+e.city.label+''+e.area.label
			},
			//清除招聘信息
			clearcompanyContent(){
				this.form.companyContent = []
			},
			//确认选择框
			okHand(){
				let text = this.postName+''+this.peopleNum+'人'
				this.form.companyContent.push(text)
				this.zhaoShow = false
			},
			//重置选择框
			open(){
				this.peopleNum=''
				this.postName=''
			},
			//选择求职岗位
			postConfirm(e){
				this.postName = e[0].label
			},
			//获取求职岗位
			getClassifyList() {
				let data = {
					status: 1
				}
				this.$Request.get('/app/rule/selectRuleClassifyList', data).then(res => {
					if (res.code == 0) {
						var arr = []
						res.data.forEach((d, index) => {
							var data = {}
							data.label = d.ruleClassifyName
							data.value = d.ruleClassifyId
							arr.push(data)
						})
						this.postlist = arr
						this.postShow = true
					}
				})
			},
			//获取用户企业实名数据
			getCompany() {
				this.$Request.get("/app/company/selectCompanyByUserId").then(res => {
					if (res.code == 0 && res.data) {
						// res.data.companyContent = res.data.companyContent.split(',')
						this.form = res.data
						let address = this.form.companyAddress
						let reg = /.+?(省|市|自治区|自治州|县|区)/g
						let cityarr = address.match(reg)
						if(cityarr.length==3){
							this.form.companyAddress1 = cityarr[0]+''+cityarr[1]+''+cityarr[2]
						}else{
							this.form.companyAddress1 = cityarr[0]+''+cityarr[1]
						}
						this.form.companyAddress = this.form.companyAddress.replace(this.form.companyAddress1,'')
					}
				})
			},
			companyConfirm(e) {
				this.form.companyCreateTime = e.year + '-' + e.month + '-' + e.day
			},
			submit() {
				if (!this.form.companyName) {
					uni.showToast({
						title: '请填写企业名称',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyPeople) {
					uni.showToast({
						title: '请选择企业规模',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyAddress1) {
					uni.showToast({
						title: '请选择省市区',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyAddress) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				if (!this.form.companyScope) {
					uni.showToast({
						title: '请选择公司所属行业',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyLegalPerson) {
					uni.showToast({
						title: '请输入公司法人',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.email) {
					uni.showToast({
						title: '请输入企业邮箱',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyRegisteredFund) {
					uni.showToast({
						title: '请输入注册资金(万)',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyCreateTime) {
					uni.showToast({
						title: '请选择注册时间',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyDetails) {
					uni.showToast({
						title: '请输入公司介绍',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyCertification) {
					uni.showToast({
						title: '请上传营业执照',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (!this.form.companyLogo) {
					uni.showToast({
						title: '请上传企业头像	',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				// this.form.companyContent = this.form.companyContent.length!=0?(this.form.companyContent).join(','):[]
				let data = this.form
				data.companyAddress = data.companyAddress1+''+data.companyAddress
				if (this.form.companyId) {
					this.$Request.postJson("/app/company/updateCompany", data).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '认证修改成功！',
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
					this.$Request.postJson("/app/company/insertCompany", this.form).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '认证提交成功！',
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

			addImage(e) {
				let that = this
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: res => {
						for (let i = 0; i < 1; i++) {
							this.$queue.showLoading("上传中...");
							uni.uploadFile({ // 上传接口
								// url:configdata.APIHOST1+'/alioss/upload',
								url:'https://zp.xianmaxiong.com/sqx_fast/alioss/upload',
								filePath: res.tempFilePaths[i],
								name: 'file',
								success: (uploadFileRes) => {
									if (e == 1) {
										this.form.companyLogo = JSON.parse(uploadFileRes.data).data
									} else if (e == 2) {
										this.form.companyCertification = JSON.parse(uploadFileRes
											.data).data
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
			},
		}
	}
</script>

<style lang="less">
	.yyzz{
		width: 100%;
		// height: 815rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 24rpx;
		.yyzz-box{
			width: calc(100% - 60rpx);
			height: 100%;
			padding-bottom: 40rpx;
			.yyzz-box-title{
				width: 100%;
				margin-top: 40rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 800;
			}
			.yyzz-box-images{
				width: 100%;
				height: 320rpx;
				margin-top: 30rpx;
				border: 1rpx dashed #353535;
			}
			.yyzz-box-images-c{
				width: 100%;
				height: 100%;
				align-content:center;
				.yyzz-box-images-c-t{
					width: 100%;
					color: #353535;
					font-size: 20rpx;
					margin-top: 20rpx;
				}
			}
		}
	}
	.u-input__textarea {
		padding: 10rpx 10rpx !important;
	}
	.selectTitle{
		width: 100%;
		text-align: center;
		margin-top: 40rpx;
		font-weight: bold;
	}
	.selectbox{
		width: 100%;
		margin-top: 30rpx;
		.selectbox-con{
			width: 90%;
		}
	}
	textarea {
		background-color: #F7F7F7;
		border-radius: 10rpx;
		margin-top: 20rpx;

	}

	page {
		background-color: #F7F7F7;
	}

	.bg {
		background-color: #FFFFFF;
		border-radius: 24upx;
	}

	.u-input__input {
		color: balck !important;
	}

	.title_btn {
		height: 78upx;
		line-height: 78upx;
		/* background: #f7f7f7; */
	}
</style>
