/**
 * Created by brad on 3/31/2017.
 */
//post wash message
//mark as claimed/complete
//delete wash message
//increment loads wished for user
//increment loads washed for user

module.exports.createWashMessage = function(req, res) {
    let data = req.body;
    if (!data ||
        !data.washer ||
        !data.availableLocations ||
        !data.timeRangeLow ||
        !data.timeRangeHigh ||
        !data.comments) {
        res.status(400).send({error: 'all required form fields necessary'})
    } else {
        let newWashMessage = new washMessage({
            washer: data.washer,
            created: Date.now(),
            availableLocations: data.availableLocations,
            timeRangeLow: data.timeRangeLow,
            timeRangeHigh: data.timeRangeHigh,
            comments: data.comments
        });

        newWashMessage.save(function (err) {
            if (err) {
                res.status(400).send({error: 'data could not save to database', err: err});
            } else {
                res.status(201).send({
                    id: newWashMessage._id
                });
            }
        })
    }
};