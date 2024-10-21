<template>
	<view class="content">
		<!-- 企业信息 -->
		<view class="info flex justify-center">
			<view class="info-box flex align-center">
				<image :src="info.companyLogo?info.companyLogo:'../../static/logo.png'" style="width: 120rpx;height: 120rpx;border-radius: 24rpx;" mode="">
				</image>
				<view class="info-box-r">
					<view class="info-box-r-title" v-show="info.companyName">
						{{info.companyName}}
					</view>
					<view class="info-box-r-label flex align-center flex-wrap">
						<view class="info-box-r-label-item" v-show="info.companyScope">
							{{info.companyScope}}
						</view>
						<view class="info-box-r-label-item" v-if="info.companyPeople">
							{{info.companyPeople}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 企业介绍 -->
		<view class="remarks flex justify-center">
			<view class="remarks-box">
				<view class="remarks-box-title">
					企业介绍
				</view>
				<view class="remarks-box-con">
					<u-read-more show-height="100" :shadow-style="shadowStyle" color="#FD6416" text-indent="0"
						closeText="展开">
						<rich-text :nodes="info.companyDetails" style="color: #ffffff;font-size: 28rpx;font-weight: 500;">
						</rich-text>
					</u-read-more>
				</view>
			</view>
		</view>
		<!-- 公司地址 -->
		<view class="address flex justify-center">
			<view class="address-box flex justify-center">
				<view class="address-box-c">
					<view class="address-box-c-title">
						公司地址
					</view>
					<view class="address-box-c-add flex justify-between align-center">
						<view class="address-box-c-add-l flex align-center">
							<u-icon name="map" style="margin-right: 20rpx;" color="#00B88F" size="30"></u-icon>
							{{info.companyAddress?info.companyAddress:''}}
						</view>
						<view class="address-box-c-add-r">
							<u-icon name="arrow-right" color="#FEFEFE" size="30"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工商信息 -->
		<view class="gsInfo flex justify-center">
			<view class="gsInfo-box flex justify-center">
				<view class="gsInfo-box-c">
					<view class="gsInfo-box-c-title">
						工商信息
					</view>
					<view class="gsInfo-box-c-item">
						公司全称：{{info.companyName?info.companyName:''}}
					</view>
					<view class="gsInfo-box-c-item">
						成立时间：{{info.companyCreateTime?info.companyCreateTime:''}}
					</view>
					<view class="gsInfo-box-c-item">
						注册资本：{{info.companyRegisteredFund?info.companyRegisteredFund:''}}万人民币
					</view>
					<view class="gsInfo-box-c-item">
						法人代表：{{info.companyLegalPerson?info.companyLegalPerson:'未知'}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 全部岗位弹窗 -->
		<btnPopous :companyId="companyId" :cittArr="cittArr" :classify="classify" :moneyArr="moneyArr" :jyArr="jyArr" />
	</view>
</template>

<script>
	import btnPopous from '../../components/btnPopous/btnPopous.vue'
	export default {
		components:{
			btnPopous
		},
		data() {
			return {
				backStyle: {
					color: '#ffffff'
				},
				shadowStyle: {
					backgroundImage: 'none',
				},
				companyId:'',
				info:{},
				cittArr:[],//企业发布岗位的城市数组
				moneyArr:[],//薪资列表数组
				jyArr:[],//工作经验列表数组
				classify:[],//岗位名称数组
			};
		},
		onPageScroll(e) {
			if (e.scrollTop > 100) {
				uni.setNavigationBarTitle({
					title:'西安省钱兄网络科技有限公司'
				})
			} else {
				uni.setNavigationBarTitle({
					title:'企业详情'
				})
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:'加载中'
			})
			this.companyId = option.companyId
			this.getInfo();
			this.getCityCompanyId();
			this.getMoney();
			this.getJy();
			this.getClassify();
		},
		methods: {
			/**
			 * 岗位分类数组
			 */
			getClassify(){
				this.$Request.getT("/app/postPush/getCompanyClassify", {
					companyId: this.companyId
				}).then(res => {
					if (res.code == 0) {
						this.classify = res.data//岗位分类列表数组
					}
				})
			},
			/**
			 * 获取薪资 列表
			 */
			getMoney() {
				this.$Request.get("/app/dict/list", {
					type: '薪资 '
				}).then(res => {
					if (res.code == 0) {
						this.moneyArr = res.data//薪资列表数组
					}
				})
			},
			/**
			 * 获取工作经验列表
			 */
			getJy() {
				this.$Request.get("/app/dict/list", {
					type: '工作经验 '
				}).then(res => {
					if (res.code == 0) {
						this.jyArr = res.data//工作经验列表数组
					}
				})
			},
			/**
			 * 根据公司id查询已发布岗位的市
			 */
			getCityCompanyId(){
				let data = {
					companyId:this.companyId
				}
				this.$Request.getT("/app/postPush/getCityCompanyId",data).then(res=>{
					if(res.code==0){
						this.cittArr = res.data
					}
				})
			},
			//获取企业详情
			getInfo() {
				this.$Request.get("/app/company/selectCompanyByCompanyId", {
					companyId: this.companyId
				}).then(res => {
					if (res.code == 0) {
						this.info = res.data
						let reg = /.+?(省|市|自治区|自治州|县|区)/g
						let cityarr = this.info.companyAddress.match(reg)
						if (cityarr && cityarr != null) {
							if (cityarr.length == 3) {
								this.info.companyAddress = cityarr[0] + '' + cityarr[1] + '' + cityarr[2]
							} else {
								this.info.companyAddress = cityarr[0] + '' + cityarr[1]
							}
						}
					}
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #4B4D5C;
		// overflow: hidden;
	}
	.content{
		padding-bottom: 320rpx;
	}
	.info {
		width: 100%;
		height: 120rpx;
		margin-top: 50rpx;

		.info-box {
			width: 686rpx;
			height: 100%;

			.info-box-r {
				margin-left: 20rpx;
			}

			.info-box-r-title {
				color: #FFFFFF;
				font-size: 38rpx;
				font-weight: 800;
				margin-top: 10rpx;
			}

			.info-box-r-label {
				color: #FFFFFF;
				font-size: 28rpx;
				font-weight: 500;
				margin-top: 20rpx;

				.info-box-r-label-item {
					margin-right: 20rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}

	.remarks {
		width: 100%;
		margin-top: 60rpx;

		.remarks-box {
			width: 686rpx;

			.remarks-box-title {
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 800;
			}

			.remarks-box-con {
				margin-top: 30rpx;
			}
		}
	}

	.address {
		width: 100%;
		height: 190rpx;
		margin-top: 50rpx;

		.address-box {
			width: 686rpx;
			height: 100%;
			background-color: #464855;
			border-radius: 24rpx;

			.address-box-c {
				width: 626rpx;
				height: 100%;
			}

			.address-box-c-title {
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 800;
				margin-top: 40rpx;
			}

			.address-box-c-add {
				width: 100%;
				height: 40rpx;
				margin-top: 30rpx;

				.address-box-c-add-l {
					color: #FEFEFE;
				}
			}
		}
	}

	.gsInfo {
		width: 100%;
		margin-top: 20rpx;

		.gsInfo-box {
			width: 686rpx;
			height: 100%;
			background-color: #464855;
			border-radius: 24rpx;

			.gsInfo-box-c {
				width: 626rpx;
				height: 100%;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
			}

			.gsInfo-box-c-title {
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 800;

			}

			.gsInfo-box-c-item {
				margin-top: 30rpx;
				color: #FEFEFE;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}

	
</style>
