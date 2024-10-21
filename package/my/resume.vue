<template>
	<view>
		<view v-if="JSON.stringify(list) != '{}'">
			<view class="listbox" @click="goUpdete()">
				<view class="flex align-center justify-between">
					<view class="flex align-center">
						<view style="color: #00B88F;" v-if="list.status==1">待审核</view>
						<view style="color: #00B88F;" v-if="list.status==2">已通过</view>
						<view style="color: red;" v-if="list.status==3">已拒绝</view>
						<!-- <view style="color: #00B88F;" v-if="list.status==4">简历隐藏</view>
						<view class="" style="font-size: 24rpx;color: red;margin-left: 20rpx;"
							v-if="list.isRecommend == 2">
							已录入人才库
						</view> -->
					</view>
					<view class="text-sm" style="color: #999999;">{{list.createTime}}</view>
				</view>
				<view class="margin-tb-sm" style="width: 100%;height: 1rpx;background: #EEEEEE;"></view>
				<view class="flex align-center justify-between">
					<view>
						<view class="text-xl text-bold" style="color: #000;">{{list.resumesName}}</view>
						<view class="flex align-center margin-top-xs flex-wrap" style="color: #999999;">
							<view>{{list.resumesAge}}岁</view>
							<view class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;"></view>
							<view><span v-if="list.resumesWorkExperience!='无经验'">工作</span>{{list.resumesWorkExperience}}
							</view>
							<view class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;"></view>
							<view>{{list.resumesEducation}}</view>
							<view class="margin-lr-sm" style="width: 1rpx;height: 25rpx;background: #CCCCCC;"></view>
							<view>{{list.resumesCompensation}}</view>
						</view>
					</view>
					<view>
						<image :src="avatar?avatar:'../../static/logo.png'"
							style="width: 100upx;height: 100upx;border-radius: 55upx;">
						</image>
					</view>
				</view>
				<view class="margin-top">
					<view class="flex align-center">
						<view class="margin-right-xs">
							<image src="../../static/images/qi.png" style="width: 30upx;height: 32upx;"></image>
						</view>
						<view style="color: #121212;">
							{{list.resumesCompanyList.length!=0?list.resumesCompanyList[0].resumesTitle:'暂无'}}</view>
					</view>
					<view class=" margin-left margin-top-xs padding-left-xs" style="color: #999999;font-size: 26upx;">
						{{list.resumesCompanyList.length!=0?list.resumesCompanyList[0].resumesPost:'暂无'}}
					</view>
				</view>
				<view class="margin-top-sm">
					<view class="flex align-center">
						<view class="margin-right-xs">
							<image src="../../static/images/geren.png" style="width: 35upx;height:26upx;"></image>
						</view>
						<view style="color: #121212;">{{list.school}}</view>
					</view>
					<view class="margin-left margin-top-xs padding-left-xs" style="color: #999999;font-size: 26upx;">
						{{list.major}}
					</view>
				</view>
				<view class="text-right">
					<view class="btn" v-if="list.status==2 || list.status==3" @click.stop="goUpdete()">修改简历</view>
				</view>
			</view>

		</view>

		<view class="submit" v-else @click="goUpdete()">添加简历</view>
		<empty v-if="JSON.stringify(list) == '{}'" />
	</view>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				avatar: '../../static/logo.png',
				list: {},

			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
			this.getDetails();
		},
		onShow() {
			this.avatar = this.$queue.getData("avatar");
			this.getDetails()
		},
		methods: {
			goUpdetes() {
				uni.navigateTo({
					url: '/my/publish/editors?resumesId=' + this.list.resumesId
				})
			},
			goUpdete() {
				if (JSON.stringify(this.list) != '{}') {
					uni.navigateTo({
						url: '/my/publish/editor?resumesId=' + this.list.resumesId
					})
				} else {
					uni.navigateTo({
						url: '/my/publish/editor'
					})
				}

			},
			getDetails() {
				this.$Request.get('/app/resumes/selectResumesByUserId').then(res => {
					if (res.code == 0) {
						uni.stopPullDownRefresh()
						if (res.data) {
							this.list = res.data
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #F2F2F7;
	}

	.listbox {
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 20upx 30upx;
		padding: 30upx;
	}

	.btn {
		border: 1upx solid #00B88F;
		border-radius: 30px;
		color: #00B88F;
		display: inline-block;
		padding: 15upx 30upx;
	}

	.submit {
		background: #00B88F;
		border-radius: 50px;
		margin: 0upx 30upx;
		text-align: center;
		padding: 34upx 0upx;
		color: #FFFFFF;
		// font-size: 32upx;
		// font-weight: bold;
		position: fixed;
		bottom: 100upx;
		left: 0;
		right: 0;
		z-index: 9;
	}
</style>
