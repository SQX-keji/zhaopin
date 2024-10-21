<template>
	<view>
		<!-- 标题 -->
		<view class="title flex justify-center">
			<view class="title-box">
				<view class="title-box-top">
					期望行业
				</view>
				<view class="title-box-btn">
					请选择期望行业，最多三个
				</view>
			</view>
		</view>
		<!-- 行业列表 -->
		<view class="list flex justify-center">
			<view class="list-box">
				<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
					<u-collapse>
						<u-collapse-item :title="item.industryName" v-for="(item, index) in itemList" :key="index">
							<view class="flex align-center flex-wrap" style="width: 100%;">
								<view class="" @click="select(item.industryId,ite)" :class="ite.select==true?'active':''" style="box-sizing: border-box;color: #1F1F1F;font-size: 24rpx;padding: 16rpx 20rpx 16rpx 20rpx;background-color: #F2F2F7;margin-right: 20rpx;margin-bottom: 20rpx;" v-for="(ite,ind) in item.childrenList" :key="ind">
									{{ite.industryName}}
								</view>
							</view>
						</u-collapse-item>
					</u-collapse>
				</scroll-view>
			</view>
		</view>


		<!-- 底部操作按钮 -->
		<view class="btncz flex justify-center align-center flex-wrap">
			<view class="btncz-box1" v-if="selectList.length>0">
				<scroll-view scroll-x="true"  style="width: 100%;height: 100%;white-space: nowrap;" >
					<view class="flex align-center" style="width: 100%;height: 100%;">
						<text style="margin-right: 20rpx;">已选</text>
						<view class="flex align-center" style="margin-right: 10rpx;font-size: 26rpx;padding: 10rpx 15rpx 10rpx 15rpx;border-radius: 24rpx;background-color: #e7f6fd;color: #00B88F;" v-for="(item,index) in selectList" :key="index">
							{{item.industryName}}
							<u-icon name="close" @click="closeS(item)" color="#00B88F" style="margin-left: 10rpx;" size="20"></u-icon>
						</view>
					</view>
					
				</scroll-view>
				
			</view>
			<view class="btncz-box flex align-center justify-between">
				<view class="btncz-box-l flex justify-center align-center" @click="closeAll()">
					清除
				</view>
				<view class="btncz-box-r flex justify-center align-center" @click="selectAll()">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectList:[],
				itemList: [],
				topList:[],
			};
		},
		onLoad() {
			this.getIndustryList()
		},
		methods:{
			/**
			 * 确认选择的行业
			 */
			selectAll(){
				let arr = this.selectList
				let strArr = []
				arr.map(item=>{
					strArr.push(item.industryName)
				})
				uni.$emit('industry',{
					industry:strArr.toString(',')
				})
				uni.navigateBack()
				this.selectList = []
				
			},
			/**
			 * 获取行业数据
			 */
			getIndustryList(){
				this.$Request.get('/app/industry/getIndustryList').then(res => {
					if (res.code == 0) {
						let arr = res.data
						arr.map(item=>{
							item.childrenList.map(ite=>{
								ite.select = false
							})
						})
						this.itemList = arr
					}
				})
			},
			//清除选择
			closeAll(){
				this.selectList = []
				this.itemList.map(item=>{
					item.childrenList.map(ite=>{
						ite.select = false
					})
				})
			},
			//取消选择
			closeS(item){
				let res = this.selectList.findIndex((ev) => {
				    return ev.name===item.name;
				});
				
				if(res!=-1){//找到了 res为该下标
					this.selectList.splice(res,1)
					this.itemList.map(ite=>{
						if(ite.id==item.id){
							ite.body.map(ite2=>{
								if(ite2.name==item.name){
									ite2.select = false
								}
							})
						}
					})
				}
			},
			select(id,ite){
				if(this.selectList.length>=3){
					let res = this.selectList.findIndex((ev) => {
					    return ev.industryName===ite.industryName;
					});
					if(res!=-1){//找到了 res为该下标
						this.selectList.splice(res,1)
						ite.select = !ite.select
					}else{//没找到
						uni.showToast({
							title:'最多选择三个',
							icon:'none'
						})
					}
				}else{
					let res = this.selectList.findIndex((ev) => {
					    return ev.industryName===ite.industryName;
					});
					if(res!=-1){//找到了 res为该下标
						this.selectList.splice(res,1)
					}else{//没找到
						let data = {
							industryId:id,
							industryName:ite.industryName
						}
						this.selectList.push(data)
					}
					ite.select = !ite.select
				}
			}
		}
	}
</script>

<style lang="scss">
	.active{
		color: #00B88F !important;
		background-color: #e7f6fd !important;
		padding: 16rpx 20rpx !important;
	}
	.title {
		width: 100%;
		padding-top: 40rpx;
		height: 180rpx;
		.title-box {
			width: 686rpx;

			.title-box-top {
				font-size: 48rpx;
				font-weight: bold;
			}

			.title-box-btn {
				font-size: 28rpx;
				margin-top: 20rpx;
			}
		}
	}

	.list {
		width: 100%;
		height: calc(100vh - 320rpx);

		.list-box {
			width: 686rpx;
			height: 100%;
		}
	}


	.btncz {
		width: 100%;
		// height: 140rpx;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #F2F2F7;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		.btncz-box1{
			width: 686rpx;
			height: 80rpx;
		}
		.btncz-box {
			width: 686rpx;
			height: 70rpx;
			margin-top: 20rpx;
			.btncz-box-l{
				width: 30%;
				height: 100%;
				background-color: #F2F2F7;
				
			}
			.btncz-box-r{
				width: 60%;
				height: 100%;
				color: #ffffff;
				background-color: #00B88F;
			}
		}
	}
</style>
