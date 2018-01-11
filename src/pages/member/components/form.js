import Address from "js/address_service.js";
export default {
    data(){
        return{
            type: null,
            instance: null,
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id: '',
            addressData: require('js/address.json'),
            cityList: null,
            districtList: null,
            first: true
            
        }
    },
    created(){
        let query =  this.$route.query
        this.type = query.type
        this.instance = query.instance
        if (this.type ==='edit') {
            let int = this.instance
            this.provinceValue = parseInt(int.provinceValue)
            // this.cityValue = parseInt(this.instance.cityValue) 
            // this.districtValue = parseInt(this.instance.districtValue)
            this.name = int.name
            this.id = int.id
            this.address = int.address
            this.tel = int.tel
        }
    },
    watch: {
        provinceValue(val){
            if(val === -1)return
            let int = this.instance
            let list = this.addressData.list
            let index = list.findIndex(item => {
                return item.value === +val
            })
            this.cityList = list[index].children
            this.cityValue = -1
            this.districtValue = -1
            if (this.first ) {
                this.cityValue = parseInt(this.instance.cityValue)
                this.first = !this.first
            }
            // this.provinceValue = parseInt(int.provinceValue)
            // this.cityValue = parseInt(this.instance.cityValue) 
        },
        cityValue(val){
            if (val === -1) return
            let list = this.cityList
            let int = this.instance
            let index = list.findIndex(item => {
                return item.value === +val
            })
            this.districtList= list[index].children
            this.districtValue = -1
            // this.cityValue = parseInt(this.instance.cityValue) 
            if (this.first) {
                this.first = !this.first
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
        
    },
    methods: {
        add(){
            let { name, tel, provinceValue, cityValue, districtValue,address} = this
            let data = { name, tel, provinceValue, cityValue, districtValue, address }
            // this.$router.go(-1)
            if (this.type ==='add') {
                Address.add(data).then(res => {
                    this.$router.go(-1)
                    console.log(2)
                }).catch(rej => {
                    console.log(2)
                    this.$router.go(-1)
                })
            }
            if (this.type === 'edit') {
                data.id = this.id
                Address.add(data).then(res => {
                    this.$router.go(-1)
                }).catch(rej => {
                    console.log(2)
                    this.$router.go(-1)
                })
            }
        },
        setDefault(){
            this.$router.go(-1)
            // Address.setDefault(this.id).then(res => {
            //     this.$router.go(-1)
            // }).catch(rej => {
            //     console.log(2)
            //     this.$router.go(-1)
            // })
        },
        remove(){
            if (window.confirm('确认删除？')) {
                this.$router.go(-1)
                // Address.remove(this.id).then(res => {
                //     this.$router.go(-1)
                //     console.log(2)
                // }).catch(rej => {
                //     console.log(2)
                //     this.$router.go(-1)
                // })
            }
        }
    }
}