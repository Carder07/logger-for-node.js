let time = function() {

    const Time = new Date();
    let Day = Time.getUTCDate()
    let Year = Time.getFullYear()
    let Hour = Time.getHours()
    let Mini = Time.getMinutes()
    let Month = Time.getMonth()
    let Sec = Time.getSeconds()

    this.moment = function() {
        return (Day + '-' + Month + '-' + Year + ',' + Hour + ':' + Mini + ':' + Sec);
    }
    this.today = function() {
        return (Day + '-' + Month + '-' + Year)
    };
}
module.exports = new time;