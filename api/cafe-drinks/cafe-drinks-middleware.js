const validateDrink = (req, res, next) => {
    const { drink_name, drink_description } = req.body;

    if (!drink_name || !drink_description) {
        next({ status: 400, message: 'Drink name and description are required' });
    } else {
        next();
    }
}

module.exports = { validateDrink };