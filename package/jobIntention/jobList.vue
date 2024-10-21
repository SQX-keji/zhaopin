<template>
	<view>
		<!-- 搜索 -->
		<view class="search flex justify-center align-center">
			<view class="search-box">
				<u-search placeholder="搜索岗位" :show-action="false" @change="getSearchList" v-model="keyword"></u-search>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="searchList flex justify-center" v-if="keyword!=''">
			<view class="searchList-box">
				<scroll-view scroll-y="true" class="searchList-box-scroll">
					<view class="searchList-box-item" @click="selectJob(item)" v-for="(item,index) in searchList" :key="index">
						<view class="">
							{{item.ruleClassifyName}}
						</view>
						<view class="" style="font-size: 24rpx;color: #999999;margin-top: 10rpx;">
							{{item.title}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list flex justify-between" v-else>
			<!-- 左侧分类 -->
			<view class="list-l">
				<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-bottom: 20rpx;">
					<view class="list-l-item flex align-center " @click="setRightList(index)" :class="current==index?'active':''" v-for="(item,index) in list" :key="index">
						{{item.ruleClassifyName}}
					</view>
				</scroll-view>
				
			</view>
			<!-- 右侧列表 -->
			<view class="list-r">
				<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-bottom: 20rpx;">
					<view class="list-r-item" v-if="rightList.length>0" v-for="(item,index) in rightList" :key="index">
						<view class="list-r-item-title">
							{{item.title}}
						</view>
						<view class="list-r-item-childs flex justify-around align-center flex-wrap">
							<view class="list-r-item-childs-i flex justify-center align-center" @click="selectJob(ite)" v-for="(ite,ind) in item.childrens" :key="ind">
								{{ite.ruleClassifyName}}
							</view>
							<view class="list-r-item-childs-i flex justify-center align-center" style="height: 0;padding: 0;">
							</view>
						</view>
					</view>
					<empty v-if="rightList.length==0" />
				</scroll-view>
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
				searchList:[],
				keyword:'',
				current:0,
				rightList:[],
				list:[],
			};
		},
		onLoad() {
			this.getJobList()
		},
		methods:{
			/**
			 * 搜索岗位
			 */
			getSearchList(){
				let data = {
					ruleClassifyName:this.keyword
				}
				this.$Request.getT('/app/rule/userGetClassify',data).then(res => {
					if(res.code==0){
						this.searchList = res.data
					}
				})
			},
			/**
			 * @param {Object} info
			 * 选择岗位并返回
			 */
			selectJob(info){
				uni.$emit('jobs',{
					ruleClassifyId:info.ruleClassifyId,//岗位分类id
					ruleClassifyName:info.ruleClassifyName,//岗位分类名称
					price:info.price,//岗位价格
					// ruleClassifyId2:topInfo.ruleClassifyId,//上级分类id
					// ruleClassifyId1:topInfo.parentId//一级分类id
				})
				uni.navigateBack()
			},
			/**
			 * 切换菜单
			 */
			setRightList(index){
				this.current=index
				this.rightList = this.list[index].childrens
			},
			/**
			 * 获取岗位列表
			 */
			getJobList(){
				this.$Request.getT('/app/rule/getClassifyList').then(res => {
					if(res.code==0){
						
						if(res.data){
							this.list = res.data
							this.rightList = this.list[this.current].childrens
						}
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}
	.searchList{
		width: 100%;
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 100rpx);
		/* #endif */
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 180rpx);
		/* #endif */
		position: fixed;
		bottom: 0;
		.searchList-box{
			width: 686rpx;
			height: 100%;
			.searchList-box-scroll{
				width: 100%;
				height: 100%;
				// background-color: red;
				.searchList-box-item{
					// margin-bottom: 20rpx;
					border-bottom: 1rpx solid #F2F2F2;
					padding-top: 20rpx;
					padding-bottom: 20rpx;
				}
			}
		}
	}
	.search{
		width: 100%;
		height: 100rpx;
		border-bottom: 1rpx solid #F2F2F7;
		box-sizing: border-box;
		.search-box{
			width: 686rpx;
			height: 60rpx;
			border-radius: 44rpx;
			background-color: #F2F2F7;
		}
	}
	.active{
		border-left: 8rpx solid #00B88F !important;
		color: #00B88F !important;
	}
	.list{
		width: 100;
		height: calc(100vh - 100rpx);
		
		.list-l{
			width: 30%;
			height: 100%;
			.list-l-item{
				margin-top: 40rpx;
				font-size: 28rpx;
				color: #121212;
				padding-left: 20rpx;
				border-left: 8rpx solid #ffffff;
			}
		}
		.list-r{
			width: 70%;
			height: 100%;
			border-left: 1rpx solid #F2F2F7;
			box-sizing: border-box;
			.list-r-item{
				width: 100%;
				margin-top: 40rpx;
				.list-r-item-title{
					width: 100%;
					color: #121212;
					font-size: 32rpx;
					font-weight: bold;
					padding-left: 30rpx;
				}
				.list-r-item-childs{
					width: 100%;
					.list-r-item-childs-i{
						width: 200rpx;
						margin-top: 20rpx;
						padding-top: 16rpx;
						padding-bottom: 16rpx;
						padding-left: 16rpx;
						padding-right: 16rpx;
						font-size: 26rpx;
						color: #121212;
						background-color: #F2F2F7;
					}
				}
			}
		}
	}
</style>
