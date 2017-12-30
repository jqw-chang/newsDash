const Articles = require('./articleModel.js');

module.exports = {
  saveArticles(req, res) {
    let articlesToSave = [];

    req.body.forEach(article => {
      articlesToSave.push({
        id: article.publishedAt + article.url,
        sourceID: article.source.id,
        sourceName: article.source.name,
        title: article.title,
        url: article.url,
        description: article.description,
        author: article.author,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage,
      });
    });

    console.log(articlesToSave);

    Articles.bulkCreate(articlesToSave)
    .then(() => {
      return Articles.findAll();
    }).then(articles => {
      res.json(articles.length);
    }).catch(error => {
      // console.log('\n\n\n ERROR: --------', error.errors[0].type === 'unique violation');
      if (error.errors[0].type === 'unique violation') res.json('duplicated');

    });
  },

  getArticles(req, res) {
    // Article.findAll({}).then(articles => {
    //   res.json(articles);
    // });
  },
  
  removeArticles(req, res) {
    // Article.destroy({where: req.body.where}).then(article => {
    //   res.json(article);
    // })
  },

  // updateArticle(req, res) {
  //   Article.findOne({where: req.body.where}).then(article => {
  //     return article.updateAttributes(req.body.updates)
  //   }).then(updatedArticle => {
  //     res.json(updatedArticle);
  //   })
  // }
}