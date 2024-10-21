<template>
	<view>
		<!-- 列表 -->
		<view class="list flex justify-between">
			<!-- 左侧分类 -->
			<view class="list-l">
				<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-bottom: 20rpx;">
					<block v-if="type">
						<view class="list-l-item flex align-center " v-if="index!=3" @click="change_click_index(index)"
							:class="current==index?'active':''" v-for="(item,index) in list" :key="index">
							{{item.name}}
						</view>
					</block>
					<block v-else>
						<view class="list-l-item flex align-center " @click="change_click_index(index)"
							:class="current==index?'active':''" v-for="(item,index) in list" :key="index">
							{{item.name}}
						</view>
					</block>

				</scroll-view>

			</view>
			<!-- 右侧列表 -->
			<view class="list-r">
				<scroll-view scroll-y="true" @scroll="e=>{scrolls(e)}" scroll-with-animation="true"
					:scroll-into-view="'bottomView'+current" style="width: 100%;height: 100%;padding-bottom: 20rpx;">
					<block v-if="type">
						<view class="list-r-item" :id="'bottomView'+index" v-if="list.length>0 && index!=3"
							v-for="(item,index) in list" :key="index">
							<view class="list-r-item-title">
								{{item.name}}
							</view>
							<view class="list-r-item-childs flex justify-around align-center flex-wrap">
								<view class="list-r-item-childs-i flex justify-center align-center"
									v-for="(ite,ind) in item.list" :class="ite.select==true?'activeRight':''"
									@click="selectHyList(index,item.name,ite,ind)" :key="ind">
									{{ite.value}}
								</view>
								<view class="list-r-item-childs-i flex justify-center align-center"
									style="height: 0;padding: 0;">
								</view>
							</view>
						</view>
					</block>
					<block v-else>
						<view class="list-r-item" :id="'bottomView'+index" v-if="list.length>0"
							v-for="(item,index) in list" :key="index">
							<view class="list-r-item-title">
								{{item.name}}
							</view>
							<view class="list-r-item-childs flex justify-around align-center flex-wrap">
								<view class="list-r-item-childs-i flex justify-center align-center"
									v-for="(ite,ind) in item.list" :class="ite.select==true?'activeRight':''"
									@click="selectHyList(index,item.name,ite,ind)" :key="ind">
									{{ite.value}}
								</view>
								<view class="list-r-item-childs-i flex justify-center align-center"
									style="height: 0;padding: 0;">
								</view>
							</view>
						</view>
					</block>
					<empty v-if="list.length==0" />
				</scroll-view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom flex justify-center">
			<view class="bottom-box flex justify-between">
				<view @click="cleanSe()" class="bottom-box-left flex justify-center align-center">
					清除
				</view>
				<view @click="submitSe()" class="bottom-box-right flex justify-center align-center">
					确定
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import empty from '../../components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				current: 0,
				currents: 0,
				list: [],
				top_list: [],
				selectArr: [],
				type: '',
			};
		},
		onLoad(option) {
			if (option.type) {
				this.type = option.type
			}
			this.getSchools()
		},
		methods: {
			/**
			 * 清空筛选条件并清空缓存
			 */
			cleanSe() {
				this.list.map(item => {
					item.list.map(ite => {
						ite.select = false
					})
				})
				uni.removeStorageSync('filter')
			},
			/**
			 * 处理选中的条件
			 */
			submitSe() {
				let arr = JSON.parse(JSON.stringify(this.list))
				arr = arr && arr.map(item => {
					item.list = item.list && item.list.filter(val => {
						if (val.select) return val
					})
					if (item.list.length > 0) {
						return item
					}
				})
				arr = arr.filter(val => {
					if (val) return val
				})
				uni.setStorageSync('filter', arr) //把选中的条件存到本地然后返回首页进行筛选
				uni.navigateBack()
			},
			/**
			 * @param {Object} index 外层下标
			 * @param {Object} name 外层名称
			 * @param {Object} info 内层对象
			 * @param {Object} ind 内层下标
			 * 选择右侧的筛选
			 * 薪资单选，其余可以多选
			 */
			selectHyList(index, name, info, ind) {
				//选中
				if (name == '薪资') { // 薪资单选
					this.list[1].list.map((item, index) => {
						item.select = false
						info.select = true
					})
				} else { //其余多选
					if (info.value == '不限') {
						this.list[index].list.map((item, index) => {
							item.select = false
							info.select = true
						})
					} else {
						this.list[index].list.map((item, ind) => {
							if (item.value == '不限') {
								item.select = false
							}
						})
						info.select = !info.select;
					}
				}
				this.$forceUpdate()
			},
			/**
			 * @param {Object} index
			 * 点击切换分类
			 */
			change_click_index(index) {
				this.current = index;
				//解决最后一个 ***来回*** 问题 (由于点击左侧导航，右侧锚点位置信息变化，此时滚动事件也随之滚动。)
				uni.setStorageSync("resolve", "last");
				setTimeout(() => {
					uni.removeStorageSync("resolve")
				}, 400);
			},
			scrolls(e) {
				if (!uni.getStorageSync("resolve")) {
					// this.get_node_details(e);
				};
			},
			/**
			 * @param {Object} options
			 * 获取节点信息
			 */
			get_node_details(options) {
				const query = uni.createSelectorQuery().in(this); //获得实例
				//获取多个节点方式
				query.selectAll(".list-r-item").boundingClientRect(data => {
					this.top_list = data.map(item => {
						return Math.ceil(item.top);
					});
					this.async_detail_msg(options);
				}).exec();
			},
			/**
			 * @param {Object} options
			 * 设置滚动的位置
			 */
			async_detail_msg(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				let top_page = options.detail.scrollTop + this.top_list[0];
				for (let i = 0; i < this.top_list.length; i++) {
					let node1 = this.top_list[i];
					let node2 = this.top_list[i + 1];
					if (node2 && top_page >= node1 && top_page < node2) {
						this.current = i;
						break;
					} else if (node2 && top_page === node2) {
						this.current = i + 1;
						break;
					}
				}
			},
			/**
			 * 获取学历列表
			 */
			getSchools() {
				this.$Request.get("/app/dict/list", {
					type: '学历'
				}).then(res => {
					if (res.code == 0) {
						let list = [{
							value: '不限'
						}]
						let obj = {
							name: '学历',
							list: [...list, ...res.data]
						}
						console.log(obj, '学历')

						this.getMoney(obj)
					}
				})
			},
			/**
			 * 获取薪资 列表
			 */
			getMoney(obj1) {
				this.$Request.get("/app/dict/list", {
					type: '薪资 '
				}).then(res => {
					if (res.code == 0) {
						let list = [{
							value: '不限'
						}]
						let obj = {
							name: '薪资',
							list: [...list, ...res.data]
						}
						this.getJy(obj1, obj)

					}
				})
			},
			/**
			 * 获取工作经验列表
			 */
			getJy(obj1, obj2) {
				this.$Request.get("/app/dict/list", {
					type: '工作经验 '
				}).then(res => {
					if (res.code == 0) {
						let list = [{
							value: '不限'
						}]
						let obj = {
							name: '经验',
							list: [...list, ...res.data]
						}
						this.getGm(obj1, obj2, obj)
					}
				})
			},
			/**
			 * 获取公司规模列表
			 */
			getGm(obj1, obj2, obj3) {
				this.$Request.get("/app/dict/list", {
					type: '公司规模 '
				}).then(res => {
					if (res.code == 0) {
						let list = [{
							value: '不限'
						}]
						let obj = {
							name: '公司规模',
							list: [...list, ...res.data]
						}
						this.getIndustryList(obj1, obj2, obj3, obj)
					}
				})
			},
			/**
			 * 获取行业列表
			 */
			getIndustryList(obj1, obj2, obj3, obj4) {
				this.$Request.get("/app/industry/getIndustryList").then(res => {
					if (res.code == 0) {
						let list = [{
							value: '不限'
						}]
						let arrAy = []
						res.data.map(item => {
							arrAy = [...arrAy, ...item.childrenList]
						})
						let arrs = JSON.parse(JSON.stringify(arrAy).replace(/industryName/g, "value"))
						let obj = {
							name: '行业',
							list: [...list, ...arrs]
						}
						let arr = []
						arr[0] = obj1
						arr[1] = obj2
						arr[2] = obj3
						arr[3] = obj4
						arr[4] = obj
						arr.map(item => {
							item.list.map(ite => {
								ite.select = false
							})
						})

						this.list = arr
						if (uni.getStorageSync('filter')) {
							let filter = uni.getStorageSync('filter')
							let arrs = []
							filter.map(item => {
								item.list.map(ite => {
									arrs.push(ite.value)
								})
							})

							console.log(this.list, 'list')
							console.log(arrs, 'list')
							this.list.map((item, index) => {
								item.list.map((ite, ind) => {
									arrs.map((it, ins) => {
										if (index == ins && ite.value == it) {
											ite.select = true
										}
									})
								})
							})
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

	.activeRight {
		color: #00B88F !important;
		background-color: #DDFFF7 !important;
	}

	.active {
		border-left: 8rpx solid #00B88F !important;
		color: #00B88F !important;
	}

	.list {
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - 200rpx);
		/* #endif */
		/* #ifndef H5 */
		height: calc(100vh - 120rpx);

		/* #endif */
		.list-l {
			width: 30%;
			height: 100%;

			.list-l-item {
				margin-top: 40rpx;
				font-size: 28rpx;
				color: #121212;
				padding-left: 20rpx;
				border-left: 8rpx solid #ffffff;
			}
		}

		.list-r {
			width: 70%;
			height: 100%;
			border-left: 1rpx solid #F2F2F7;
			box-sizing: border-box;

			.list-r-item {
				width: 100%;
				margin-top: 40rpx;

				.list-r-item-title {
					width: 100%;
					color: #121212;
					font-size: 32rpx;
					font-weight: bold;
					padding-left: 30rpx;
				}

				.list-r-item-childs {
					width: 100%;

					.list-r-item-childs-i {
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

	.bottom {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #F2F2F7;
		background-color: #ffffff;

		.bottom-box {
			width: 686rpx;
			height: 70rpx;
			margin-top: 20rpx;

			.bottom-box-left {
				width: 32%;
				height: 100%;
				border-radius: 8rpx;
				background-color: #F2F2F7;
			}

			.bottom-box-right {
				width: 65%;
				height: 100%;
				border-radius: 8rpx;
				background-color: #00B88F;
				color: #ffffff;
			}
		}
	}
</style>