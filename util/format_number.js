//최대 앞의 두 단위만 표시하는 함수
function formatNumber(n) {
    const num = n.toString()
    const units = ['', '만', '억', '조', '경']; // 각 단위 배열
    const unit_no = Math.floor((num.length-1)/4)
    const unit_first = units[unit_no]
    const unit_last = unit_no? units[unit_no-1] : ''
    const num_base = num.length%4 || 4
    const num_high = num.slice(0,num_base)
    const num_low = num.slice(num_base,num_base+4)
    return `${num_high}${unit_first} ${num_low}${unit_last}`.trim()
}
export {formatNumber}
//console.log(formatNumber(123456789))