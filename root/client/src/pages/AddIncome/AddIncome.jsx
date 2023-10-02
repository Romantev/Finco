import "./AddIncome.css";

// import methods
import { useContext, useEffect } from "react";

// import components
import AddTransaction from "../../components/AddTransaction/AddTransaction";

// import context
import { PageContext } from "../../context/context";

const AddIncome = () => {
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    setPage("income");
    document.body.classList.add(page.toLowerCase() + "Page");
    return () => {
      document.body.classList.remove(page.toLowerCase() + "Page");
    };
  }, [page]);

  return (
    <>
      <AddTransaction page={page} />
    </>
  );
};

export default AddIncome;
