import DirectoryItem from "../directory-item/directory-item.component";
import './directory.styles.scss'

const categories = [
  {
    id: 1,
    title: "Hats",
    imageUrl: "/images/bg/hats.jpg",
    route: 'shop/hats'
  },
  {
    id: 2,
    title: "Jackets",
    imageUrl: "/images/bg/jackets.jpg",
    route: 'shop/jackets'
  },
  {
    id: 3,
    title: "Sneakers",
    imageUrl: "/images/bg/sneakers.jpg",
    route: 'shop/sneakers'
  },
  {
    id: 4,
    title: "Womens",
    imageUrl: "/images/bg/women.jpg",
    route: 'shop/womens'
  },
  {
    id: 5,
    title: "Mens",
    imageUrl: "/images/bg/men.jpg",
    route: 'shop/mens'
  },
];


const Directory = () => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
