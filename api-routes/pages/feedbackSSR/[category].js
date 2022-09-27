function FeedbackListByCategory({ articles, category }) {
  return (
    <>
      <h1>Showing feedbacks for category "{category}"</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} {article.title}
            </h2>
            <p>{article.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default FeedbackListByCategory;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const { category } = params;
  const response = await fetch(
    `http://localhost:4000/feedbacks?category=${category}`
  );
  const data = await response.json();

  console.log(`Pre-rendering Feedbacks for category ${category}`);
  res.setHeader("Set-Cookie", ["name=This is a cookie"]);
  console.log(req.headers.cookie);
  console.log(query);
  return {
    props: {
      articles: data,
      category,
    },
  };
}
