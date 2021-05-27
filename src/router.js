const {Router} = require('express');
const router = Router();
const model = require('./models/Model');

router.get('/', async (req,res)=>{
    await model.find({}).then(boolean_variable => {

        res.render('index.hbs',{
            title: 'Chumachenko Asedo test',
            var: String(boolean_variable[0].value)
        })

    })

})

router.post('/', async (req,res)=>{
    if(!req.body)
        res.sendStatus(400);
    const value = JSON.parse(JSON.stringify(req.body));
    await model.updateOne({}, {value: value.check})
    res.redirect('/');
})

module.exports = router;