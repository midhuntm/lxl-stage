function getColor(value) {

    if (value < 40) {
        return '#FF5630'
    } else if (value < 60) {
        return '#FFC400'
    } else if (value < 80) {
        return '#FF991F'
    } else {
        return '#57D9A3 '
    }
}

export { getColor }