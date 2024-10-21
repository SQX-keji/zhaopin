<template>
	<view>
		<view class="jobAll" :class="topY==true?'end':'start'" @touchstart="start" @touchend="end"
			@touchmove.stop="move">
			<view class="jobAll-search flex justify-center">
				<view class="jobAll-search-box">
					<u-dropdown :mask='false' active-color="#00B88F">
						<u-dropdown-item v-model="value1" title="岗位" @change="change1" :options="options1"></u-dropdown-item>
						<u-dropdown-item v-model="value2" title="经验" @change="change2" :options="options2"></u-dropdown-item>
						<u-dropdown-item v-model="value3" title="薪资" @change="change3" :options="options3"></u-dropdown-item>
						<u-dropdown-item v-model="value4" title="城市" @change="change4" :options="options4"></u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
			<view class="jobAll-item flex justify-center">
				<view class="jobAll-item-box">
					<scroll-view scroll-y="true" v-if="list.length>0" style="width: 100%;height: 100%;" :refresher-enabled="true"
						:refresher-triggered="refresher" @refresherpulling="scrolltoupper"
						@refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
						<view class="jobAll-item-box-item" v-for="(item,index) in list" :key="index"
							@tap.native="gotos(item.postPushId)">
							<view class="jobAll-item-box-item-title flex align-center justify-between">
								<text>{{item.ruleClassifyName}}</text>
								<text>{{item.salaryRange}}</text>
							</view>
							<view class="jobAll-item-box-item-label flex align-center flex-wrap">
								<view class="jobAll-item-box-item-labels">
									{{item.education}}
								</view>
								<view class="jobAll-item-box-item-labels">
									{{item.experience}}
								</view>
								<view class="jobAll-item-box-item-labels">
									{{item.industry}}
								</view>
							</view>
							<view class="jobAll-item-box-item-line" v-if="(index + 1) != list.length">

							</view>
						</view>
					</scroll-view>
					<empty v-else />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import empty from '../empty.vue'
	export default {
		name: "btnPopous",
		components:{
			empty
		},
		props: {
			//公司id
			companyId: {
				type: String,
				default: ''
			},
			//城市数组
			cittArr: {
				type: Array,
				default: []
			},
			//薪资数组
			moneyArr: {
				type: Array,
				default: []
			},
			//经验数组
			jyArr: {
				type: Array,
				default: []
			},
			//岗位分类
			classify:{
				type: Array,
				default: []
			}
		},
		data() {
			return {
				refresher: false,
				list: [],
				clientX: '',
				clientY: '',
				topY: false,
				value1: 1,
				value2: 1,
				value3: 1,
				value4: 1,
				options1: [],
				options2: [],
				options3: [],
				options4: [],
				page:1,
				pages:1,
				limit:10,
				projectName:'',//岗位名称
				address:'',//城市
				salaryRange:'',//薪资
				experience:'',//经验
			};
		},
		watch:{
			//城市
			cittArr(newArr,oldArr){
				//拿到最新传递的城市数据，处理成需要的格式
				let arr = [
					{
						label:'全部',
						value:'',
					}
				]
				this.cittArr.map(item=>{
					let obj = {
						label:item,
						value:item,
					}
					arr.push(obj)
				})
				this.options4 = arr
			},
			//岗位分类列表
			classify(newArr,oldArr){
				//拿到最新传递的岗位数据，处理成需要的格式
				let arr = [
					{
						label:'全部',
						value:'',
					}
				]
				this.classify.map(item=>{
					let obj = {
						label:item,
						value:item,
					}
					arr.push(obj)
				})
				this.options1 = arr
			},
			//经验
			jyArr(newArr,oldArr){
				//拿到最新传递的经验数据，处理成需要的格式
				let arr = [
					{
						label:'全部',
						value:'',
					}
				]
				this.jyArr.map(item=>{
					let obj = {
						label:item.value,
						value:item.value,
					}
					arr.push(obj)
				})
				this.options2 = arr
			},
			//薪资
			moneyArr(newArr,oldArr){
				//拿到最新传递的薪资数据，处理成需要的格式
				let arr = [
					{
						label:'全部',
						value:'',
					}
				]
				this.moneyArr.map(item=>{
					let obj = {
						label:item.value,
						value:item.value,
					}
					arr.push(obj)
				})
				this.options3 = arr
			},
		},
		created(){
			this.userGetPostPushList()
		},
		methods: {
			change1(e){
				this.projectName = e
				this.userGetPostPushList()
			},
			change2(e){
				this.experience = e
				this.userGetPostPushList()
			},
			change3(e){
				this.salaryRange = e
				this.userGetPostPushList()
			},
			change4(e){
				this.address = e
				this.userGetPostPushList()
			},
			/**
			 * 上拉加载更多
			 */
			scrolltolower(){
				if(this.page<this.pages){
					this.page += 1
					this.userGetPostPushList()
				}
			},
			/**
			 * 获取岗位列表
			 */
			userGetPostPushList(){
				let data = {
					companyId:this.companyId,
					page:this.page,
					limit:this.limit,
					ruleClassifyName:this.projectName,//岗位名称
					city:this.address,//城市
					salaryRange:this.salaryRange,//薪资
					experience:this.experience,//经验
				}
				this.$Request.getT("/app/postPush/userGetPostPushList",data).then(res => {
					if (res.code == 0) {
						this.pages = res.data.pages
						if(this.page==1){
							this.list = res.data.records
						}else{
							this.list = [...this.list,...res.data.records]
						}
					}
				})
			},
			gotos(postPushId) {
				console.log('rrrrrrrrrrrrrrrrrrrrrrrr')
				uni.navigateTo({
					url:'/pages/index/game/order?postPushId='+postPushId
				})
			},
			refresherrefresh() {
				this.refresher = false
			},
			scrolltoupper(e) {
				// this.refresher = true
				this.refresher = true
				this.topY = false

			},
			start(e) {
				this.clientX = e.changedTouches[0].clientX
				this.clientY = e.changedTouches[0].clientY
			},
			end(e) {
				let subX = e.changedTouches[0].clientX - this.clientX
				let subY = e.changedTouches[0].clientY - this.clientY
				if (subY < -50) {
					this.topY = true
				} else if (subY > 200) {
					this.topY = false
				}
			},
			move(e) {

			},
		}
	}
