const dumyProduct = {
    products: ()=>{
      return  [
           { name:'TÔM GIẢ CÂU MỰC TM03',categoryId:'1'  },
           { name:'TÔM GIẢ CÂU MỰC TM08',categoryId:'1'  },
           { name:'TÔM GIẢ CÂU MỰC CÓ ĐÈN TM05',categoryId:'1'  },
           { name:'MỒI CÂU LURE CHẼM, HỒNG, MÚ M80',categoryId:'2'  },
           { name:'MỒI LURE BIỂN CR28',categoryId:'2'  },
           { name:'CÁ SẮT JD06 CÂU CÁ LÓC',categoryId:'2'  },
           { name:'MỒI CÂU LURE BIỂN SLURE 120',categoryId:'2'  },
           { name:'MỒI CÂU LURE BIỂN X ROOL 128',categoryId:'2'  },
           { name:'cá rô',categoryId:'2'  },
           { name:'cá rô',categoryId:'2'  },
           { name:'cá rô',categoryId:'3'  },
           { name:'cá rô',categoryId:'3'  },
           { name:'cá rô',categoryId:'3'  },
           { name:'cá rô',categoryId:'3'  },
            
        ]
    },
    category: ()=>{
       return [{id:1,name:'Mồi câu mực'},
        {id:2,name:'Mồi cứng'},
        {id:3,name:'Mồi mềm'},
    ]
        
    },
    fish:()=>{
        return [
            {id:1,name:'Cá chép'},
            {id:21,name:'Cá chuối'},
            {id:3,name:'Cá rô'},
            {id:4,name:'Cá chim'},
        ]
    },
    cart:()=>{
        return [
            {id:1,name:'Cá chép',price:'50000',color:'blue',quantity:2,weight:16,img:'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg',checked:true},
            {id:2,name:'Cá chuối',price:'50000',color:'blue',quantity:1,weight:17,img:'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg',checked:true},
            {id:3,name:'Cá rô',price:'50000',color:'blue',quantity:6,weight:18,img:'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg',checked:true},
        ]
    }
}
export default dumyProduct;