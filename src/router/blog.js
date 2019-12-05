const Home = () => import("@/views/blog/Home.vue");
const PostDetail = () => import("@/views/blog/PostDetail.vue");
const Editor = () => import("@/views/blog/Editor.vue");

export default [
  {
    path: "/blog",
    name: "blog",
    component: Home,
    meta: {
      title: "博客"
    }
  },
  {
    path: "/blog/:id",
    name: "post_detail",
    component: PostDetail,
    meta: {
      title: "博客"
    }
  },
  {
    path: "/editor",
    name: "editor",
    component: Editor,
    meta: {
      title: "编辑"
    }
  }
];
