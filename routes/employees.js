const express =  require('express');
const router = express.Router();
const {Employee,validator} = require("../models/employee");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asynchandler");
const validate = require("../middleware/validate");

router.post("/",asyncHandler(async(req,res) => {
    await Employee(req.body).save();
    res.status(200).send("Employee created Successfully");
    })
);

router.get(
    "/",
    asyncHandler(async(req,res) => {
        const employees = await Employee.find();
        res.send(employees) 
    })
)

router.get(
    "/:id",
    isValidObjectId,
    asyncHandler(async(req,res) => {
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    })
)

//Update Employee Details
router.put(
    "/:id",
    [isValidObjectId,validate(validator)],
    asyncHandler(async(req,res) => {
        await Employee.findByIdAndUpdate({
           _id:req.params.id},req.body);
           res.status(200).send("updated Successfully") 
        })
)

router.delete(
    ":/id",
    isValidObjectId,
    asyncHandler(async(req,res) => {
        await Employee.findByIdAndDelete(req.params.id);
        res.status.send("Employee deleted Successfully");
    })
)

module.exports = router;