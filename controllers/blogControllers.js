const Blog=require("../models/Blog")

const getHome=async (req,res)=>{
   try {
    let blogs=await Blog.find().limit(3)
    res.render("home",{blogs:blogs})
   } catch (error) {
    console.log(error);
    res.redirect("/blog")
   }
}
const getList=async (req,res)=>{
   try {
    let blogs=await Blog.find()
    res.render("list",{blogs})
   } catch (error) {
    console.log(error);
    res.redirect("/blog/list")
   }
}
const getAbout=(req,res)=>{
    res.render("about")
}

const getCreateBlog=(req,res)=>{
    res.render("createBlog")
}

const createBlog=async (req,res)=>{
    try {
        let {title,snippet,description}=req.body
        let photo=req.file
        await Blog.create({
            title:title,
            snippet:snippet,
            description:description,
            photo:photo
        })
        res.redirect("/blog/create-blog")
    } catch (error) {
        console.log(error);
        res.redirect("/blog")
    }
}

const getBlog=async (req,res)=>{
   let id= req.params.id
    try {
        let blog=await Blog.findById(id)
        let originalString=blog.photo[0].path
        let newString=originalString.slice(6)
        res.render("blog",{blog,newString})
    } catch (error) {
        console.log(error);
        res.redirect("/blog/list")
    }
}
module.exports={
    getHome,getList,getAbout,getCreateBlog,createBlog,getBlog
}