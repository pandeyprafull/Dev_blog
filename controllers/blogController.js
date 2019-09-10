const blogSchema = require('../models/schema');

exports.getHome =  (req, res, next) =>{
      blogSchema.find({}, (err, data) =>{
          if(!err){
              console.log("data found", data);
              return res.status(200).render('index', { pagetitle: "Index Page" , blogs: data})
          }
          console.log("err to find bulk data", err);
      })
 }

 exports.getCreateBlog = (req, res, next)=>{
    res.status(200).render('edit-blog', {pagetitle: "Create Blog", updating: false});
}

exports.postCreateBlog = (req, res, next)=>{
    console.log("Inside the postBlog");
    const postName = req.body.name;
    const adminName = req.body.admin;
    const contentOfBlog = req.body.content;

    blogSchema.create({name: postName, admin: adminName, content: contentOfBlog }, (err, data)=>{
      if(!err){
        console.log('data inserted!!!', data)
        return res.status(201).redirect('/')
      }
      console.log('errror to insert data in Db', err);
      return  res.status(500).json({ message: "error"})
    })


}


exports.postSortByDate = (req, res, next) =>{
      blogSchema.find({}).sort({ dateTime: -1}).exec((err, doc) =>{
          if(!err){
             return res.status(200).render('index', { pagetitle: 'index Page', blogs: doc})
          }

          console.log("error to sort date", err);
      })
}

exports.getUpdate = (req, res, next) =>{
    const updateMode = req.query.update;
    console.log(updateMode);
    if(!updateMode){
        return res.redirect('/')
    }

    const postId = req.params.postId;
    blogSchema.findById(postId)
    .then(post => {
        if(!post){
            return res.redirect('/');
        }
    return res.status(200).render('edit-blog', {
        pagetitle: 'Update page',
        updating: updateMode,
        post: post
    });

    }).catch(err => console.log(err));
}

exports.postUpdate = (req, res, next) =>{
    const postId = req.body.postId;
    const updatedName = req.body.name;
    const updatedAdmin = req.body.admin;
    const updatedContent = req.body.content;

    blogSchema.findById(postId)
    .then(post =>{
        post.name = updatedName;
        post.admin = updatedAdmin;
        post.content = updatedContent;
        return post.save().then(data =>{
            console.log("updated post")
            res.redirect('/')
        });
    }).catch(err => console.log(err));
}