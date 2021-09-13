import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { StoreProvider } from "./context/store";

import Layout from "./Layout/Layout";
import SignIn from "./pages/SignIn";
import Payment from "./pages/Payment";
import Billing from "./pages/Billing";
import ThankYou from "./pages/ThankYou";
import AdminSignIn from "./pages/AdminSignIn";
import Admin from './pages/Admin';

function App() {
  return (
    <StoreProvider>
      <Layout>
        <Switch>
          <Route path="/signin" exact component={() => <SignIn />} />
          <Route path="/payment" exact component={() => <Payment />} />
          <Route path="/billing" exact component={() => <Billing />} />
          <Route path="/thankyou" exact component={() => <ThankYou />} />
          <Route path="/admin/signIn" exact component={() => <AdminSignIn />} />
          <Route path="/admin" exact component={() => <Admin />} />
          <Redirect to='/signin' />
        </Switch>
      </Layout>
    </StoreProvider>
  );
}

export default App;
