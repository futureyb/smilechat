export const date_format = (fmt, date) => {
    let ret;
    const weekDays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
    ];
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        "Week+": weekDays[date.getDay()],
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            console.log(ret)
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1
                    ? opt[k]
                    : ret[1] != 'Week'?opt[k].padStart(ret[1].length, "0"):opt[k]
            );
        }
    }
    return fmt;
};

export const copyText = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};

/**
 * param {number} year年份
 * 获取今年的天数
 */
export const years_day = (year = new Date()) => {
    const currentDate = new Date(date_format("YYYY-mm-dd 00:00", new Date()));
    const januaryFirst = new Date(date_format("YYYY-01-01 00:00", new Date()));
    const timeDifference = currentDate - januaryFirst;
    return timeDifference / (1000 * 60 * 60 * 24);
};

export const calculateShowTime = (originalDate) => {
    let currentDate = new Date(
        date_format("YYYY/mm/dd 00:01", new Date(new Date()))
    ).getTime();
    originalDate = new Date(originalDate);
    const oneDayInMillis = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffDays = (currentDate - originalDate) / oneDayInMillis;
    console.log(diffDays);

    if (diffDays <= 0) {
        return date_format("HH:MM", new Date(originalDate));
    } else if (diffDays <= 1) {
        return `昨天 ${date_format("HH:MM", new Date(originalDate))}`;
    }else if(diffDays <= 7){
        return `${date_format("Week HH:MM", new Date(originalDate))}`;
    }
     else if (diffDays <= years_day()) {
        return date_format("mm-dd HH:MM", new Date(originalDate));
    } else {
        return date_format("YYYY-mm-dd HH:MM", new Date(originalDate));
    }
};
