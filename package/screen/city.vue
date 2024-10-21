<template>
	<view>
		<view class="top flex justify-between">
			<!-- 左边区 -->
			<view class="left">
				<scroll-view scroll-y="true" class="leftScroll">
					<view class="leftScrollItem" :class="current==index?'active':''" @click="selectCity(index)"
						v-for="(item,index) in list" :key="index">
						{{item.city}}
					</view>
				</scroll-view>
			</view>
			<!-- 右边地址 -->
			<view class="right">
				<scroll-view scroll-y="true" class="rightScroll">
					<view class="rightScrollItem flex align-center justify-between" :class="currents==index?'active':''"
						@click="addCity(index,item)" v-for="(item,index) in rightList" :key="index">
						<view class="rightScrollItem-t">
							{{item.county}}
						</view>
						<u-icon v-if="currents==index" name="checkbox-mark" color="#00DD9A" size="28"></u-icon>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 底部确认 -->
		<view class="bottom flex align-center justify-center">
			<view class="bottom-boxs flex justify-center align-center" @click="cleanCity()">
				清除
			</view>
			<view class="bottom-box flex justify-center align-center" @click="submit()">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				currents: 0,
				list: [],
				rightList: [],
				city: '', //市
				county: '', //区
			};
		},
		onLoad(option) {
			this.city = option.city
			this.county = option.county
			this.getList()
		},
		onShow() {

		},
		methods: {
			/**
			 * 设置选择的城市并返回
			 */
			submit() {
				this.city = this.rightList[this.currents].city
				this.county = this.rightList[this.currents].county
				let data = {
					city: this.city,
					county: this.county == '全部' ? '' : this.county
				}
				uni.$emit('filterCity', data)
				uni.navigateBack()
			},
			/**
			 * 清除城市缓存
			 */
			cleanCity() {
				this.city = ''
				this.county = ''
				this.current = 0
				this.rightList = this.list[this.current].countyList
				this.currents = 0
				// uni.navigateBack()
			},
			/**
			 * @param {Object} city
			 * 选择区域并返回
			 */
			addCity(index, county) {
				this.county = county
				this.currents = index

			},
			/**
			 * @param {Object} index
			 * 选择城市
			 */
			selectCity(index) {
				this.rightList = this.list[index].countyList
				this.current = index
				this.currents = 0
			},
			/**
			 * 获取地址数据
			 */
			getList() {
				this.$Request.get('/app/postPush/getCityCounty').then(res => {
					if (res.code == 0) {
						this.list = res.data
						this.list.map(item => {
							let arr = []
							item.countyList.map(ite => {
								let obj = {
									city: item.city,
									county: ite
								}
								arr.push(obj)
							})
							item.countyList = arr
							item.countyList = [{
								city: item.city,
								county: '全部'
							}, ...item.countyList]
						})
						if (this.city) {
							this.list.map((item, index) => {
								if (item.city == this.city) {
									this.current = index
									this.rightList = item.countyList
									console.log(this.rightList, '999999999999')
									this.rightList.map((ite, ind) => {
										if (ite.county == this.county) {
											this.currents = ind
										}
									})

								}
							})
						} else {
							this.rightList = this.list[this.current].countyList
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	.active {
		color: #00DD9A;
	}

	.top {
		width: 100%;
		position: fixed;
		/* #ifdef H5 */
		height: calc(100vh - 200rpx);
		top: 20rpx;
		/* #endif */
		/* #ifndef H5 */
		height: calc(100vh - 120rpx);
		top: 0;
		/* #endif */

		.left {
			width: 40%;
			height: 100%;
			border-right: 1rpx solid #F2F2F7;

			.leftScroll {
				width: 100%;
				height: 100%;

				.leftScrollItem {
					width: 80%;
					margin: 20rpx 10%;
					overflow: hidden; //超出的文本隐藏
					text-overflow: ellipsis; //溢出用省略号显示
					white-space: nowrap; // 默认不换行；
				}
			}
		}

		.right {
			width: 60%;
			height: 100%;

			.rightScroll {
				width: 100%;
				height: 100%;

				.rightScrollItem {
					width: 80%;
					margin: 20rpx 10%;

					.rightScrollItem-t {
						width: 80%;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; // 默认不换行；
					}
				}
			}
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		border-top: 1rpx solid #F2F2F7;

		.bottom-box {
			width: 60%;
			height: 70rpx;
			border-radius: 8rpx;
			background-color: #00B88F;
			color: #ffffff;
		}

		.bottom-boxs {
			width: 30%;
			height: 70rpx;
			background-color: #F2F2F7;
			margin-right: 3%;
		}
	}
</style>