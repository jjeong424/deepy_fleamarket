import React from "react";
import axios from "axios";
import Movie from "../components/MainList";
import Header from "../components/Header";
import LinkButton from "../components/LinkButton";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    posts: []
  };
  getPosts = async () => {
    const {data} = await axios.get(
      "/posts/?format=json"
    )
    console.log(data)
    this.setState({posts:data, isLoading: false});
  };
  componentDidMount() {
    this.getPosts();
  }
  render() {
    const { isLoading, posts } = this.state;
    return (
      <div className="responsive">
        <section className="container">
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">로그인 후 플리마켓 제품을 구경해보세요!</span>
            </div>
          ) : (
            <div>
              <div>
                {
                  Header()
                }
              </div>
                <div className="uploadButton">
                  {
                    LinkButton("/Upload", "Upload")
                  }
                </div>
              <div className="product_box">
                {(posts[0].id === 1) ?
                (posts.reverse().map(post => {
                  return <Movie
                    key={post.id}
                    id={post.id}
                    price={post.price}
                    image={post.images[0] !== undefined && post.images[0].image}
                  />
                })):
                (posts.map(post => {
                  return <Movie
                    key={post.id}
                    id={post.id}
                    price={post.price}
                    image={post.images[0] !== undefined && post.images[0].image}
                  />
                }))}
              </div>
            </div>
          )}
        </section>
        {/* <h4 className="contactP">contact: @@@</h4> */}
      </div>
    );
  }
}

export default Home;