export default {
	genBetweenDates(startDateStr, endDateStr) {
		var startDate = this.strToDate(startDateStr)
		var endDate = this.strToDate(endDateStr)
		
		var dateStrList = []
		while(startDate <= endDate) {
			dateStrList.push(startDate)
			startDate = this.dateAddDay(startDate, 1)
		}
		return dateStrList
	},

	/**
	 * @param {Object} dateStr yyyy-MM-dd to date
	 */
	strToDate(dateStr) {
		dateStr = dateStr.replace(/-/g, "/") //现将yyyy-MM-dd类型转换为yyyy/MM/dd
		var dateTime = Date.parse(dateStr) //将日期字符串转换为表示日期的秒数
		//注意：Date.parse(dateStr)默认情况下只能转换：月/日/年 格式的字符串，但是经测试年/月/日格式的字符串也能被解析
		var date = new Date(dateTime) //将日期秒数转换为日期格式
		return date
	},
	
	dateToStr(date){
	     var year = date.getFullYear();
	     var month =(date.getMonth() + 1).toString();
	     var day = (date.getDate()).toString();
	     if (month.length == 1) {
	         month = "0" + month;
	     }
	     if (day.length == 1) {
	         day = "0" + day;
	     }
	     return year +"-"+ month +"-"+  day
	},
	
	dateAddDay(date, days) {
		date = date.setDate(date.getDate() + days);
		return new Date(date);

	}
}