const router = require('express').Router();
const auth = require('../middleware/auth');

const {addMedicine,findMedicine, updateMedicine, deleteMedicine, findMedicineByName, findOneMedicineById} = require('../controller/medicine');
router
    .post('/addMedicine', auth.userAuthentication, addMedicine)
    .get('/findMedicine', auth.userAuthentication, findMedicine)
    .get('/findMedicineByName', auth.userAuthentication, findMedicineByName)
    .put('/updateMedicine/:id', auth.userAuthentication, updateMedicine)
    .delete('/deleteMedicine/:id', auth.userAuthentication, deleteMedicine)
    .get('/findOneMedicineById/:id',findOneMedicineById)
   


module.exports = router;