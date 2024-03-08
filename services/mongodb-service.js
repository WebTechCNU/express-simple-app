const MongoClient = require('mongodb').MongoClient;

const createBudget = async (req, res, next) => {
    const {name, description} = req.body;
    const newBudget = {
        name: name,
        description: description
    }

    const client = new MongoClient(process.env.connection_string);

    let budgets;
    try {
        await client.connect();
        const db = client.db('new_budgets');
        await db.collection('budgets').insertOne(newBudget);
        budgets = await db.collection('budgets').find().toArray();
    } catch (error) {
        console.log(error);
        return res.json( {message: 'Could not connect to the database' });
    }

    await client.close();

    return res.json(budgets);
}

const getBudgets = async (req, res, next) => {
    const client = new MongoClient(process.env.connection_string);

    let budgets;

    try{
        await client.connect();
        const db = client.db('new_budgets');
        budgets = await db.collection('budgets').find().toArray();
    } catch(error){
        console.log(error);
        return res.json( {message: 'Could not connect to the database' });
    }

    await client.close();

    return res.json(budgets);
}

exports.createBudget = createBudget;
exports.getBudgets = getBudgets;
