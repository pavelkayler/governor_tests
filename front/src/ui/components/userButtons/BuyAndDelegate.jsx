import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";
import GovernorService from "../../../services/governorService/GovernorService.js";

const BuyAndDelegate = () => {
  const { buyWrapToken, delegateWrapToken } = useContext(Context);

  const handleBuy = async (e) => {
    e.preventDefault();
    await buyWrapToken(e.target[0].value);
  };

  const handleDelegate = async (e) => {
    e.preventDefault();
    await delegateWrapToken(e.target[0].value, e.target[1].value / 10 ** 12);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleBuy}>
          <FormLabel column={"sm"}>Купить wrap-токен</FormLabel>
          <FormGroup>
            <FormControl required type="number" placeholder={"количество"} defaultValue="100" />
          </FormGroup>
          <Button type={"submit"}>Купить</Button>
        </Form>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleDelegate}>
          <FormLabel column={"sm"}>Делегировать</FormLabel>
          <FormGroup>
            <FormControl required type="number" placeholder={"proposalId"} defaultValue="100" />
          </FormGroup>
          <FormGroup>
            <FormControl required type="text" placeholder={"количество"} defaultValue="100" />
          </FormGroup>
          <Button type={"submit"}>Делегировать</Button>
        </Form>
      </div>
    </>
  );
};

export { BuyAndDelegate };
