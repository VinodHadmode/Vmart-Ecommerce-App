import { useContext, useEffect, useState } from "react"
import { IoCaretForwardSharp } from "react-icons/io5";
import Title from "../Components/Title"
import ProductItem from "../Components/ProductItem";
import { ShopContext } from "../Context/ShopContext";
import Spinner from "../Components/Spinner";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortOption, setSortOption] = useState("relevant")

  const { products, search, showSearch } = useContext(ShopContext)


  const handleCategoryChange = (e) => {
    const value = e.target.value
    if (category.includes(value)) {
      setCategory(category.filter((cat) => {
        return cat !== value
      }))
    } else {
      setCategory([...category, value])
    }
  }

  const handleSubCategoryChange = (e) => {
    const value = e.target.value
    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((cat) => {
        return cat !== value
      }))
    } else {
      setSubCategory([...subCategory, value])
    }
  }

  // Apply filter and sorting function
  const applyFilterAndSort = () => {
    let productsCopy = [...products];

    //Apply search query
    if (search && showSearch) {

      productsCopy = productsCopy.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      })
    }
    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    if (sortOption === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [products, category, subCategory, sortOption, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* filter options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center gap-2 cursor-pointer">
          FILTERS
          <IoCaretForwardSharp className={`sm:hidden ${showFilter ? "rotate-90" : ""}`} />
        </p>


        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={handleCategoryChange} />Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={handleCategoryChange} />Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={handleCategoryChange} />Kids
            </p>
          </div>
        </div>

        {/* Sub-category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={handleSubCategoryChange} />Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={handleSubCategoryChange} />Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={handleSubCategoryChange} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
        </div>

        {/* Sort functionality */}
        <div className="mb-5 flex justify-end items-center mt-4 sm:mt-0">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 text-sm px-3 py-2 rounded-md shadow-sm"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Rendering all products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
          {filteredProducts && filteredProducts.reverse().map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection
