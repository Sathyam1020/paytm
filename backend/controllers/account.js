const mongoose = require('mongoose')
const Account = require('../models/account');

exports.getBalance = async(req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
    
        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error(error)

        return res.status(500).json({
          success: false,
          message: "Couldn't fetch balance",
        })
    }
}

exports.transfer = async(req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;
    
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);
    
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
    
        const toAccount = await Account.findOne({ userId: to }).session(session);
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
        // Commit the transaction
        await session.commitTransaction();
    
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.error(error)

        return res.status(500).json({
          success: false,
          message: "Transfer failed",
        })
    }
}