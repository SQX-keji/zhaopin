<template>
	<view>
		<view class="listbox" v-for="(item,index) in list" :key="index" @tap="clickItems(item,index)">
			<view class="flex align-center justify-between">
				<!-- <view class="text-xl text-bold" style="color: #6696FF;">{{item.projectName}}</view> -->
				<view class="text-xl text-bold" v-if="types==true" style="color: rgba(105, 150, 255, 0.8);">{{item.address}}</view>
				<view class="text-xl text-bold" v-else style="color: rgba(105, 150, 255, 1);">{{item.address}}</view>
				<view class="text-lg text-bold" style="color: #FF4A28;">{{item.projectDayNum?item.projectDayNum:0}}个月</view>
			</view>
			<view class="flex align-center margin-top-sm flex-wrap">
				<view class="argrtn">{{item.projectType}}</view>
				<block v-if="item.projectAward && types==true">
					<view class="argrtn" style="background-color: #ffffff;color: #6996ff;border: 1rpx solid #6996ff;" v-for="(ite,index) in item.projectAward?item.projectAward.split(','):[]" :key="index">{{ite}}</view>
				</block>
				
			</view>
			<!-- <view class="flex align-center justify-between margin-top">
				<view class="" style="color: #666666;">{{item.companyName}}</view>
				<view>{{item.address}}</view>
			</view> -->
			<view class="flex align-center" style="margin-top: 10rpx;" v-if="item.postDetailsList.length>0" v-for="(ite,ind) in item.postDetailsList" :key="ind">
				<!-- <view class="" >
					{{ite.postAge}}
				</view>
				<view class="" style="height: 26rpx;width: 2rpx;border: 2rpx solid #cccccc;margin: 0 10rpx 0 10rpx;"></view>
				<view class="">
					{{ite.postSex}}
				</view>
				<view class="" style="height: 26rpx;width: 2rpx;border: 2rpx solid #cccccc;margin: 0 10rpx 0 10rpx;"></view> -->
				<view class="">
					{{ite.postName}}
				</view>
				<view class="" style="height: 26rpx;width: 2rpx;border: 2rpx solid #cccccc;margin: 0 10rpx 0 10rpx;"></view>
				<view class="">
					{{ite.postPeopleNum}}人
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		name: 'taskHomeList',
		props: {
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			//是否显示福利
			types: {
				type: Boolean,
				default: false
			},
			//背景颜色
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			//是否需要下方横线
			splitLine: {
				type: Boolean,
				default: false
			},
			//下方20rpx margin
			bottomMargin: {
				type: Boolean,
				default: false
			},
			radius: {
				type: Boolean,
				default: false
			},
		},
		watch: {
	
		},
		data() {
			return {
			};
		},
		methods: {
			clickItems(item, index) {
				this.$emit('click', {
					item: item,
					index: index,
				});
			}
		}
	};
</script>

<style>
	.listbox {
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 0upx 30upx 20upx 30upx;
		padding: 30upx;
	}
	.argrtn {
		background: #FFFFFF;
		color: #6996ff;
		font-size: 24upx;
		border: 1rpx solid #6996ff;
		border-radius: 8upx;
		padding: 10upx 20upx;
		margin-right: 20upx;
		margin-bottom: 10rpx;
	}
	
</style>