const News = require('../models/news');

module.exports = {
    async store (req, res) {
        const { image, title, description, theme, link } = req.body;
        const news = await News.create({
            image,
            title,
            description,
            theme,
            link
        }, (error, result) => {
            if (error) {
                res.status(400);
            }
            res.status(200).send(result);
        })
    }
};