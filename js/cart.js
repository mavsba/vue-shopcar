
var vm =new Vue({

	el:'#app',
	data:{
		totalMoney:0,
		productList:[],
    checkAllFlag:false,
    delFlag:false,
		curProduct:''
	},
  filters:{
		formatMoney(value){
			return `$${value.toFixed(2)}`
		}
  },
	mounted(){
    this.$nextTick(function() {
      this.cartView();
    })
	},
	methods:{
  async cartView(){
   		const res = await this.$http.get('data/cartData.json',{'id':123});
        this.productList = res.data.result.list
  },
    changeMoney(data,number){
  	if (number>0){
      data.productQuantity++
			} else {
      data.productQuantity--
			if(data.productQuantity<1){
        data.productQuantity=1
			}
     }
      this.calcTotaLPrice()
		},
    selectedProduct(item){
    	if(typeof item.checked == 'undefined'){

       this.$set(item,'checked',true)
        console.log(item.checked);
      }else{
        item.checked = !item.checked
			}
      this.calcTotaLPrice()
		},
    checkAll(flag){
    	this.checkAllFlag = flag
      this.productList.forEach((item,index)=> {
        if(typeof item.checked == 'undefined'){
          this.$set(item,'checked',this.checkAllFlag)
        }else{
          item.checked = this.checkAllFlag
        }
      })
      this.calcTotaLPrice()
		},
		calcTotaLPrice(){
     this.totalMoney =0
      this.productList.forEach((item,index) => {
     	console.log(item.checked);
     		if(item.checked){
     			console.log(item.checked);
     			this.totalMoney += item.productPrice * item.productQuantity
				}
			})
		},
    delProduct(){
			let index = this.productList.indexOf(this.curProduct)
			console.log(index);
      this.productList.splice(index,1)
      this.delFlag = false
		},
    delConfirm(item){
    	this.delFlag=true
      this.curProduct =item
		}
	}
 });

Vue.filter('money',(value,type) => {
  return `$${value.toFixed(2)+type}`
});
