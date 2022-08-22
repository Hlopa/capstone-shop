import Directory from "../../components/directory/directory.component";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      imageUrl: "/images/bg/hats.jpg",
    },
    {
      id: 2,
      title: "Jackets",
      imageUrl: "/images/bg/jackets.jpg",
    },
    {
      id: 3,
      title: "Sneakers",
      imageUrl: "/images/bg/sneakers.jpg",
    },
    {
      id: 4,
      title: "Womens",
      imageUrl: "/images/bg/women.jpg",
    },
    {
      id: 5,
      title: "Mens",
      imageUrl: "/images/bg/men.jpg",
    },
  ];

  return <Directory categories={categories} />;
};

export default Home;