</script>

<style lang="scss">
	.jobAll {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		border-radius: 30px 30px 0px 0px;
		position: fixed;
		z-index: 99999;

		.jobAll-search {
			width: 100%;
			margin-top: 40rpx;

			.jobAll-search-box {
				width: 686rpx;
				height: 100%;
			}
		}

		.jobAll-item {
			width: 100%;
			height: 80vh;
			margin-top: 60rpx;

			.jobAll-item-box {
				width: 686rpx;
				height: 100%;

				.jobAll-item-box-item {
					width: 100%;
					margin-bottom: 20rpx;

					.jobAll-item-box-item-title {
						width: 100%;

						text:nth-of-type(1) {
							color: #1F1F1F;
							font-size: 38rpx;
							font-weight: 800;
						}

						text:nth-of-type(2) {
							color: #00B88F;
							font-size: 38rpx;
							font-weight: bold;
						}
					}

					.jobAll-item-box-item-label {
						width: 100%;
						margin-top: 30rpx;

						.jobAll-item-box-item-labels {
							color: #666666;
							font-size: 26rpx;
							font-weight: 500;
							padding: 10rpx 15rpx;
							border-radius: 8rpx;
							background-color: #F6F6F6;
							margin-right: 20rpx;
							margin-bottom: 20rpx;
						}
					}

					.jobAll-item-box-item-line {
						width: 100%;
						border-bottom: 1rpx solid #E6E6E6;
						margin-top: 40rpx;
					}
				}
			}
		}
	}

	.start {
		bottom: -80vh;
		transition-duration: .5s
	}

	.end {
		bottom: 0;
		transition-duration: .5s
	}
</style>
