const {MongoClient} = require('mongodb');

const url='mongodb://localhost:27017';
const dbname='Noronha_283_Website_code';

const client= new MongoClient(url);
const connect=async()=>{
    await client.connect();
    const db = client.db(dbname);
    const collection=db.collection('user');

    return collection;
   
};
// insert data
const insertData=async()=>{
    const collection=await connect();
    const data={
        "name":"John Doe",
        "age":38,
        "city":"new york"
    };
    const response =await collection.insertOne(data);
    console.log(response);

}
// insertData();
const insertMultipleData=async()=>{
    const collection=await connect();
    const data=[
        {
            "name":"John wick",
            "age":38,
            "city":"new jersy"
        },
        {
            "name":"John cena",
            "age":38,
            "city":"florida"
        },


    ];
    const response=await collection.insertMany(data);
    console.log(response);

};
// insertMultipleData();
const readData=async()=>{
    const collection=await connect();
    const response =await collection.find().toArray();

    console.log(response);
}
readData();
const searchData=async()=>{
    const collection=await connect();
    const response =await collection.find({name:'John wick'}).toArray();

    console.log(response);
}
// searchData();
const updateData=async()=>{
    const collection=await connect();
    const response =await collection.updateOne(
        {name:'John wick'},
        {
            $set:{age:55,contact:'8797392' }
        }
    );
    console.log(response);

}
// updateData();
const deletData=async()=>{
    const collection=await connect();
    const response =await collection.deleteOne(
        {name:'John wick'},
       
    );
    console.log(response);

}
deletData();
