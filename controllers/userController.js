const userModel = require("../model/userModel");

const loginController = async (req, res) => {
    try {
        const {email,password } = req.body;
        const user = await userModel.findOne({email,password});

        if (!user) {
            res.status(404).send(`User not found`);
        }
        else{

        res.render("home")
    }
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}



// Register USer
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);

        await newUser.save();
        res.render("home")
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

const fdDataCalculator = async(req,res)=>{
    const {email,fixedDeposit,interestRate,startDate = Date(req.startDate),endDate=Date(req.endDate)} = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const differenceInMilliseconds = Math.abs(endDateObj - startDateObj);
    const years = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)); 

    const fixedDepositAmount = parseFloat(fixedDeposit);
    const interestRatePercentage = parseFloat(interestRate);

    const simpleInterest = (fixedDepositAmount * interestRatePercentage * years) / 100;
    const totalAmount = fixedDepositAmount + simpleInterest;
    console.log(differenceInMilliseconds);

    res.render("fddata",{
        email,fixedDeposit,interestRate,startDate,endDate,years,totalAmount,simpleInterest
    })

   
}

module.exports = { loginController, registerController, fdDataCalculator}