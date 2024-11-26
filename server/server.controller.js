const ServerController = (req, res) => {
    res.status(200).send('checking root route');
    // res.json({
    //     status: 200,
    //     message: "checking root route",
    // })
}

module.exports = ServerController;