export let initialState = {
    isAdminLoggedIn: false,
    signInData: [],
    billingData: [],
    paymentData: [],
    visitData: []
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "IS_LOGGED_IN":
        return {
          ...state,
          isAdminLoggedIn: true,
        };
      case "SIGN_IN_DATA":
        return {
          ...state,
          signInData: action.payload
        };
      case "BILLING_IN_DATA":
        return {
          ...state,
          billingData: action.payload
        };
      case "PAYMENT_DATA":
        return {
          ...state,
          paymentData: action.payload
        };
      
      case "VISIT_DATA":
        return {
          ...state,
          visitData: action.payload
        };
      default:
        return {
          ...state
        };
    }
  };