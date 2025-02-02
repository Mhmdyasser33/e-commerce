import {modelOptions , prop ,getModelForClass} from "@typegoose/typegoose" ; 

/* @modelOptions({}) */
@modelOptions({schemaOptions : {timestamps : true}})

export class Product{
    public _id?:string 
    @prop({required : true})
    name !: string 

    @prop({required : true , unique : true})
    slug !:string

    @prop({required : true})
    image !:string 

    @prop({required : true})
    category !:string

    @prop({required : true , default : 0})
    price !:number    

    @prop({required : true})
    brand !:string

    @prop({required : true , default : 0})
    countInStock !:number

    @prop({required : true})
    description !:string

    @prop({required : true , default : 0})
    rating !:number
    
    @prop({required : true , default : 0})
    numReviews !:number 
}

export const productModel = getModelForClass(Product) ; 