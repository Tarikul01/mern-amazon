import bcrypt from 'bcryptjs';
const data={
      users:[
            {
                  name:"Tarikul",
                  email:"tarikul@gmail.com",
                  password:bcrypt.hashSync('12345'),
                  isAdmin:true,

            },
            {
                  name:"Rahat",
                  email:"rahat@gmail.com",
                  password:bcrypt.hashSync("12345"),
                  isAdmin:false,

            },
      ],
      products:[
            {  
                  //    _id:'1',
                  name:"Nike Slim shirt",
                  slug:'nike-slim-shirt',
                  category:"Shirts",
                  image:"/images/p1.jpg",
                  price:120,
                  countInStock:10,
                  brand:"Nike",
                  rating:4.5,
                  numReviews:10,
                  description:'high quality shirt',
            },
            
            {   
                  //   _id:"2",
                  name:"Nike Slim pant",
                  slug:'nike-slim-pant',
                  category:"Pants",
                  image:"/images/p2.jpg",
                  price:29,
                  countInStock:15,
                  brand:"Nike",
                  rating:3.5,
                  numReviews:14,
                  description:'high quality product',
            },
            
            {  
                  //    _id:"3",
                  name:"Adidas fit pant",
                  slug:'adidas-fit-pant',
                  category:"Pants",
                  image:"/images/p3.jpg",
                  price:150,
                  countInStock:12,
                  brand:"Puma",
                  rating:4.5,
                  numReviews:10,
                  description:'high quality product',
            }
            ,
            
            {  
                  //    _id:"4",
                  name:"Adidas fit Shirt",
                  slug:'adidas-fit-shirt',
                  category:"Shirt",
                  image:"/images/p4.jpg",
                  price:50,
                  countInStock:8,
                  brand:"Adidas",
                  rating:4.0,
                  numReviews:14,
                  description:'high quality product',
            }
      ]
}

export default data;