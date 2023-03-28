<script>
// const host = 'http://192.168.2.8:18080'
// const host = 'http://www.jinchengsoft.cn:18080'
// const host = window.parent.basePath
const host = sessionStorage.getItem("hqPath")
console.log('根路径：',host)
//本地
// const host = 'http://localhost:8081'
export default {
  host,
}
</script>
