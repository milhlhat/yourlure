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
    }
}
export default dumyProduct;