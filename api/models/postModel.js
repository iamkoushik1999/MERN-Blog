const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/iamkoushik1999-mern-blog.appspot.com/o/freepik-blog-post.jpg?alt=media&token=0e900a1e-3b07-4936-a4f0-9ddd19e7705a',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Post', postSchema);
