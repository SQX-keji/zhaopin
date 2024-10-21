<template>
	<view>
		<view class="list flex justify-center">
			<view class="list-box">
				<view class="list-box-item flex justify-center" v-for="(item,index) in list" :key="index">
					<view class="list-box-item-con flex justify-between align-center">
						<view class="flex flex-wrap list-box-item-con-l">
							<view class="list-box-item-con-l-title">
								{{item.ruleClassifyName}}
							</view>
							<view class="list-box-item-con-l-label flex align-center flex-wrap">
								<view class="" style="padding: 10rpx 15rpx 10rpx 15rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;">
									{{item.postType}}
								</view>
								<view class="" style="padding: 10rpx 15rpx 10rpx 15rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;">
									{{item.citys}}
								</view>
								<view class="" style="padding: 10rpx 15rpx 10rpx 15rpx;background-color: #F6F6F6;border-radius: 8rpx;margin-right: 20rpx;margin-bottom: 20rpx;">
									{{item.salaryRange}}
								</view>
							</view>
							<view class="list-box-item-con-l-type flex align-center">
								<view class="" v-for="(ite,ind) in item.industry.split(',')" :key="ind">
									{{ite}}
									<text style="margin-left: 20rpx;margin-right: 20rpx;" v-if="(ind + 1) != item.industry.split(',').length">|</text>
								</view>
							</view>
						</view>
						<view class="list-box-item-con-r flex align-center" >
							<u-icon name="trash" color="#999999" size="46" @click="deleteJob(item.intentionId)"></u-icon>
							<text style="margin: 0 10rpx;color:#f2f2f2;font-size: 46rpx;">|</text>
							<u-icon name="edit-pen" color="#00B88F" size="46" @click="upData(item.intentionId)"></u-icon>
						</view>
					</view>
				</view>
				<empty v-if="list.length==0" />
			</view>
		</view>
		
		
		
		<!-- add -->
		<view class="addBtn flex justify-center" v-if="list.length<3">
			<view class="addBtn-box flex justify-center align-center" @tap="gotoNav()">
				添加求职意向
			</view>
		</view>
	</view>
</template>

<script>
	import empty from '../../components/empty.vue'
	export default {
		components:{
			empty
		},
		data() {
			return {
				list:[],
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getMyList();
		},
		methods:{
			/**
			 * @param {Object} intentionId
			 * 删除求职意向
			 */
			deleteJob(intentionId){
				let that = this
				uni.showModal({
					title:'提示',
					content:'确认删除此求职意向吗？',
					complete(ret) {
						if(ret.confirm){
							that.$Request.postT('/app/intention/deleteIntention',{
								intentionId:intentionId
							}).then(res => {
								if(res.code==0){
									uni.showToast({
										title:'删除成功'
									})
									that.getMyList()
								}else{
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
			/**
			 * 获取我的求职意向列表
			 */
			getMyList(){
				this.$Request.get('/app/intention/getIntentionList').then(res => {
					if(res.code==0){
						this.list = res.data.records
					}
				})
			},
			upData(intentionId){
				uni.navigateTo({
					url:'./edit?intentionId='+intentionId
				})
			},
			gotoNav(){
				uni.navigateTo({
					url:'./add'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F7;
	}
	.list{
		width: 100%;
		height: auto;
		margin-top: 30rpx;
		.list-box{
			width: 686rpx;
			height: auto;
			.list-box-item{
				width: 100%;
				// height: 227rpx;
				background: #FFFFFF;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
			}
			.list-box-item-con{
				width: 626rpx;
				height: 100%;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				.list-box-item-con-l{
					width: 80%;
					height: 100%;
					align-items: center;
					align-content: center;
					.list-box-item-con-l-title{
						width: 100%;
						color: #1F1F1F;
						font-size: 38rpx;
						font-weight: 800;
					}
					.list-box-item-con-l-label{
						width: 100%;
						margin-top: 20rpx;
						color: #666666;
						font-size: 28rpx;
					}
					.list-box-item-con-l-type{
						width: 100%;
						// margin-top: 20rpx;
						color: #999999;
						font-size: 28rpx;
					}
				}
				.list-box-item-con-r{
					// width: 46rpx;
					height: 46rpx;
					z-index: 9999;
				}
			}
		}
	}


	.addBtn{
		width: 100%;
		height: 88rpx;
		position: fixed;
		bottom: 100rpx;
		.addBtn-box{
			width: 686rpx;
			height: 100%;
			border-radius: 44rpx;
			background-color: #00B88F;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>
