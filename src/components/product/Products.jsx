import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import Product from '../home/Product';
import { useEffect } from 'react';
import { clearErrors, getProducts } from '../../redux/features/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
