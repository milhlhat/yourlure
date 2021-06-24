const PaymentAddress={
    province: ()=>{
        return [
            {value: '1' , label: 'Quảng Ninh'},
            {value: '2' , label: 'Hà Nội'},
            {value: '3' , label: 'Bắc Giang'},
        ]
    },
    district: ()=>{
        return [
            {value: '1' , label: 'Đông triều', provinceId: 1},
            {value: '2' , label: 'Hạ Long', provinceId: 1},
            {value: '3' , label: 'Móng Cái', provinceId: 1},
            {value: '4' , label: 'Cẩm Phả', provinceId: 1},
            {value: '5' , label: 'Thạch Thất', provinceId: 2},
            {value: '6' , label: 'Ba Đình', provinceId: 2},
            {value: '7' , label: 'Hoàn Kiếm', provinceId: 2},
            {value: '8' , label: 'TP Bắc Giang', provinceId: 3},
            {value: '8' , label: 'Yên Thế', provinceId: 3},
            {value: '9' , label: 'Việt Yên', provinceId: 3},
            
        ]
    },
}
export default PaymentAddress;