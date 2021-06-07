const dumyProduct = {
    products: ()=>{
      return  [
           { name:'cá rô',categoryId:'1'  },
           { name:'cá rô',categoryId:'1'  },
           { name:'cá rô',categoryId:'1'  },
           { name:'cá rô',categoryId:'1'  },
           { name:'cá rô',categoryId:'1'  },
           { name:'cá rô',categoryId:'1'  },
           { name:'cá rô',categoryId:'2'  },
           { name:'cá rô',categoryId:'2'  },
           { name:'cá rô',categoryId:'2'  },
           { name:'cá rô',categoryId:'2'  },
           { name:'cá rô',categoryId:'3'  },
           { name:'cá rô',categoryId:'3'  },
           { name:'cá rô',categoryId:'3'  },
           { name:'cá rô',categoryId:'3'  },
            
        ]
    },
    category: ()=>{
       return [{id:1,name:'Mồi mềm'},
        {id:2,name:'Mồi cứng'},
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