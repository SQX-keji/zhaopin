<template>
	<view>
		<view class="listbox" v-for="(item,index) in list" :key="index" @tap="clickItem(item,index)">
			<view class="flex align-center justify-between">
				<view>
					<view class="" style="color: #000;font-size: 34rpx; font-weight: 800;">{{getfomate(item.resumesName,item.resumesSex)}}</view>
					<view class="flex align-center margin-top-xs flex-wrap" style="color: #999999;">
						<text>{{item.resumesSex==1?'男':'女'}}</text>
						<text class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;">
						</text>
						<text>{{item.resumesAge}}岁</text>
						<text class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;">
						</text>
						<text>{{item.resumesWorkExperience}}</text>
						<text class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;">
						</text>
						<text>{{item.resumesEducation}}</text>
						<text class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;">
						</text>
						<text>{{item.resumesCompensation}}</text>
					</view>
				</view>
				<view>
					<image :src="item.avatar?item.avatar:'../../static/logo.png'"
						style="width: 100upx;height: 100upx;border-radius: 55upx;">
					</image>
				</view>
			</view>
			<view class="margin-top-sm" v-if="item.resumesCompanyList">
				<view class="flex align-center">
					<view class="margin-right-xs">
						<image src="../../static/images/qi.png" style="width: 30upx;height: 32upx;"></image>
					</view>
					<view style="color: #121212;">{{item.resumesCompanyList.length!=0?item.resumesCompanyList[0].resumesTitle:'暂无'}}</view>
				</view>
				<view class="text-sm margin-left margin-top-xs padding-left-xs" style="color: #999999;">
					{{item.resumesCompanyList.length!=0?item.resumesCompanyList[0].resumesPost:'暂无'}}
				</view>
			</view>
			<!-- <view class="margin-top-sm" v-if="item.school">
				<view class="flex align-center">
					<view class="margin-right-xs">
						<image src="../../static/images/geren.png" style="width: 30upx;height:26upx;"></image>
					</view>
					<view style="color: #121212;">{{item.school?item.school:'暂无'}}</view>
				</view>
				<view class="text-sm margin-left margin-top-xs padding-left-xs" style="color: #999999;">
					{{item.rulePostName}}
				</view>
			</view> -->
			<view class="margin-top-sm" v-if="item.resumesWorkList">
				<view class="flex">
					<view class="margin-right-xs" style="padding-top: 8rpx;">
						<image src="https://zhaopin.xianmaxiong.com/file/uploadPath/2022/09/20/15a1ea35392f86d2dc0f1dc2def0f2d9.png" style="width: 30upx;height:30upx;"></image>
					</view>
					<view style="color: #121212;">意向岗位<text class="text-sm" style="margin-left: 10rpx;color: #999999;">{{item.rulePostName}}</text></view>
				</view>
				<view class="text-sm margin-left margin-top-xs padding-left-xs" style="color: #999999;">
					{{item.resumesPost}}
				</view>
			</view>
			<view class="margin-top-sm" v-if="item.resumesImageName">
				<view class="flex">
					<view class="margin-right-xs" style="padding-top: 8rpx;">
						<image src="https://zhaopin.xianmaxiong.com/file/uploadPath/2022/10/28/6f2c3bc743f8676cf959e4ecda1ca9d6.png" style="width: 30upx;height:30upx;"></image>
					</view>
					<view style="color: #121212;">资格证书</view>
				</view>
				<view class="text-sm margin-left margin-top-xs padding-left-xs" style="color: #999999;">
					{{item.resumesImageName}}
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
			return {};
		},
		methods: {
			//格式化姓名
			getfomate(data,sex){
				let housex = ''
				if(sex==1){ //先生
					housex = '先生'
				}else{ //女士
					housex = '女士'
				}
				return data.substring(0,1)+housex
			},
			clickItem(item, index) {
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
</style>