<template>
	<view>
		<!-- <scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==tabCur?'text-blue cur':''" v-for="(item,index) in tabList" :key="index"
				@tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view> -->

		<!-- <block v-if="tabCur == 0">
		</block>
		<block v-if="tabCur == 1">
			Hello 通知
		</block> -->

		<!-- 筛选 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" v-if="classPickerSelectList.length>0">
					<picker @change="classPickerSelect" :value="classPickerDefIdx" :range="classPickerSelectList">
						{{classPickerSelectList[classPickerDefIdx]}}
					</picker>
				</view>

				<view class="cu-item flex-sub"
					v-if="termPickerSelectList[classPickerSelectList[classPickerDefIdx]]!=undefined">
					<picker @change="termPickerSelect" :value="termPickerDefIdx"
						:range="termPickerSelectList[classPickerSelectList[classPickerDefIdx]]">
						{{termPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerDefIdx]}}
					</picker>
				</view>

				<view class="cu-item flex-sub"
					v-if="weekPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerDefIdx]]!=undefined">
					<picker @change="weekPickerSelect" :value="weekPickerDefIdx"
						:range="weekPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerDefIdx]]">
						{{weekPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerSelectList[classPickerSelectList[classPickerDefIdx]][termPickerDefIdx]][weekPickerDefIdx]}}
					</picker>
				</view>
			</view>
		</scroll-view>
		<!-- 日期区域 -->
		<view class="date">
			<view class="month">
				<view>{{showMonth}}</view>
				<view>月</view>
			</view>
			<view class="day">
				<view class="week" v-for="(w,index) in showWeek" :key="index">
					<view class="week-item">{{w}}</view>
					<view class="weekay-item">
						{{showDays[index].getMonth()+1 == showMonth ? 
						showDays[index].getDate() + '日' : showDays[index].getDate() == 1 ? 
						showDays[index].getMonth()+1 + '月' : showDays[index].getDate() + '日'}}
					</view>
				</view>
			</view>
		</view>
		<!-- 课表区域 -->
		<scroll-view scroll-x="false" scroll-y scroll-top=0 class="courseScroll">
			<view class="courseContent">
				<!-- 时间 -->
				<view class="courseTime">
					<view v-for="(_, index) in classTimeList" :key="index" class="left">
						<view class="number">{{index+1}}</view>
						<view class="course-time">
							<view class="time-start">{{classTimeList[index][0]}}</view>
							<view class="time-end">{{classTimeList[index][1]}}</view>
						</view>
					</view>
				</view>
				<!-- 课程 -->
				<view class="course">
					<view v-for="(item, index) in weekClassSchedule" :key="index" class="kcb-item"
						:style="{'margin-left': (item.week!=1 ? (item.week)*100 : 0) + 'rpx', 'margin-top': ((item.jie-1)*110+4) +'rpx', height:(item.classNumber*110 - 8) + 'rpx'}">
						<!-- 'border': '1px solid red' -->
						<view class="smalltext" :style="{ 'background-color':colorArrays[item.id-1] }"
							@tap="showLessonInfo(item)">
							<view class="smalltextName">{{item.name}}</view>
							<view class="smalltextAddress">{{item.address}}</view>
						</view>
					</view>
				</view>

			</view>
		</scroll-view>


		<!-- 课程详情展示 -->
		<view class="cu-modal" :class="lessonInfoShow=='show'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{showedLessonInfo.name}}</view>
				</view>
				<!-- <view class="padding-xl"> -->
				<view class="cu-list menu">
					<!-- <view v-for="(item,index) in Data"></view> -->
					<view class="cu-item">
						<text class="text-grey text-sm"></text>
						<text class="text-grey text-sm">小目标还没有实现！</text>
					</view>

					<view class="cu-item">
						<text class="text-grey text-sm">文本</text>
						<text class="text-grey text-sm">小目标还没有实现！</text>
					</view>
				</view>
				<!-- </view> -->
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="setLessonInfoShow('')">取消
					</view>
					<!-- todo 检查是否有权限 -->
					<view class="action margin-0 flex-sub  solid-left" @tap="adjustLesson(showLessonInfo)">调课</view>
				</view>
			</view>
		</view>

		<!-- 课程调整 -->
		<view class="cu-modal" :class="lessonAdjustShow=='show'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">课程调整</view>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">空闲老师</view>
					<picker @change="changeFreeTeacher" :value="freeTeacherIdx" :range="freeTeacherList">
						<view class="picker">
							{{freeTeacherList[freeTeacherIdx]}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">可选课程</view>
					<picker @change="changeFreeCourse" :value="freeCourseIdx" :range="freeCourseList[freeTeacherList[freeTeacherIdx]]">
						<view class="picker">
							{{freeCourseList[freeTeacherList[freeTeacherIdx]][freeCourseIdx]}}
						</view>
					</picker>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="setLessonAdjustShow('')">取消
					</view>
					<!-- todo 检查是否有权限 -->
					<view class="action margin-0 flex-sub  solid-left" @tap="confirmLessonAdjust()">确定</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import dateUtils from '@/utils/date.js'

	export default {

		data() {
			return {
				// tabList: ['课程表', '通知'],
				// tabCur: 0,
				// scrollLeft: 0,
				today: new Date(),

				showWeek: [],
				showMonth: 0,
				showDays: [],
				// 筛选
				classPickerDefIdx: 0,
				termPickerDefIdx: 0,
				weekPickerDefIdx: 0,
				classPickerSelectList: [],
				termPickerSelectList: {},
				weekPickerSelectList: {},
				classTimeList: [],
				weekClassSchedule: [],
				datesDict: {},
				colorArrays: [],
				
				// 课程详情展示
				lessonInfoShow: '',
				//被展示的课程信息
				showedLessonInfo: {},
				// 课程调整
				lessonAdjustShow: '',
				//  空闲老师列表
				freeTeacherIdx: 0,
				freeTeacherList: [],
				freeCourseIdx: 0,
				freeCourseList: {},
			};
		},
		onLoad() {
			this.initBase()
			this.initClassScheduleData()
		},
		methods: {
			initBase() {
				this.showWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				this.colorArrays = this.$color
			},
			initClassScheduleData() {
				this.classTimeList = [
					['8:40', '9:15'],
					['9:25', '10:00'],
					['10:30', '11:05'],
					['11:15', '11:50'],
					['14:00', '14:35'],
					['14:45', '15:20'],
					['15:50', '16:25'],
					['16:35', '17:10'],
					['18:30', '19:05'],
					['19:15', '19:50'],
					['20:00', '20:35'],
					['20:45', '21:20'],
				]
				this.classPickerSelectList = [
					"高一一班(2017级)",
					"高二一班(2017级)",
					"高三一班(2017级)"
				]
				this.termPickerSelectList = {
					"高一一班(2017级)": [
						"高一(上)",
						"高一(下)"
					],
					"高二一班(2017级)": [
						"高二(上)",
						"高二(下)"
					],
					"高三一班(2017级)": [
						"高三(上)",
						"高三(下)"
					]
				}
				this.weekPickerSelectList = {
					"高一一班(2017级)": {
						"高一(上)": [
							"第1周",
							"第2周",
							"第3周"
						],
						"高一(下)": [
							"第1周",
							"第2周",
							"第3周",
							"第4周",
							"第5周"
						]
					},
					"高二一班(2017级)": {
						"高二(上)": [
							"第1周",
							"第2周",
							"第3周"
						],
						"高二(下)": [
							"第1周",
							"第2周",
							"第3周",
							"第4周"
						]
					},
					"高三一班(2017级)": {
						"高三(上)": [
							"第1周",
							"第2周",
							"第3周"
						],
						"高三(下)": [
							"第1周",
							"第2周",
							"第3周",
							"第4周"
						]
					},

				}
				this.datesDict = {
					"高一一班(2017级)": {
						"高一(上)": {
							"第1周": [
								"2024-03-04",
								"2024-03-10"
							],
							"第2周": [
								"2024-03-11",
								"2024-03-17"
							],
							"第3周": [
								"2024-03-18",
								"2024-03-24"
							]
						},
						"高一(下)": {
							"第1周": [
								"2024-04-04",
								"2024-04-10"
							],
							"第2周": [
								"2024-04-11",
								"2024-04-17"
							],
							"第3周": [
								"2024-04-18",
								"2024-04-24"
							],
							"第4周": [
								"2024-04-25",
								"2024-05-01"
							],
							"第5周": [
								"2024-05-02",
								"2024-05-08"
							]
						}
					},
					"高二一班(2017级)": {
						"高二(上)": {
							"第1周": [
								"2025-03-04",
								"2025-03-10"
							],
							"第2周": [
								"2025-03-11",
								"2025-03-17"
							],
							"第3周": [
								"2025-03-18",
								"2025-03-24"
							]
						},
						"高二(下)": {
							"第1周": [
								"2025-04-04",
								"2025-04-10"
							],
							"第2周": [
								"2025-04-11",
								"2025-04-17"
							],
							"第3周": [
								"2025-04-18",
								"2025-04-24"
							],
							"第4周": [
								"2025-04-25",
								"2025-04-31"
							]
						}
					},
					"高三一班(2017级)": {
						"高三(上)": {
							"第1周": [
								"2026-03-04",
								"2026-03-10"
							],
							"第2周": [
								"2026-03-11",
								"2026-03-17"
							],
							"第3周": [
								"2026-03-18",
								"2026-03-24"
							]
						},
						"高三(下)": {
							"第1周": [
								"2026-04-04",
								"2026-04-10"
							],
							"第2周": [
								"2026-04-11",
								"2026-04-17"
							],
							"第3周": [
								"2026-04-18",
								"2026-04-24"
							],
							"第4周": [
								"2026-04-25",
								"2026-04-31"
							]
						}
					}
				}
				this.weekClassSchedule = [{
						"id": 1,
						"week": 1,
						"jie": 7,
						"classNumber": 1,
						"name": "算法设计与分析",
						"address": "2306"
					},
					{
						"id": 1,
						"week": 1,
						"jie": 8,
						"classNumber": 1,
						"name": "算法设计与分析",
						"address": "2306"
					},
					{
						"id": 2,
						"week": 1,
						"jie": 1,
						"classNumber": 2,
						"name": "操作系统",
						"address": "5409"
					},
					{
						"id": 3,
						"week": 1,
						"jie": 3,
						"classNumber": 2,
						"name": "毛概",
						"address": "6202"
					},

					{
						"id": 4,
						"week": 2,
						"jie": 3,
						"classNumber": 2,
						"name": "Matlab",
						"address": "2306"
					},
					{
						"id": 5,
						"week": 2,
						"jie": 5,
						"classNumber": 2,
						"name": "数据库原理及应用",
						"address": "1104"
					},
					{
						"id": 7,
						"week": 2,
						"jie": 7,
						"classNumber": 2,
						"name": "数学建模",
						"address": "1215"
					},

					{
						"id": 6,
						"week": 3,
						"jie": 3,
						"classNumber": 2,
						"name": "计算机网络",
						"address": "5102"
					},
					{
						"id": 2,
						"week": 3,
						"jie": 7,
						"classNumber": 2,
						"name": "操作系统",
						"address": "5409"
					},

					{
						"id": 3,
						"week": 4,
						"jie": 1,
						"classNumber": 2,
						"name": "毛概",
						"address": "6202"
					},
					{
						"id": 6,
						"week": 4,
						"jie": 5,
						"classNumber": 2,
						"name": "计算机网络",
						"address": "2304"
					},

					{
						"id": 1,
						"week": 5,
						"jie": 3,
						"classNumber": 2,
						"name": "算法设计与分析",
						"address": "5506"
					}
				]
				this.classPickerDefIdx = 1
				this.termPickerDefIdx = 0
				this.weekPickerDefIdx = 2
				this.initPickerSelect()
			},

			initPickerSelect() {
				var classKey = this.classPickerSelectList[this.classPickerDefIdx]
				var termKey = this.termPickerSelectList[classKey][this.termPickerDefIdx]
				var weekKey = this.weekPickerSelectList[classKey][termKey][this.weekPickerDefIdx]
				var startDateStr = this.datesDict[classKey][termKey][weekKey][0]
				var endDateStr = this.datesDict[classKey][termKey][weekKey][1]
				this.showDays = dateUtils.genBetweenDates(startDateStr, endDateStr)
				this.showMonth = this.showDays[0].getMonth() + 1
			},

			classPickerSelect(e) {
				if (this.classPickerDefIdx != e.detail.value) {
					this.classPickerDefIdx = e.detail.value
					this.termPickerDefIdx = 0
					this.weekPickerDefIdx = 0
					this.initPickerSelect()
				}
			},
			termPickerSelect(e) {
				if (this.termPickerDefIdx != e.detail.value) {
					this.termPickerDefIdx = e.detail.value
					this.weekPickerDefIdx = 0
					this.initPickerSelect()
				}
			},
			weekPickerSelect(e) {
				this.weekPickerDefIdx = e.detail.value
				this.initPickerSelect()
			},

			showLessonInfo(lesson) {
				this.showedLessonInfo = {
					"id": lesson.id,
					"infos": [
						{
							"key": "名称",
							"value": lesson.name
						},
						{
							"key": "时间",
							"value": "待定"
						}
					]
				}
				this.setLessonInfoShow('show')
			},

			adjustLesson(showedLessonInfo) {
				// 先验证此老师是否有权限	
				// 获取空闲老师列表
				var result = this.getFreeTeacherList()
				this.freeTeacherList = result[0]
				this.freeCourseList = result[1]
				this.setLessonAdjustShow('show')
			},

			/**
			 * 
			 * @param {Object} freeTeacher 空闲老师ID
			 */
			changeFreeTeacher(e) {
				this.freeTeacherIdx = e.detail.value
			},
			changeFreeCourse(e) {
				this.freeCourseIdx = e.detail.value
			},
			/**
			 * 
			 */
			confirmLessonAdjust() {
				this.setLessonInfoShow('')
				this.setLessonAdjustShow('')
			},

			/**
			 * @param {Object} mark 'show' or ''
			 */
			setLessonInfoShow(mark) {
				this.lessonInfoShow = mark
			},
			/**
			 * @param {Object} mark 'show' or ''
			 */
			setLessonAdjustShow(mark) {
				this.lessonAdjustShow = mark
			},

			getFreeTeacherList() {
				var freeTeacherList = [
					"Apple", "Bananer", "Origin"
				]
				
				var freeCourseList = {
					"Apple": [
						"英语", "数学", "语文"
					],
					"Bananer": [
						"计算机", "网络"
					],
					"Origin": [
						"物理", "化学"
					]
				}
				return [freeTeacherList, freeCourseList]
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>