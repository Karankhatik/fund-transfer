const Account = require('../models/account.model');
const mongoose = require('mongoose');

const checkBalance = async (req, res) => {
    try {
        const user_id = req.userId;
        if(!user_id) return res.status(400).json({message: "not authorized"});

        const account = await Account.findOne({user_id: user_id});

        const balance = account.balance;
        res.status(200).json({balance: balance});
    } catch (error) {
        console.log("error",error);
        res.status(400).json({message: "something went wrong"});                                                         
    }
}

const transferBalance = async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;
    
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ user_id:req.userId }).session(session);
    
        console.log("account",account)
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
    
        const toAccount = await Account.findOne({ user_id: to }).session(session);
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        await Account.updateOne({ user_id: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ user_id: to }, { $inc: { balance: amount } }).session(session);
    
        // Commit the transaction
        await session.commitTransaction();
    
        res.json({
            message: "Transfer successful"
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({message: "something went wrong"});                                                         
    }
   
}


module.exports = {checkBalance, transferBalance} 