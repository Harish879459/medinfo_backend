const Medicine = require('../entity/medicine');
const Error = require('../utilities/ErrorHandler');

//Add disease
exports.addMedicine = async (req, res) => {
    const {
        name,
        diseaseType,
        description,
        mildCauses,
        severeCauses,
        preventiveMeasures,
        medicines,
        eatables,
        userId,

    } = req.body;

    //Search for duplicate data in database
    await Medicine.findOne({name: name}).then((data) => {
        if (data) {
          return  res.status(401).json({success: false, message: "Medicine Already Saved"});
        }
        //Add disease to database
        const medicine = Medicine.create(req.body);
        if (!medicine) {
         return   res.status(401).json({
                success: false
            });
        }
      return  res.status(200).json({
            success: true
        })
    });
}



//Fetch disease from database
exports.findMedicine = async (req, res) => {
    await Medicine.find().then((medicine) => {
        if (medicine.length <= 0) {
          return  res.status(404).json({
                success: false,
                data: {},
            
            })
        }
      return  res.status(201).json({
            success: true,
            data: medicine
        });
    })

}


//Search disease from database : filtering by name
exports.findMedicineByName = async (req, res) => {

    const diseaseName = req.params.diseaseName;
    await Medicine.find({diseaseName: diseaseName}).then((medicine) => {
        if (medicine === null) {
            res.status(404).json({
                success: false,
                data: medicine
            });
        }
        res.status(201).json({
            success: true,
            data: medicine
        });
    })

}



//FindOne Disease -- React
exports.findOneMedicineById = async (req, res) => {


    await Medicine.findOne({_id:req.params.id}).then((medicine) => {
        if (medicine === null) {
            res.status(404).json({
                success: false,
                data: {}
            });
        }
        res.status(201).json({
            success: true,
            data: medicine
        });
    })

}



//Remove disease from database
exports.deleteMedicine = async (req, res) => {

  await Medicine.findByIdAndDelete({_id:req.params.id}).then((medicine)=>{
    res.status(200).json({
        success: true
    });
    })

}

//Update disease data
exports.updateMedicine = async (req, res) => {

    await Medicine.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        success: true
    });
}



