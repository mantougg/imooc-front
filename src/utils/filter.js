import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const moment = (date) => {
  // 超过七天，显示日期
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1小时前，XX小时前，X天前
    return dayjs(date).locale('zh-cn').from(dayjs())
  }
}

export default {
  moment
}
