<template>
	<view style="padding-bottom: 40rpx;">
		<!-- 用户端 -->
		<block v-if="userType==1">
			<view class="info flex justify-center">
				<view class="info-box">
					<view class="info-box-btn flex justify-end align-center" v-if="token && XCXIsSelect!='否'">
						<image src="../../static/images/my/icon/selectUser.png"
							style="width: 40rpx;height: 100%;margin-right: 40rpx;" mode="" @click="bindQe(userType)">
						</image>
						<!-- <image src="../../static/images/my/icon/set.png" style="width: 44rpx;height: 100%;" mode="">
						</image> -->
					</view>
					<view class="info-box-header flex justify-between align-center">
						<view style="width: 50%;height: 100%;" class="flex align-center">
							<view class="info-box-header-l">
								<image :src="avatar?avatar:'../../static/logo.png'" @click="goNav('/pages/my/userinfo')"
									mode=""></image>
							</view>
							<view class="info-box-header-r">
								<view class="info-box-header-r-name flex align-center"
									@click="goNav('/pages/my/userinfo')">
									{{userName}}
									<image v-if="isVip==true" src="../../static/images/my/isVip.png"
										style="margin-left: 10rpx;width: 80rpx;height: 30rpx;" mode=""></image>
								</view>
								<view v-if="token && XCXIsSelect!='否'" class="info-box-header-r-bj flex align-center"
									@click="goNav('/package/my/resume')">
									<u-icon name="edit-pen" color="#1D1D1D" size="28"></u-icon>
									编辑简历
								</view>
							</view>
						</view>
						<view class="flex align-center" @click="currenStatus()" v-if="token && XCXIsSelect!='否'">
							<image src="../../static/images/my/rightLeft.png" style="width: 50rpx;height: 50rpx;"
								mode=""></image>
							{{resumesStatus==1?'离职-正在找工作':(resumesStatus==2?'在职-考虑机会':'在职-暂不考虑')}}
						</view>

					</view>
					<view class="info-box-num flex align-center justify-between" v-if="XCXIsSelect!='否'">
						<view class="info-box-num-td" @click="gojiLuList('/package/records/records','投递记录')">
							<view class="info-box-num-td-num">
								{{deliveryCount}}
							</view>
							<view class="info-box-num-td-name">
								投递记录
							</view>
						</view>
						<view class="info-box-num-td" @click="gojiLuList('/package/records/records','浏览记录')">
							<view class="info-box-num-td-num">
								{{browseCount}}
							</view>
							<view class="info-box-num-td-name">
								浏览记录
							</view>
						</view>
						<view class="info-box-num-td" @click="gojiLuList('/package/records/records','我的收藏')">
							<view class="info-box-num-td-num">
								{{collectionCount}}
							</view>
							<view class="info-box-num-td-name">
								我的收藏
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- vip -->
			<view class="vip flex justify-center" @click="goNav('/my/vip/index')" v-if="XCXIsSelect!='否'">
				<view class="vip-box">
					<image class="vip-box-bg" src="../../static/images/my/icon/vip.png" mode=""></image>
					<view class="vip-box-cont flex justify-center">
						<view class="flex justify-between align-center"
							style="width: 626rpx;z-index: 9;margin-top: 30rpx;">
							<view class="flex align-center">
								<image src="../../static/images/my/icon/vip2.png"
									style="width: 32rpx;height: 29rpx;margin-right: 5rpx;" mode=""></image>
								<image src="../../static/images/my/icon/vip3.png"
									style="width: 140rpx;height: 29rpx;margin-right: 20rpx;" mode=""></image>
								<text style="color: #914016;font-size: 24rpx;">开通享受特权找工作</text>
							</view>
							<view class="flex align-center"
								style="color: #914016;font-size: 24rpx;font-weight: bold;z-index: 999;margin-right: 10rpx;">
								{{isVip==true?'已开通':'去开通'}}
								<u-icon name="play-right-fill" color="#914016" size="18"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 求职服务 -->
			<view class="jobServer flex justify-center" v-if="XCXIsSelect!='否'"
				:style="XCXIsSelect=='否'?'margin-top:30rpx':''">
				<view class="jobServer-box flex justify-center">
					<view class="jobServer-box-c">
						<view class="jobServer-box-title">
							求职服务
						</view>
						<view class="jobServer-box-btn flex justify-between">
							<view class="jobServer-box-btn-item flex justify-center flex-wrap"
								@click="goNav('/package/my/resume')">
								<image src="../../static/images/my/icon/server1.png" mode=""></image>
								<view class="">
									我的简历
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap" @click="refresh()">
								<image src="../../static/images/my/icon/server2.png" mode=""></image>
								<view class="">
									简历刷新
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap"
								@click="goNav('/package/my/pingbi')">
								<image src="../../static/images/my/icon/server3.png" mode=""></image>
								<view class="">
									屏蔽公司
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap"
								@click="goNav('/my/jilu/jiluUser')">
								<image src="../../static/images/my/icon/server4.png" mode=""></image>
								<view class="">
									我的面试
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- 更多工具 -->
			<view class="utils flex justify-center">
				<view class="utils-box flex justify-center">
					<view class="utils-box-c">
						<view class="utils-box-c-t flex justify-between align-center">
							<!-- <view class="flex justify-center flex-wrap" style="width: 102rpx;" @click="goNav('/package/my/resume')">
								<image src="../../static/images/my/icon/utils/utils1.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									我的简历
								</view>
							</view> -->
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/pages/my/invitationUser')">
								<image src="../../static/images/my/icon/utils/utils2.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									邀请好友
								</view>
							</view>
							<view v-if="XCXIsSelect!='否'" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/feedbackIndex')">
								<image src="../../static/images/my/icon/utils/help.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									帮助中心
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;" @click="goChat">
								<image src="../../static/images/my/icon/utils/utils4.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									联系客服
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/mimi')">
								<image src="../../static/images/my/icon/utils/utils5.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									隐私协议
								</view>
							</view>

						</view>
						<view class="utils-box-c-b flex justify-between align-center">
							<!-- <view class="flex justify-center flex-wrap" style="width: 112rpx;" @click="goNav('/my/setting/mimi')">
								<image src="../../static/images/my/icon/utils/utils5.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									隐私协议
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;" @click="goNav('/my/setting/xieyi')">
								<image src="../../static/images/my/icon/utils/utils6.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									用户协议
								</view>
							</view> -->
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/xieyi')">
								<image src="../../static/images/my/icon/utils/utils6.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									用户协议
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/about')">
								<image src="../../static/images/my/icon/utils/utils7.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									关于我们
								</view>
							</view>
							<view v-if="token" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goOut()">
								<image src="../../static/images/my/icon/utils/utils8.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									退出登录
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;height: 0;" v-if="!token">

							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;height: 0;">

							</view>
						</view>
					</view>

				</view>
			</view>

		</block>
		<!-- 企业端 -->
		<block v-else>
			<view class="info flex justify-center">
				<view class="info-box">
					<view v-if="XCXIsSelect!='否'" class="info-box-btn flex justify-end align-center">
						<image src="../../static/images/my/icon/selectUser.png"
							style="width: 40rpx;height: 100%;margin-right: 40rpx;" @click="bindQe(userType)" mode="">
						</image>
						<!-- <image src="../../static/images/my/icon/set.png" style="width: 44rpx;height: 100%;" mode="">
						</image> -->
					</view>
					<view class="info-box-header flex align-center">
						<view class="info-box-header-l">
							<image :src="avatar?avatar:'../../static/logo.png'" @click="goNav('/pages/my/userinfo')"
								mode=""></image>
						</view>
						<view class="info-box-header-r">
							<view class="info-box-header-r-name flex align-center">
								{{userName}}
								<image v-if="isCompanyVip" style="margin-left: 10rpx;width: 80rpx;height: 30rpx;"
									src="../../static/images/my/isVip.png" mode=""></image>
							</view>
							<view v-if="XCXIsSelect!='否'" class="info-box-header-r-bj flex align-center"
								@click="goNav('/my/renzheng/index')">
								<u-icon name="edit-pen" color="#1D1D1D" size="28"></u-icon>
								编辑企业信息
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- vip -->
			<view class="vip flex justify-center" @click="goNav('/my/vip/index')" v-if="XCXIsSelect!='否'">
				<view class="vip-box">
					<image class="vip-box-bg" src="../../static/images/my/icon/vip.png" mode=""></image>
					<view class="vip-box-cont flex justify-center">
						<view class="flex justify-between align-center"
							style="width: 626rpx;z-index: 9;margin-top: 30rpx;">
							<view class="flex align-center">
								<image src="../../static/images/my/icon/vip2.png"
									style="width: 32rpx;height: 29rpx;margin-right: 5rpx;" mode=""></image>
								<image src="../../static/images/my/icon/vip4.png"
									style="width: 140rpx;height: 29rpx;margin-right: 20rpx;" mode=""></image>
								<text style="color: #914016;font-size: 24rpx;">尊享超多特权</text>
							</view>
							<view class="flex align-center"
								style="color: #914016;font-size: 24rpx;font-weight: bold;z-index: 999;margin-right: 10rpx;">
								{{isCompanyVip==true?'已开通':'去开通'}}
								<u-icon name="play-right-fill" color="#914016" size="18"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 求职服务 -->
			<view class="jobServer flex justify-center" v-if="XCXIsSelect!='否'"
				:style="XCXIsSelect=='否'?'margin-top:30rpx':''">
				<view class="jobServer-box flex justify-center">
					<view class="jobServer-box-c">
						<view class="jobServer-box-title">
							招聘服务
						</view>
						<view class="jobServer-box-btn flex justify-between">
							<view class="jobServer-box-btn-item flex justify-center flex-wrap"
								@click="goNavStatus('/package/addJob/addJob')">
								<image src="../../static/images/my/icon/server1.png" mode=""></image>
								<view class="">
									发布招聘
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap" @click="refreshJob()">
								<image src="../../static/images/my/icon/server2.png" mode=""></image>
								<view class="">
									招聘刷新
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap"
								@click="goNav('/my/renzheng/index')">
								<image src="../../static/images/my/icon/server3.png" mode=""></image>
								<view class="">
									认证中心
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap"
								@click="goNav('/package/deliveryRecord/deliveryRecord')">
								<image src="../../static/images/my/icon/server4.png" mode=""></image>
								<view class="">
									已投简历
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- 我的钱包 -->
			<view class="money flex justify-center" v-if="XCXIsSelect!='否'">
				<view class="money-box flex justify-center align-center">
					<view class="money-box-c flex justify-between">
						<view class="money-box-c-l flex flex-wrap" @click="goNav('/my/wallet/wallet')">
							<view class="money-box-c-l-name">
								我的钻石
							</view>
							<view class="money-box-c-l-price flex align-center">
								{{money}}
								<text style="margin-left: 10rpx;">钻石</text>
							</view>
						</view>
						<view class="money-box-c-r flex flex-wrap" @click="goNav('/my/gird/browse')">
							<view class="money-box-c-r-name">
								浏览记录
							</view>
							<view class="money-box-c-r-more">
								点击查看更多
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 我的项目 -->
			<view class="jobServer flex justify-center" style="margin-top: 20rpx;" v-if="XCXIsSelect!='否'">
				<view class="jobServer-box flex justify-center">
					<view class="jobServer-box-c" @click="goNav('/my/order/index')">
						<view class="jobServer-box-title">
							我的招聘
						</view>
						<view class="jobServer-box-btn flex justify-between">
							<view class="jobServer-box-btn-item flex justify-center flex-wrap item-width"
								@click.stop="goNav('/my/order/index?index='+1)">
								<image src="../../static/images/my/my/my1.png" style="width: 46rpx;height: 38rpx;"
									mode=""></image>
								<view class="">
									待审核
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap item-width"
								@click.stop="goNav('/my/order/index?index='+2)">
								<image src="../../static/images/my/my/my2.png" style="width: 46rpx;height: 38rpx;"
									mode=""></image>
								<view class="">
									招聘中
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap item-width"
								@click.stop="goNav('/my/order/index?index='+5)">
								<image src="../../static/images/my/my/my3.png" style="width: 46rpx;height: 38rpx;"
									mode=""></image>
								<view class="">
									已关闭
								</view>
							</view>
							<view class="jobServer-box-btn-item flex justify-center flex-wrap item-width"
								@click.stop="goNav('/my/order/index?index='+3)">
								<image src="../../static/images/my/my/my4.png" style="width: 50rpx;height: 38rpx;"
									mode=""></image>
								<view class="">
									已拒绝
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>

			<!-- 更多工具 -->
			<view class="utils flex justify-center">
				<view class="utils-box flex justify-center">
					<view class="utils-box-c">
						<view class="utils-box-c-t flex justify-between align-center">
							<view v-if="XCXIsSelect!='否'" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/jilu/jilu')">
								<image src="../../static/images/my/icon/utils/jilu.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									面试记录
								</view>
							</view>
							<view v-if="XCXIsSelect!='否'" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/renzheng/zhuanrang')">
								<image src="../../static/images/my/icon/utils/qy.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									转让企业
								</view>
							</view>
							<view v-if="XCXIsSelect!='否'" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/package/blackList/blackList')">
								<image src="../../static/images/my/icon/utils/utils3.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									黑名单
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/pages/my/invitationUserqy')">
								<image src="../../static/images/my/icon/utils/utils2.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									邀请好友
								</view>
							</view>




						</view>
						<view class="utils-box-c-b flex justify-between align-center">
							<view class="flex justify-center flex-wrap" style="width: 112rpx;" @click="goChat">
								<image src="../../static/images/my/icon/utils/utils4.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									联系客服
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/mimi')">
								<image src="../../static/images/my/icon/utils/utils5.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									隐私协议
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/xieyi')">
								<image src="../../static/images/my/icon/utils/utils6.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									用户协议
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/about')">
								<image src="../../static/images/my/icon/utils/utils7.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									关于我们
								</view>
							</view>

						</view>
						<view class="utils-box-c-b flex justify-between align-center">
							<view v-if="XCXIsSelect!='否'" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goNav('/my/setting/feedbackIndex')">
								<image src="../../static/images/my/icon/utils/help.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									帮助中心
								</view>
							</view>
							<view v-if="token" class="flex justify-center flex-wrap" style="width: 112rpx;"
								@click="goOut()">
								<image src="../../static/images/my/icon/utils/utils8.png"
									style="width: 54rpx;height: 54rpx;" mode=""></image>
								<view class="" style="color: #1A1A1A;font-size: 24rpx;margin-top: 15rpx;">
									退出登录
								</view>
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;height: 0;">
							</view>
							<view class="flex justify-center flex-wrap" style="width: 112rpx;height: 0;">
							</view>
						</view>
					</view>

				</view>
			</view>
		</block>
		<!-- 状态切换 -->
		<u-action-sheet :list="list" @click="click" :tips="tips" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: {
					text: '切换状态',
					color: '#909399',
					fontSize: 28
				},
				show: false,
				list: [{
					id: 1,
					text: '离职-正在找工作',
					fontSize: 24
				}, {
					id: 2,
					text: '在职-考虑机会',
					fontSize: 24
				}, {
					id: 3,
					text: '在职-暂不考虑',
					fontSize: 24
				}],
				userType: 1,
				avatar: '../../static/logo.png',
				userName: '登录',
				XCXIsSelect: '否',
				userId: '',
				arr: [],
				showModal: true,
				CompanyList: {},
				money: '0',
				browseCount: 0,
				collectionCount: 0,
				deliveryCount: 0,
				isVip: false, //用户是否是vip
				isCompanyVip: false, //企业是否是vip
				resumesStatus: 1, //求职状态
				resumesId: '',
				token: '',
				companyStatus: '', //企业认证状态（1:审核中 2:已通过 3:已拒绝 空：未认证）
			};
		},
		onLoad(e) {
			console.log(this.token)
			this.XCXIsSelect = this.$queue.getData("XCXIsSelect");

		},
		onShow() {
			this.token = uni.getStorageSync('token')
			console.log(this.token, 'myToken');
			if (uni.getStorageSync('userType')) {
				this.userType = uni.getStorageSync('userType')
			}
			this.userId = uni.getStorageSync('userId')
			if (this.userId) {
				this.getUserInfo()
				this.getMyMoney()
				this.getUserData()
				if (this.userType == 1) {
					this.getJlInfo()
				} else {
					this.getCompanyStatus()
				}
				this.$Request.getT('/app/common/type/310').then(res => { //消息未读提醒
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				this.$Request.getT('/app/common/type/337').then(res => { //预约成功通知(通用)
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				this.$Request.getT('/app/common/type/338').then(res => { //订单状态通知
					if (res.code == 0) {
						if (res.data && res.data.value) {
							this.arr.push(res.data.value)
						}
					}
				})
				// #ifdef MP-WEIXIN
				if (this.showModal) {
					this.openMsg()
				}
				// #endif
			}
		},
		methods: {
			// 在线客服
			goChat() {
				let that = this
				if (uni.getStorageSync('userType') == 1) { //用户端
					// #ifdef MP-WEIXIN
					wx.openCustomerServiceChat({
						extInfo: {
							url: that.$queue.getData('kefu')
						},
						corpId: that.$queue.getData('kefuAppid'),
						success(res) {
							console.log(res)
						},
					})
					// #endif
					// #ifdef H5
					window.location.href = that.$queue.getData('kefu');
					// #endif
					// #ifdef APP
					let kefu = that.$queue.getData('kefu')
					console.log(kefu)
					plus.runtime.openURL(kefu, function(res) {});
					// #endif
				} else { //企业端
					// #ifdef MP-WEIXIN
					wx.openCustomerServiceChat({
						extInfo: {
							url: that.$queue.getData('kefuq')
						},
						corpId: that.$queue.getData('kefuAppidq'),
						success(res) {
							console.log(res)
						},
					})
					// #endif
					// #ifdef H5
					window.location.href = that.$queue.getData('kefuq');
					// #endif
					// #ifdef APP
					let kefu = that.$queue.getData('kefuq')
					console.log(kefu)
					plus.runtime.openURL(kefu, function(res) {});
					// #endif
				}
			},
			goNavStatus(url) {
				if (this.companyStatus) {
					if (this.companyStatus == 1) {
						uni.showToast({
							title: '企业认证审核中，请审核通过后操作!',
							icon: 'none'
						})
						return
					}
					if (this.companyStatus == 3) {
						uni.showToast({
							title: '企业认证审核未通过，请重新认证!',
							icon: 'none'
						})
						return
					}
					uni.navigateTo({
						url: url
					})

				} else {
					uni.showModal({
						title: '提示',
						content: '还未完成企业认证，请完成企业认证后操作',
						complete(ret) {
							if (ret.confirm) {

							}
						}
					})
				}
			},
			currenStatus() {
				if (uni.getStorageSync('token')) {
					this.show = true
				} else {
					this.noLogin()
				}
			},
			//查询简历信息
			getJlInfo() {
				this.$Request.getT("/app/resumes/selectResumesByUserId").then(res => {
					if (res.code == 0) {
						if (res.data) {
							this.resumesStatus = res.data.resumesStatus
							this.resumesId = res.data.resumesId
							if (this.resumesStatus == 1) {
								this.list = [{
									id: 2,
									text: '在职-考虑机会',
									fontSize: 24
								}, {
									id: 3,
									text: '在职-暂不考虑',
									fontSize: 24
								}]
							} else if (this.resumesStatus == 2) {
								this.list = [{
									id: 1,
									text: '离职-正在找工作',
									fontSize: 24
								}, {
									id: 3,
									text: '在职-暂不考虑',
									fontSize: 24
								}]
							} else {
								this.list = [{
									id: 1,
									text: '离职-正在找工作',
									fontSize: 24
								}, {
									id: 2,
									text: '在职-考虑机会',
									fontSize: 24
								}]
							}
						} else {
							uni.showToast({
								title: '暂无简历，请添加简历',
								icon: 'none'
							})
						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//切换求职状态
			click(e) {
				console.log(this.list[e].text)
				let that = this
				uni.showModal({
					title: '提示',
					content: '确认求职状态切换为:' + that.list[e].text + ' 吗？',
					confirmColor: '#00B88F',
					complete(ret) {
						if (ret.confirm) {
							let data = {
								resumesId: that.resumesId,
								resumesStatus: that.list[e].id
							}
							that.$Request.postT("/app/resumes/updateResumesStatus", data).then(res => {
								if (res.code == 0) {
									uni.showToast({
										title: '已切换'
									})
									that.getJlInfo()
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},
			//招聘刷新
			refreshJob() {
				if (uni.getStorageSync('userId')) {
					this.$Request.postT("/app/postPush/refreshPostPush").then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '刷新成功'
							})
						} else {
							if (this.isCompanyVip) {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							} else {
								uni.showModal({
									title: '提示',
									content: '今日可刷新次数已使用完，开通会员可享更多刷新次数以及其他特权',
									confirmText: '开通会员',
									confirmColor: '#00B88F',
									complete(ree) {
										if (ree.confirm) {
											uni.navigateTo({
												url: '/my/vip/index'
											})
										}
									}
								})
							}

						}
					})
				} else {
					this.noLogin()
				}
			},
			//简历刷新
			refresh() {
				if (uni.getStorageSync('userId')) {
					this.$Request.getT("/app/resumes/selectResumesByUserId").then(res => {
						if (res.code == 0) {
							if (res.data && res.data.resumesId) {
								this.$Request.postT("/app/resumes/refreshResumes", {
									resumesId: res.data.resumesId
								}).then(ret => {
									if (ret.code == 0) {
										uni.showToast({
											title: '刷新成功',
										})
									} else {
										if (this.isVip) {
											uni.showToast({
												title: ret.msg,
												icon: 'none'
											})
										} else {
											uni.showModal({
												title: '提示',
												content: '今日可刷新次数已使用完，开通会员可享更多刷新次数以及其他特权',
												confirmText: '开通会员',
												confirmColor: '#00B88F',
												complete(ree) {
													if (ree.confirm) {
														uni.navigateTo({
															url: '/my/vip/index'
														})
													}
												}
											})
										}

									}
								})
							} else {
								uni.showModal({
									title: '提示',
									content: '暂无简历，请添加简历后重试',
									confirmColor: '#00B88F',
									complete(ree) {
										if (ree.confirm) {
											uni.navigateTo({
												url: '/package/my/resume'
											})
										}
									}
								})
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})


				} else {
					this.noLogin()
				}
			},
			/**
			 * 获取投递记录、收藏记录、浏览记录
			 */
			getUserData() {
				this.$Request.getT("/app/user/userData").then(res => {
					if (res.code == 0) {
						this.browseCount = res.data.browseCount;
						this.collectionCount = res.data.collectionCount;
						this.deliveryCount = res.data.deliveryCount;
					}
				})
			},
			/**
			 * @param {Object} url  跳转路径
			 * @param {Object} name 名称
			 */
			gojiLuList(url, name) {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: url + '?title=' + name
					})
				} else {
					this.noLogin()
				}
			},
			/**
			 * 退出登录
			 */
			goOut() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					confirmColor: '#00B88F',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.removeStorageSync('userName')
							uni.removeStorageSync('avatar')
							uni.removeStorageSync('userId')
							uni.removeStorageSync('token')
							uni.removeStorageSync('phone')
							uni.removeStorageSync('zhiFuBaoName')
							uni.removeStorageSync('zhiFuBao')
							uni.removeStorageSync('invitationCode')
							uni.removeStorageSync('unionId')
							uni.removeStorageSync('openId')
							uni.removeStorageSync('isVIP')
							uni.removeStorageSync('companyId')
							// uni.removeStorageSync('userType')
							uni.setStorageSync('userType', 1)
							that.userId = ''
							that.userType = 1
							that.money = 0
							that.deliveryCount = 0
							that.browseCount = 0
							that.collectionCount = 0
							that.token = ''
							uni.showToast({
								title: '退出成功！',
								icon: 'none'
							})
							that.isLogin = true
							that.userName = '登录'
							that.avatar = '../../static/logo.png'
							that.isVip = false
							// uni.reLaunch({
							// 	url: '/pages/public/selectIdentity/selectIdentity'
							// })
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			/**
			 * 我的钻石
			 */
			getMyMoney() {
				this.$Request.get("/app/userMoney/selectMyMoney").then(res => {
					if (res.code == 0) {
						this.money = res.data.money
					}
				})
			},
			/**
			 * 获取个人信息
			 */
			getUserInfo() {
				this.$Request.get("/app/user/selectUserById").then(res => {
					if (res.code == 0) {
						this.$queue.setData('weChatNum', res.data.weChatNum)
						this.$queue.setData('zhiRate', res.data.zhiRate)
						if (res.data.avatar) {
							this.avatar = res.data.avatar
						}
						if (res.data.userName) {
							this.userName = res.data.userName
						}
						if (res.data.companyId) {
							uni.setStorageSync('companyId', res.data.companyId)
						}
						if (res.data.userType == 1 || res.data.userType == null) {
							this.userType = 1
							uni.setStorageSync('userType', 1)
							if (res.data.isUserVip == 1) { //判断用户是否是vip
								this.isVip = true
							} else {
								this.isVip = false
							}

						} else {
							this.userType = 2
							uni.setStorageSync('userType', 2)
							if (res.data.isCompanyVip == 1) { //判断企业用户是否是vip
								this.isCompanyVip = true
							} else {
								this.isCompanyVip = false
							}
						}
					}
				})
			},
			//跳转
			goNav(e) {
				if (this.userId) {
					// #ifdef MP-WEIXIN
					if (uni.getStorageSync('sendMsg')) {
						// console.log('授权+1')
						wx.requestSubscribeMessage({
							tmplIds: this.arr,
							success(re) {
								// console.log(JSON.stringify(re), 111111111111)
								var datas = JSON.stringify(re);
								if (datas.indexOf("accept") != -1) {
									// console.log(re)
								}
							},
							fail: (res) => {
								// console.log(res)
							}
						})
					}
					// #endif
					uni.navigateTo({
						url: e
					})
				} else {
					this.noLogin()
				}
			},
			//获取企业认证状态(1:审核中 2:通过 3:拒绝)
			getCompanyStatus() {
				this.$Request.get("/app/company/selectCompanyByUserId").then(res => {
					if (res.code == 0 && res.data) {
						this.companyStatus = res.data.status
						uni.setStorageSync('companyStatus', this.companyStatus)
					} else {
						this.companyStatus = ''
					}

				})
			},
			/**
			 * 获取用户企业实名数据
			 */
			getCompany() {
				this.$Request.get("/app/company/selectCompanyByUserId").then(res => {
					if (res.code == 0 && res.data) {
						this.CompanyList = res.data
						if (this.CompanyList.status == 1) {
							uni.showModal({
								title: '提示',
								content: '您提交的企业认证正在审核，是否查看修改?',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.navigateTo({
											url: '/my/renzheng/index'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else if (this.CompanyList.status == 2) {
							this.$Request.postT("/app/user/updateUserEntity", {
								userType: 2
							}).then(res => {
								if (res.code == 0) {
									// uni.setStorageSync('companyId', this.CompanyList.companyId)
									this.getUserInfo()
								}
							})
							// this.userType = 2
							// uni.setStorageSync('userType', this.userType)
						} else if (this.CompanyList.status == 3) {
							uni.showModal({
								title: '提示',
								content: '您提交的企业认证已被拒绝，是否查看修改?',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.navigateTo({
											url: '/my/renzheng/index'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					} else {
						uni.showModal({
							title: '提示',
							content: '您还未企业认证,请先进行认证',
							confirmColor: '#00B88F',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url: '/my/renzheng/index'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}
				})
			},
			// 切换身份
			bindQe(index) {
				let that = this
				if (uni.getStorageSync('userId')) {
					if (index == 2) {
						if (index == 2) { //企业换个人
							uni.showModal({
								title: '提示',
								content: '确认切换到求职者身份吗？',
								confirmColor: '#00B88F',
								complete(ret) {
									if (ret.confirm) {
										let data = {
											userType: 1
										}
										that.$Request.postT("/app/user/updateUserEntity", data).then(res => {
											if (res.code == 0) {
												that.getUserInfo()
												that.getUserData()
											}
										})
									}
								}
							})

						}
					} else if (index == 1) { //个人换企业
						uni.showModal({
							title: '提示',
							content: '确认切换到招聘者身份吗？',
							confirmColor: '#00B88F',
							complete(ret) {
								if (ret.confirm) {
									that.getCompany()
								}
							}
						})
					}
				} else {
					this.noLogin()
				}

			},
			// 开启订阅消息
			openMsg() {
				console.log('订阅消息')
				var that = this
				uni.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						console.log(ret.subscriptionsSetting, '------------------')
						// if (ret.subscriptionsSetting.itemSettings && Object.keys(ret.subscriptionsSetting.itemSettings).length == 2) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							console.log(99999)
							uni.setStorageSync('sendMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								confirmColor: '#00B88F',
								success: function(res) {
									if (res.confirm) {
										console.log(that.arr)
										wx.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												console.log(JSON.stringify(re),
													'++++++++++++++')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
													uni.setStorageSync('sendMsg', true)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										uni.setStorageSync('sendMsg', true)
										console.log('确认')
										that.showModal = false
									} else if (res.cancel) {
										console.log('取消')
										uni.setStorageSync('sendMsg', false)
										that.showModal = true
									}
								}
							})
						}
					}
				})
			},
			//未登录
			noLogin() {
				// uni.showModal({
				// 	title: '提示',
				// 	content: '您还未登录,请先登录',
				// 	confirmColor:'#00B88F',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 			// uni.reLaunch({
				// 			// 	url:'/pages/public/login'
				// 			// })
				// 			uni.navigateTo({
				// 				url: '/pages/public/login'
				// 			})
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// })
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F6FC;
	}

	.info {
		width: 100%;
		background: linear-gradient(to bottom, #D9FEED, #FBFDF0, #F2F6FC);

		.info-box {
			width: 686rpx;
			padding-bottom: 20rpx;

			.info-box-btn {
				width: 100%;
				height: 44rpx;
				margin-top: 20rpx;
			}

			.info-box-header {
				width: 100%;
				margin-top: 20rpx;
				height: 90rpx;

				.info-box-header-l {
					margin-right: 20rpx;

					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
				}

				.info-box-header-r {
					.info-box-header-r-name {
						color: #1D1D1D;
						font-size: 32rpx;
						font-weight: 800;
						margin-bottom: 10rpx;
					}

					.info-box-header-r-bj {
						color: #1D1D1D;
						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}

			.info-box-num {
				margin-top: 50rpx;

				.info-box-num-td {

					// width: 200rpx;
					.info-box-num-td-num {
						width: 100%;
						text-align: center;
						color: #333333;
						font-size: 38rpx;
						font-weight: bold;
					}

					.info-box-num-td-name {
						width: 100%;
						text-align: center;
						color: #333333;
						font-size: 24rpx;
						font-weight: 400;
						margin-top: 20rpx;
					}
				}
			}
		}
	}

	.vip {
		width: 100%;
		height: 127rpx;
		margin-top: 30rpx;

		.vip-box {
			width: 686rpx;
			height: 100%;
			position: relative;

			.vip-box-bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
			}

			.vip-box-cont {
				z-index: 2;
			}
		}
	}

	.jobServer {
		width: 100%;
		height: 235rpx;
		margin-top: -46rpx;
		z-index: 1;

		.jobServer-box {
			width: 686rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 24rpx;
			z-index: 1;

			.jobServer-box-c {
				width: 626rpx;
				height: 100%;
			}

			.jobServer-box-title {
				margin-top: 30rpx;
				width: 100%;
				color: #161616;
				font-size: 28rpx;
				font-weight: 800;
			}

			.jobServer-box-btn {
				width: 100%;
				margin-top: 30rpx;

				.item-width {
					width: 110rpx !important;
				}

				.jobServer-box-btn-item {
					width: 120rpx;
					color: #161616;
					font-size: 24rpx;

					image {
						width: 62rpx;
						height: 62rpx;
						margin-bottom: 18rpx;
					}
				}
			}
		}
	}

	.utils {
		width: 100%;
		// height: 308rpx;
		margin-top: 20rpx;

		.utils-box {
			width: 686rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 24rpx;

			.utils-box-c {
				width: 626rpx;
				height: 100%;

			}

			.utils-box-c-t {
				width: 100%;
				height: calc(308rpx / 2);
			}

			.utils-box-c-b {
				width: 100%;
				height: calc(308rpx / 2);
			}
		}
	}

	.money {
		width: 100%;
		height: 148rpx;
		margin-top: 20rpx;

		.money-box {
			width: 686rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 24rpx;

			.money-box-c {
				width: 626rpx;
				height: 90rpx;
			}

			.money-box-c-l {
				width: 50%;
				height: 100%;
				border-right: 1rpx solid #E6E6E6;
				box-sizing: border-box;

				.money-box-c-l-name {
					color: #333333;
					font-size: 28rpx;
					font-weight: bold;
					width: 100%;
				}

				.money-box-c-l-price {
					color: #1E1E1E;
					font-size: 38rpx;
					font-weight: bold;
					width: 100%;
					margin-top: 14rpx;

					text {
						font-size: 24rpx;
						font-weight: 500;

					}
				}
			}

			.money-box-c-r {
				width: 50%;
				height: 100%;

				.money-box-c-r-name {
					width: 100%;
					color: #333333;
					font-size: 28rpx;
					font-weight: bold;
					padding-left: 30rpx;
				}

				.money-box-c-r-more {
					width: 100%;
					color: #999999;
					font-size: 24rpx;
					font-weight: 400;
					padding-left: 30rpx;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>