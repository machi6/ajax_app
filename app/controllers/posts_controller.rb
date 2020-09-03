class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end
  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  #########################################################
  # 3.データベースの内容を既読に変え、そのデータを取得しJSへ返却   #
  #########################################################
  def checked
    post = Post.find(params[:id])
    if post.checked #checkedはアクションのcheckedmとは無縁。正しくは何というのか...postのプロパティ？カラム？
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    item = Post.find(params[:id])
    render json: { post: item }#ここでrenderを使ってJSに返却。
  end

end